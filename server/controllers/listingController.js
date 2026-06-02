import Listing from '../models/Listing.js';

// @desc    Get all available listings with optional filters
// @route   GET /api/listings?cropName=&status=&page=&limit=
// @access  Public
export const getListings = async (req, res, next) => {
  try {
    const { cropName, status, page = 1, limit = 20 } = req.query;

    const query = {};

    if (cropName) {
      query.cropName = { $regex: cropName, $options: 'i' };
    }

    // Default to 'available' unless explicitly overridden
    query.status = status || 'available';

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [listings, total] = await Promise.all([
      Listing.find(query)
        .populate('farmerId', 'name phone location')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Listing.countDocuments(query),
    ]);

    res.json({
      success: true,
      count: listings.length,
      total,
      pagination: {
        page:       parseInt(page),
        limit:      parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
      data: listings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all listings belonging to the logged-in farmer
// @route   GET /api/listings/my
// @access  Private / Farmer
export const getMyListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({ farmerId: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: listings.length,
      data: listings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new produce listing
// @route   POST /api/listings
// @access  Private / Farmer
export const createListing = async (req, res, next) => {
  try {
    // Attach the authenticated farmer's ID
    const listing = await Listing.create({
      ...req.body,
      farmerId: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a listing's status or details
// @route   PATCH /api/listings/:id
// @access  Private / Farmer (own listings only)
export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      res.status(404);
      return next(new Error('Listing not found.'));
    }

    // Ensure the requester owns this listing
    if (listing.farmerId.toString() !== req.user._id.toString()) {
      res.status(403);
      return next(new Error('Not authorized to update this listing.'));
    }

    // Allow only safe fields to be updated
    const allowed = ['quantityAvailable', 'minimumPricePerKg', 'status', 'imageURL', 'expectedHarvestDate'];
    allowed.forEach(field => {
      if (req.body[field] !== undefined) {
        listing[field] = req.body[field];
      }
    });

    const updated = await listing.save();

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a listing
// @route   DELETE /api/listings/:id
// @access  Private / Farmer (own listings only)
export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      res.status(404);
      return next(new Error('Listing not found.'));
    }

    if (listing.farmerId.toString() !== req.user._id.toString()) {
      res.status(403);
      return next(new Error('Not authorized to delete this listing.'));
    }

    await listing.deleteOne();
    res.json({ success: true, message: 'Listing removed.' });
  } catch (error) {
    next(error);
  }
};
