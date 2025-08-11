# URL Shortener

A full-stack URL shortening application built with Node.js, Express, MongoDB, and Next.js.
Admin:https://url-shortener-admin.vercel.app/
Frontend:https://url-shortener-taupe-theta.vercel.app/

## Features

- Shorten long URLs to 6-character codes
- Copy shortened URLs to clipboard
- View all shortened URLs
- **NEW: Admin dashboard with visit tracking**
- **NEW: Visit count analytics for each URL**
- Responsive design with Tailwind CSS
- MongoDB integration for data persistence

## Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/url-shortener
   ```
   
   For MongoDB Atlas, use:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/url-shortener
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

### Admin Dashboard Setup

1. Navigate to the admin directory:
   ```bash
   cd admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the admin development server:
   ```bash
   npm run dev
   ```

The admin dashboard will run on `http://localhost:3001` (or the next available port)

## Usage

### Main Application
1. Open your browser and go to `http://localhost:3000`
2. Enter a long URL in the input field (must start with http:// or https://)
3. Click "Shorten URL" to generate a short code
4. Copy the shortened URL using the copy button
5. Use the shortened URL to redirect to the original URL

### Admin Dashboard
1. Navigate to `http://localhost:3000/admin` or run the admin app separately
2. View all shortened URLs with visit counts
3. Search and filter URLs
4. Sort by creation date, visit count, or short code
5. Delete URLs if needed
6. Monitor analytics and performance

## API Endpoints

- `POST /api/shorten` - Create a shortened URL
- `GET /api/urls` - Get all shortened URLs
- `GET /:shortCode` - Redirect to original URL using short code
- `GET /api/admin/urls` - Admin: Get all URLs with visit counts
- `DELETE /api/admin/urls/:id` - Admin: Delete a URL

## How It Works

1. **URL Shortening**: When you submit a URL, the system generates a unique 6-character code and stores the mapping in MongoDB
2. **Redirection**: When someone visits the shortened URL, the system looks up the original URL and redirects the user
3. **Visit Tracking**: Each time a shortened URL is accessed, the visit count is incremented
4. **Duplicate Prevention**: If the same URL is submitted again, it returns the existing short code instead of creating a new one
5. **Admin Analytics**: The admin dashboard provides comprehensive analytics and management tools

## Visit Tracking Features

- **Automatic Counting**: Visit counts are automatically incremented when URLs are accessed
- **Real-time Updates**: Visit counts update in real-time across all interfaces
- **Analytics Dashboard**: View total visits, average visits per URL, and individual URL performance
- **Search & Filter**: Find specific URLs and analyze their performance
- **Sort Options**: Sort by visit count, creation date, or short code

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: Next.js, React, Tailwind CSS
- **Admin**: Next.js, React, Tailwind CSS
- **Database**: MongoDB
- **Validation**: Mongoose schema validation
- **CORS**: Cross-origin resource sharing enabled

## Troubleshooting

- Make sure MongoDB is running and accessible
- Check that the backend server is running on port 5000
- Verify the MongoDB connection string in your `.env` file
- Ensure all dependencies are installed in both frontend, backend, and admin
- For visit tracking issues, check that the database has the updated schema with `visitCount` field
