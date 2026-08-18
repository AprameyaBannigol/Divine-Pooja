import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Clock, Calendar } from 'lucide-react';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';
import { blogPostsData } from '../../data/blogPosts.js';

const BlogPreviewSection = () => {
  return (
    <section className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <Badge variant="saffron" size="sm" icon={<BookOpen className="w-3.5 h-3.5" />}>
            Vedic Insights
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900 mt-2">
            Spiritual Guides & Wisdom
          </h2>
          <p className="text-sm text-stone-500 max-w-xl mt-1">
            Articles on ritual procedures, Panchang calculations, and spiritual traditions.
          </p>
        </div>

        <Link to="/blogs" className="shrink-0">
          <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
            View All Articles
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogPostsData.map((post) => (
          <Card key={post.id} hoverable className="flex flex-col justify-between p-5 rounded-2xl bg-white">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <Badge variant="gray" size="sm">{post.category}</Badge>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  {post.readTime}
                </span>
              </div>

              <h3 className="text-base font-bold font-serif text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-2">
                {post.title}
              </h3>

              <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                {post.publishedDate}
              </span>
              <Link to="/blogs">
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3 h-3" />}>
                  Read
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BlogPreviewSection;
