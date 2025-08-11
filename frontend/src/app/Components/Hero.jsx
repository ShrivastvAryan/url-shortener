'use client'
import React from 'react'
import { useState, useEffect } from 'react'

const Hero = () => {
  const [data, setData] = useState([])
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/urls');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data', error);
      setError('Failed to fetch URLs');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: url }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message);
        setUrl('');
        fetchUrls(); // Refresh the list
      } else {
        setError(result.message || 'Failed to shorten URL');
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
      setError('Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    setSuccess('URL copied to clipboard!');
    setTimeout(() => setSuccess(''), 2000);
  };

  return (
    <>
      <h1 className='text-center text-3xl lg:text-6xl font-bold mt-8 text-blue-600'>URL Shortener</h1>
      
      <div className='max-w-2xl mx-auto px-4'>
        <form onSubmit={handleSubmit} className='mb-8'>
          <div className='flex flex-col items-center justify-center'>
            <input 
              type="text" 
              className='w-full h-16 p-3 rounded-2xl bg-blue-50 border-2 border-blue-200 my-4 text-xl focus:outline-none focus:border-blue-400 transition-colors' 
              name="url" 
              placeholder="https://example.com" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
            />
            <button 
              type="submit"
              className={`p-4 text-xl font-semibold rounded-2xl cursor-pointer transition-all ${
                loading 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95'
              }`}
              disabled={loading}
            >
              {loading ? 'Shortening...' : 'Shorten URL'}
            </button>
          </div>
        </form>

        {/* Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        {/* URLs List */}
        <div className="w-full">
          <h2 className="text-center text-2xl lg:text-3xl font-bold mb-6 text-gray-700">Shortened URLs</h2>
          
          {data.length === 0 ? (
            <p className="text-center text-gray-500">No URLs shortened yet. Be the first!</p>
          ) : (
            <div className="space-y-4">
              {data.map((urlData, index) => (
                <div
                  key={urlData._id || index}
                  className="bg-white border-2 border-blue-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Original URL:</span>
                      <button
                        onClick={() => copyToClipboard(urlData.originalUrl)}
                        className="text-blue-500 hover:text-blue-700 text-sm"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-gray-700 break-all">{urlData.originalUrl}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Shortened URL:</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Click to test</span>
                        <button
                          onClick={() => copyToClipboard(`http://localhost:5000/${urlData.shortCode}`)}
                          className="text-blue-500 hover:text-blue-700 text-sm"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                    <a 
                      href={`http://localhost:5000/${urlData.shortCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-mono break-all hover:text-blue-800 hover:underline cursor-pointer transition-colors duration-200 block p-2 rounded hover:bg-blue-50"
                      title="Click to test the shortened URL"
                    >
                      http://localhost:5000/{urlData.shortCode}
                    </a>
                    
                    <div className="text-xs text-gray-400">
                      Created: {new Date(urlData.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      Visits: {urlData.visitCount || 0}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Hero