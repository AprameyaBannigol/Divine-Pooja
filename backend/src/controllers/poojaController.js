import Pooja from '../models/Pooja.js';

export const getPoojas = async (req, res, next) => {
  try {
    const {
      search,
      category,
      occasion,
      city,
      minPrice,
      maxPrice,
      sortBy = 'featured',
      page = 1,
      limit = 12,
    } = req.query;

    const query = { isActive: true };

    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { shortDescription: searchRegex },
        { categories: searchRegex },
        { occasion: searchRegex },
      ];
    }

    if (category && category !== 'all') {
      query.categories = category;
    }

    if (occasion && occasion !== 'all') {
      query.occasion = new RegExp(occasion, 'i');
    }

    if (city && city !== 'all') {
      query.cities = new RegExp(city, 'i');
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice && maxPrice !== 'all') query.price.$lte = Number(maxPrice);
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
    const skip = (pageNum - 1) * limitNum;

    let sort = {};
    if (sortBy === 'price-asc') sort.price = 1;
    else if (sortBy === 'price-desc') sort.price = -1;
    else if (sortBy === 'rating') sort.rating = -1;
    else sort.createdAt = -1; // featured / default

    const [poojas, total] = await Promise.all([
      Pooja.find(query).sort(sort).skip(skip).limit(limitNum),
      Pooja.countDocuments(query),
    ]);

    const pages = Math.ceil(total / limitNum) || 1;

    res.status(200).json({
      success: true,
      data: poojas,
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

export const getPoojaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let pooja;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      pooja = await Pooja.findById(id);
    } else {
      pooja = await Pooja.findOne({ slug: id.toLowerCase() });
    }

    if (!pooja || !pooja.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Pooja not found',
      });
    }

    res.status(200).json({
      success: true,
      data: pooja,
    });
  } catch (error) {
    next(error);
  }
};
