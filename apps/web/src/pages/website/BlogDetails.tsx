import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import logo from '@/assets/logo.png';

// Cover image with purple-theme logo fallback
const CoverImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
    const [imgError, setImgError] = useState(!src);
    if (imgError) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-700 via-violet-600 to-purple-900 relative">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '36px 36px' }}
                />
                <img src={logo} alt="EAOverseas" className="relative z-10 h-56 w-auto object-contain drop-shadow-2xl" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
        );
    }
    return <img src={src} alt={alt} onError={() => setImgError(true)} className="w-full h-full object-cover" />;
};

const BlogDetails = () => {
    const { id: slug } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [engagement, setEngagement] = useState({
        likes: 0,
        views: 0
    });

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    const fetchBlogDetails = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/v1/blogs/${slug}`);
            const data = await response.json();
            if (data.success) {
                setBlog(data.blog);
                setEngagement({
                    likes: data.blog.likes || 0,
                    views: data.blog.views || 0
                });
            } else {
                navigate('/blogs');
            }
        } catch (error) {
            toast.error('Failed to load insight details');
            navigate('/blogs');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLike = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/v1/blogs/${slug}/like`, { method: 'POST' });
            const data = await response.json();
            if (data.success) {
                setEngagement(prev => ({ ...prev, likes: data.likes }));
                toast.success('Strategy liked!', { icon: '🔥' });
            }
        } catch (error) {
            toast.error('Engagement sync failed');
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchBlogDetails();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!blog) return null;

    return (
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
            {/* Back Navigation */}
            <button
                onClick={() => navigate('/blogs')}
                className="group flex items-center gap-3 text-gray-400 hover:text-blue-600 transition-all mb-12 font-black uppercase tracking-widest text-xs"
            >
                <span className="material-symbols-outlined group-hover:-translate-x-2 transition-transform">arrow_back</span>
                Back to Archive
            </button>

            <div className="grid lg:grid-cols-12 gap-16">
                
                {/* ── Left: Social & Metrics (Sticky) ── */}
                <div className="lg:col-span-1 hidden lg:block">
                    <div className="sticky top-32 space-y-12 flex flex-col items-center">
                        <button 
                            onClick={handleLike}
                            className="group flex flex-col items-center gap-2"
                        >
                            <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-red-50 group-hover:text-red-500 group-active:scale-90 transition-all shadow-sm">
                                <span className="material-symbols-outlined">favorite</span>
                            </div>
                            <span className="text-xs font-black text-gray-900">{engagement.likes}</span>
                        </button>

                        <div className="flex flex-col items-center gap-2">
                            <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 shadow-sm">
                                <span className="material-symbols-outlined">visibility</span>
                            </div>
                            <span className="text-xs font-black text-gray-900">{engagement.views}</span>
                        </div>

                        <button className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-blue-600 transition-all shadow-sm">
                            <span className="material-symbols-outlined">share</span>
                        </button>
                    </div>
                </div>

                {/* ── Center: Content ── */}
                <article className="lg:col-span-8 space-y-12 text-left">
                    <div className="space-y-6">
                        <span className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
                            {blog.category}
                        </span>
                        <h1 className="text-4xl md:text-7xl font-black text-gray-900 leading-[1.1]">
                            {blog.title}
                        </h1>
                        <div className="flex items-center gap-8 pt-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-black">
                                    {blog.author?.charAt(0) || 'E'}
                                </div>
                                <div>
                                    <p className="font-black text-gray-900">{blog.author || 'EAOverseas Expert'}</p>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Strategy Lead</p>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-gray-100"></div>
                            <p className="text-sm font-bold text-gray-400 italic">
                                Published {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[400px] md:h-[600px]">
                        <CoverImage src={blog.coverImage} alt={blog.title} />
                    </div>

                    <div 
                        className="prose prose-2xl max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-strong:text-blue-600 prose-blockquote:border-l-8 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50/50 prose-blockquote:p-8 prose-blockquote:rounded-3xl"
                        dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
                    />

                    {/* Mobile Only Metrics Bar */}
                    <div className="lg:hidden flex justify-between items-center py-8 border-y border-gray-100">
                         <div className="flex gap-8">
                            <button onClick={handleLike} className="flex items-center gap-2 text-red-500 font-black">
                                <span className="material-symbols-outlined">favorite</span>
                                {engagement.likes}
                            </button>
                            <div className="flex items-center gap-2 text-gray-400 font-black">
                                <span className="material-symbols-outlined">visibility</span>
                                {engagement.views}
                            </div>
                         </div>
                         <button className="text-blue-600 font-black flex items-center gap-2">
                             <span className="material-symbols-outlined">share</span>
                             Share
                         </button>
                    </div>
                </article>

                {/* ── Right: Sidebar ── */}
                <div className="lg:col-span-3 space-y-12">
                    <div className="bg-gray-900 rounded-[2.5rem] p-10 space-y-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
                        <h4 className="text-white font-black text-xl leading-snug">Elite Study Strategy Waitlist</h4>
                        <p className="text-gray-400 font-medium text-sm leading-relaxed">
                            Join 4,000+ scholars receiving weekly institutional intelligence direct to their inbox.
                        </p>
                        <div className="space-y-4">
                            <input 
                                type="email" 
                                placeholder="Strategy Email"
                                className="w-full bg-white/10 border-none rounded-2xl px-6 py-4 text-white placeholder-white/40 font-bold focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="w-full bg-white text-gray-900 font-[950] py-4 rounded-2xl shadow-xl hover:scale-[1.02] transition-all">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1">Elite Tags</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Visa Intelligence', 'Scholarship', 'Global Strategy', 'Compliance'].map(tag => (
                                <span key={tag} className="px-4 py-2 bg-gray-50 text-gray-500 font-bold text-xs rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;


