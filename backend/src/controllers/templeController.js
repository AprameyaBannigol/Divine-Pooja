import Temple from '../models/Temple.js';

export const getTemples = async (req, res, next) => {
  try {
    const {
      search,
      city,
      state,
      category,
      deity,
      page = 1,
      limit = 12,
    } = req.query;

    const query = { isActive: true };

    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { city: searchRegex },
        { deity: searchRegex },
        { category: searchRegex },
      ];
    }

    if (city && city !== 'all') {
      query.city = new RegExp(city.trim(), 'i');
    }

    if (state && state !== 'all') {
      query.state = new RegExp(state.trim(), 'i');
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (deity && deity !== 'all') {
      query.deity = new RegExp(deity.trim(), 'i');
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
    const skip = (pageNum - 1) * limitNum;

    const [temples, total] = await Promise.all([
      Temple.find(query).sort({ name: 1 }).skip(skip).limit(limitNum),
      Temple.countDocuments(query),
    ]);

    const pages = Math.ceil(total / limitNum) || 1;

    res.status(200).json({
      success: true,
      data: temples,
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

export const getTempleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let temple;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      temple = await Temple.findById(id);
    } else {
      temple = await Temple.findOne({ slug: id.toLowerCase() });
    }

    if (!temple || !temple.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Temple not found',
      });
    }

    res.status(200).json({
      success: true,
      data: temple,
    });
  } catch (error) {
    next(error);
  }
};
