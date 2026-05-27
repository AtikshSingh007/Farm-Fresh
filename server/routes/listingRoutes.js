import express from 'express';
import { getListings, createListing } from '../controllers/listingController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getListings)
  .post(protect, authorize('farmer'), createListing);

export default router;
