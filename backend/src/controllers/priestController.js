import Priest from '../models/Priest.js';

export const getPriests = async (req, res, next) => {
  try {
    const {
      search,
      city,
      language,
      specialization,
      minRating,
      maxPrice,
      sortBy = 'rating',
      page = 1,
      limit = 12,
    } = req.query;

    const query = {
      verificationStatus: 'APPROVED',
      isActive: true,
    };

    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { specialization: searchRegex },
        { location: searchRegex },
        { city: searchRegex },
      ];
    }

    if (city && city !== 'all') {
      query.city = new RegExp(city.trim(), 'i');
    }

    if (language && language !== 'all') {
      query.languages = language;
    }

    if (specialization && specialization !== 'all') {
      query.specialization = new RegExp(specialization.trim(), 'i');
    }

    if (minRating) {
      query.rating = { $gte: Number(minRating) };
    }

    if (maxPrice && maxPrice !== 'all') {
      query.startingPrice = { $lte: Number(maxPrice) };
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
    const skip = (pageNum - 1) * limitNum;

    let sort = {};
    if (sortBy === 'rating') sort.rating = -1;
    else if (sortBy === 'price-asc') sort.startingPrice = 1;
    else if (sortBy === 'price-desc') sort.startingPrice = -1;
    else sort.createdAt = -1;

    // Explicitly exclude sensitive fields idProof and certificates
    const [priests, total] = await Promise.all([
      Priest.find(query).select('-idProof -certificates').sort(sort).skip(skip).limit(limitNum),
      Priest.countDocuments(query),
    ]);

    const pages = Math.ceil(total / limitNum) || 1;

    res.status(200).json({
      success: true,
      data: priests,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPriestById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid priest ID format',
      });
    }

    const priest = await Priest.findById(id).select('-idProof -certificates');

    if (!priest || !priest.isActive || priest.verificationStatus !== 'APPROVED') {
      return res.status(404).json({
        success: false,
        message: 'Priest profile not found or unavailable',
      });
    }

    res.status(200).json({
      success: true,
      data: priest,
    });
  } catch (error) {
    next(error);
  }
};
