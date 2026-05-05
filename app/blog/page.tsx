import BlogClient from './BlogClient';
import { getBlogPosts } from '../../src/blog';

export default function BlogPage() {
  const posts = getBlogPosts();
  return <BlogClient posts={posts} />;
}
