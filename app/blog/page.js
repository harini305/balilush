import Link from 'next/link';
import Picture from '@/components/Picture';
import { posts } from '@/lib/blog';
import styles from './blog.module.css';

export const metadata = {
  title: 'Blog',
  description: 'Get to learn more about Bali Lush, the property and the surrounding culture. Explore some articles and posts!',
  alternates: { canonical: '/blog' },
  openGraph: { images: ['/images/blog/pineapple-season-1200.jpg'] },
};

export default function BlogPage() {
  return (
    <>
      <header className={`container ${styles.head}`}>
        <h1>Around the Property &amp; Beyond</h1>
        <p className="lede">
          Get to learn more about Bali Lush, the property and the surrounding culture. Explore some articles and posts!
        </p>
      </header>
      <section className="container" aria-label="Posts">
        <ul className={styles.list}>
          {posts.map((post, i) => (
            <li key={post.route} className={i === 0 ? styles.featured : undefined} data-reveal>
              <Link href={post.route} className={styles.card}>
                <div className={`frame ${styles.cover}`}>
                  <Picture name={post.cover} sizes={i === 0 ? '(min-width: 900px) 60vw, 100vw' : '(min-width: 900px) 30vw, 100vw'} priority={i === 0} alt="" />
                </div>
                <div className={styles.cardText}>
                  <time dateTime={post.isoDate} className={styles.date}>{post.date}</time>
                  <h2 className={styles.title}>{post.title}</h2>
                  {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
