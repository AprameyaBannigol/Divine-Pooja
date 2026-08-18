import Blog from '../models/Blog.js';

export const getBlogs = async (req, res, next) => {
  try {
    const {
      search,
      category,
      page = 1,
      limit = 12,
      sortBy = 'newest',
    } = req.query;

    const query = { isPublished: true };

    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { excerpt: searchRegex },
        { category: searchRegex },
      ];
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
    const skip = (pageNum - 1) * limitNum;

    const sort = sortBy === 'oldest' ? { publishedAt: 1 } : { publishedAt: -1 };

    const [blogs, total] = await Promise.all([
      Blog.find(query).sort(sort).skip(skip).limit(limitNum),
      Blog.countDocuments(query),
    ]);

    const pages = Math.ceil(total / limitNum) || 1;

    res.status(200).json({
      success: true,
      data: blogs,
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

export const getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let blog;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(id);
    } else {
      blog = await Blog.findOne({ slug: id.toLowerCase() });
    }

    if (!blog || !blog.isPublished) {
      return res.status(404).json({
        success: false,
        message: 'Blog article not found',
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};
