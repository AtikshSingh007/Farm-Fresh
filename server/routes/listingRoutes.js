import express from 'express';
import {
  getListings,
  getMyListings,
  createListing,
  updateListing,
  deleteListing,
} from '../controllers/listingController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * IMPORTANT: /my must be declared BEFORE /:id
 * Otherwise Express will treat "my" as an ObjectId and fail.
 */

// GET /api/listings/my  — farmer's own listings (all statuses)
router.get('/my', protect, authorize('farmer'), getMyListings);

// GET  /api/listings        — public marketplace browse
// POST /api/listings        — create a new listing (farmer only)
router.route('/')
  .get(getListings)
  .post(protect, authorize('farmer'), createListing);

// PATCH  /api/listings/:id  — update own listing
// DELETE /api/listings/:id  — delete own listing
router.route('/:id')
  .patch(protect, authorize('farmer'), updateListing)
  .delete(protect, authorize('farmer'), deleteListing);

export default router;
