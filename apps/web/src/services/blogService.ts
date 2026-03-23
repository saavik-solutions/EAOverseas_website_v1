export interface BlogComment {
  user: string;
  content: string;
  createdAt: string;
}

export interface ExternalBlog {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  readTime: string;
  tags: string[];
  createdAt: string;
  isPublished?: boolean; // New field for draft support
  content?: string;
  _id?: string; // MongoDB ID for admin actions
  category: string;
  authorName?: string;
  views?: number;
  likes?: number;
  comments?: BlogComment[];
}

export interface ExternalBlogsResponse {
  success: boolean;
  count: number;
  blogs: ExternalBlog[];
}

// Temporary cache to avoid repeated fetches across components
let cachedBlogs: ExternalBlog[] | null = null;
let fetchPromise: Promise<ExternalBlog[]> | null = null;

const BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/v1/blogs`;

export const fetchExternalBlogs = async (category?: string): Promise<ExternalBlog[]> => {
  if (!category && cachedBlogs) return cachedBlogs;
  if (!category && fetchPromise) return fetchPromise;

  try {
    const url = category ? `${BASE_URL}?category=${encodeURIComponent(category)}` : BASE_URL;
    const request = fetch(url).then(async res => {
      if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.statusText}`);
      const data: ExternalBlogsResponse = await res.json();
      return data.success ? data.blogs || [] : [];
    });

    if (!category) {
      fetchPromise = request;
      const result = await fetchPromise;
      cachedBlogs = result;
      fetchPromise = null;
      return result;
    }
    return await request;
  } catch (err) {
    console.error('Error fetching external blogs:', err);
    if (!category) fetchPromise = null;
    return [];
  }
};

const ADMIN_BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/v1/admin/blogs`;

export const fetchAllAdminBlogs = async (): Promise<ExternalBlog[]> => {
  try {
    const res = await fetch(`${ADMIN_BASE_URL}/all`);
    if (!res.ok) throw new Error(`Failed to fetch admin blogs: ${res.statusText}`);
    const data = await res.json();
    return data.success ? data.blogs || [] : [];
  } catch (err) {
    console.error('Error fetching admin blogs:', err);
    return [];
  }
};

export const generateAIBlog = async (params: { category: string; mode: string; keywords?: string }): Promise<any> => {
  try {
    const res = await fetch(`${ADMIN_BASE_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) throw new Error('AI Generation failed');
    const data = await res.json();
    return data.success ? data.blog : null;
  } catch (err) {
    console.error('Error generating AI blog:', err);
    return null;
  }
};

export const createBlog = async (blogData: any): Promise<boolean> => {
  try {
    const res = await fetch(ADMIN_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogData)
    });
    return res.ok;
  } catch (err) {
    console.error('Error creating blog:', err);
    return false;
  }
};

export const updateBlog = async (id: string, blogData: any): Promise<boolean> => {
  try {
    const res = await fetch(`${ADMIN_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogData)
    });
    return res.ok;
  } catch (err) {
    console.error('Error updating blog:', err);
    return false;
  }
};

export const deleteBlog = async (id: string): Promise<boolean> => {
  try {
    const res = await fetch(`${ADMIN_BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (err) {
    console.error('Error deleting blog:', err);
    return false;
  }
};

export const fetchExternalBlogBySlug = async (slug: string): Promise<ExternalBlog | null> => {
  try {
    const res = await fetch(`${BASE_URL}/${encodeURIComponent(slug)}`);
    if (!res.ok) throw new Error(`Failed to fetch blog details: ${res.statusText}`);
    const data = await res.json();
    return data.success ? data.blog : null;
  } catch (err) {
    console.error('Error fetching external blog detail:', err);
    return null;
  }
};

export const recordBlogView = async (slug: string) => {
  try {
    await fetch(`${BASE_URL}/${encodeURIComponent(slug)}/view`, { method: 'PATCH' });
  } catch (err) {
    console.error('Error recording view:', err);
  }
};

export const likeBlog = async (slug: string): Promise<number | null> => {
  try {
    const res = await fetch(`${BASE_URL}/${encodeURIComponent(slug)}/like`, { method: 'POST' });
    const data = await res.json();
    return data.likes;
  } catch (err) {
    console.error('Error liking blog:', err);
    return null;
  }
};

export const postComment = async (slug: string, username: string, content: string): Promise<BlogComment[] | null> => {
  try {
    const res = await fetch(`${BASE_URL}/${encodeURIComponent(slug)}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: username, content })
    });
    const data = await res.json();
    return data.comments;
  } catch (err) {
    console.error('Error posting comment:', err);
    return null;
  }
};
