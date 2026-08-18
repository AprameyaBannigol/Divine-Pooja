import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, User, RefreshCw } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Modal from '../components/ui/Modal.jsx';
import EmptyState from '../components/feedback/EmptyState.jsx';
import ErrorState from '../components/feedback/ErrorState.jsx';
import { CardSkeleton } from '../components/feedback/LoadingSkeleton.jsx';
import { getBlogs } from '../services/blogService.js';
import { useToast } from '../components/feedback/ToastContext.jsx';

const BlogsPage = () => {
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, pages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['all', 'Pooja Guides', 'Vedic Knowledge', 'Spiritual Practices'];

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {
        search: searchTerm,
        category: activeCategory,
        page,
        limit: 9,
      };
      const result = await getBlogs(params);
      if (result.success) {
        setBlogs(result.data);
        setPagination(result.pagination);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch blogs from API');
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, activeCategory, page]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const featuredPost = blogs[0];

  const handleResetFilters = () => {
    setSearchTerm('');
    setActiveCategory('all');
    setPage(1);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Badge variant="saffron" size="sm" icon={<BookOpen className="w-3.5 h-3.5" />}>
            Vedic Insights & Knowledge
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 mt-2">
            Spiritual Blog & Ritual Guides
          </h1>
          <p className="text-sm text-stone-600 max-w-2xl mt-1">
            Explore articles written by Vedic scholars on pooja Vidhi, Panchang calculations, festival significance, and spiritual well-being.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />} onClick={fetchBlogs}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Featured Article Banner */}
      {featuredPost && !searchTerm && activeCategory === 'all' && !isLoading && (
        <section className="bg-gradient-to-br from-amber-900 to-stone-900 text-white rounded-3xl p-8 sm:p-10 border border-amber-700/40 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="saffron" size="sm">Featured Article</Badge>
            <span className="text-xs text-amber-200/80">5 min read</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-50">
            {featuredPost.title}
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed max-w-3xl">
            {featuredPost.excerpt}
          </p>
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-amber-300">{featuredPost.author} • {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <Button variant="primary" size="sm" onClick={() => setSelectedArticle(featuredPost)}>
              Read Article
            </Button>
          </div>
        </section>
      )}

      {/* Search & Category Filter */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
        <SearchBar
          placeholder="Search articles by topic, keyword, or ritual..."
          value={searchTerm}
          onChange={(val) => { setSearchTerm(val); setPage(1); }}
        />

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setPage(1); }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                activeCategory === cat
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-amber-50'
              }`}
            >
              {cat === 'all' ? 'All Topics' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* States */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : error ? (
        <ErrorState
          title="Failed to Load Blog Articles"
          description={error}
          onRetry={fetchBlogs}
        />
      ) : blogs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((post) => (
              <Card key={post._id || post.id} hoverable className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-stone-200">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <Badge variant="gray" size="sm">{post.category}</Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      5 min read
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
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedArticle(post)} rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Read
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-between border-t border-stone-200 pt-6">
              <span className="text-xs text-stone-500">
                Page {pagination.page} of {pagination.pages} ({pagination.total} total)
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  isDisabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  isDisabled={page >= pagination.pages}
                  onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          title="No Articles Found"
          description="No spiritual articles matched your search query. Try clearing your search filters."
          actionLabel="Clear Filters"
          onAction={handleResetFilters}
        />
      )}

      {/* Article Detail Modal */}
      {selectedArticle && (
        <Modal
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          title={selectedArticle.title}
          subtitle={`${selectedArticle.category} • ${new Date(selectedArticle.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
          footerActions={
            <Button variant="outline" size="sm" onClick={() => setSelectedArticle(null)}>
              Close Article
            </Button>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs text-stone-500 pb-3 border-b border-stone-100">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-amber-600" /> {selectedArticle.author}</span>
            </div>
            <p className="text-sm font-semibold text-stone-800 leading-relaxed font-sans">
              {selectedArticle.excerpt}
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              {selectedArticle.content}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BlogsPage;
