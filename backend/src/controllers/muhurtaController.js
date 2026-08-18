import Muhurta from '../models/Muhurta.js';

export const getMuhurtas = async (req, res, next) => {
  try {
    const {
      type,
      location,
      date,
      startDate,
      endDate,
      page = 1,
      limit = 12,
    } = req.query;

    const query = { isActive: true };

    if (type && type !== 'all') {
      query.type = type.toUpperCase();
    }

    if (location && location !== 'all') {
      query.location = new RegExp(location.trim(), 'i');
    }

    if (date) {
      const targetDate = new Date(date);
      if (!isNaN(targetDate)) {
        const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));
        query.date = { $gte: startOfDay, $lte: endOfDay };
      }
    } else if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
    const skip = (pageNum - 1) * limitNum;

    const [muhurtas, total] = await Promise.all([
      Muhurta.find(query).sort({ date: 1 }).skip(skip).limit(limitNum),
      Muhurta.countDocuments(query),
    ]);

    const pages = Math.ceil(total / limitNum) || 1;

    res.status(200).json({
      success: true,
      data: muhurtas,
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

export const getMuhurtaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid muhurta ID format',
      });
    }

    const muhurta = await Muhurta.findById(id);

    if (!muhurta || !muhurta.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Muhurta record not found',
      });
    }

    res.status(200).json({
      success: true,
      data: muhurta,
    });
  } catch (error) {
    next(error);
  }
};
