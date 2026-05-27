import Listing from '../models/Listing.js';

// @desc    Get all listings with filters
// @route   GET /api/listings
// @access  Public
export const getListings = async (req, res, next) => {
  try {
    const { cropName, status, page = 1, limit = 10 } = req.query;

    const query = {};

    // Filter by cropName (using regex for partial match)
    if (cropName) {
      query.cropName = { $regex: cropName, $options: 'i' };
    }

    // Filter by status
    if (status) {
      query.status = status;
    } else {
      // Default to only showing available listings unless specified
      query.status = 'available';
    }

    // Note: Advanced geospatial filtering (location) would typically be 
    // implemented here by joining with the User collection or storing 
    // denormalized location on the listing. For now, we return based on crop/status.

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const listings = await Listing.find(query)
      .populate('farmerId', 'name phone location')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Listing.countDocuments(query);

    res.json({
      success: true,
      count: listings.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
      data: listings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new listing
// @route   POST /api/listings
// @access  Private/Farmer
export const createListing = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.farmerId = req.user._id;

    const listing = await Listing.create(req.body);

    res.status(201).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    next(error);
  }
};
