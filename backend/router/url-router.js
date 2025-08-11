const express=require('express')
const router=express.Router();
const {urlForm,urlRedirect,getAllUrls,deleteUrl}=require('../controller/url-controller.js')

router.route('/shorten').post(urlForm)
router.route('/urls').get(urlRedirect) // Get all URLs
router.route('/admin/urls').get(getAllUrls) // Admin: Get all URLs with visit counts
router.route('/admin/urls/:id').delete(deleteUrl) // Admin: Delete a URL

module.exports=router