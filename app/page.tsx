import HomeClient from './HomeClient';
import { getBlogPosts } from '../src/blog';

export default function Page() {
  const posts = getBlogPosts();
  const recentPosts = posts.slice(0, 3);
  return <HomeClient recentPosts={recentPosts} />;
}
