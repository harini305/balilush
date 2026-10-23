import Link from 'next/link';
import { notFound } from 'next/navigation';
import Picture from '@/components/Picture';
import Gallery from '@/components/Gallery';
import YouTube from '@/components/YouTube';
import { getPost, posts } from '@/lib/blog';
import { galleryItems } from '@/lib/gallery';
import styles from './post.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.route.replace(/^\/post\//, '').split('/') }));
}

async function resolve(params) {
  const { slug } = await params;
  return getPost(`/post/${slug.join('/')}`);
}

export async function generateMetadata({ params }) {
  const post = await resolve(params);
  if (!post) return {};
  return {
    title: { absolute: `${post.title} | Bali Lush` },
    description: post.excerpt ?? `${post.title} — from the Bali Lush blog.`,
    alternates: { canonical: post.route },
    openGraph: { type: 'article', images: [`/images/${post.cover}-800.jpg`] },
  };
}

function Block({ block }) {
  switch (block.type) {
    case 'p':
      return <p>{block.text}</p>;
    case 'h2':
      return <h2 className={styles.h2}>{block.text}</h2>;
    case 'ul':
      return (
        <ul className={styles.ul}>
          {block.items.map((item) => (
            <li key={item.text}>
              {item.text}
              {item.link && (
                <>
                  {' '}
                  {item.link.lead}:{' '}
                  <a href={item.link.href} target="_blank" rel="noopener">
                    {item.link.label}
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </>
              )}
            </li>
          ))}
        </ul>
      );
    case 'figure':
      return (
        <figure className={styles.figure}>
          <Picture name={block.image} sizes="(min-width: 820px) 760px, 100vw" />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case 'gallery':
      return (
        <div className={styles.gallery}>
          <Gallery label="Post photos" layout="even" items={galleryItems(block.images, { captions: block.captions, sizes: '(min-width: 820px) 250px, 50vw' })} />
        </div>
      );
    case 'video':
      return (
        <div className={styles.video}>
          <YouTube id={block.youtubeId} title={block.title} />
        </div>
      );
    case 'tags':
      return <p className={styles.tags}>{block.text}</p>;
    default:
      return null;
  }
}

export default async function PostPage({ params }) {
  const post = await resolve(params);
  if (!post) notFound();
  // Show the cover only when the post body doesn't already include it.
  const coverInBody = post.body.some((b) => b.image === post.cover || b.images?.includes(post.cover));

  return (
    <article className={`container ${styles.article}`}>
      <header className={styles.head}>
        <Link href="/blog" className={styles.back}>Blog</Link>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.meta}>
          <time dateTime={post.isoDate}>{post.date}</time>
          {post.updated && <span> · {post.updated}</span>}
        </p>
      </header>
      {!coverInBody && (
        <figure className={styles.figure}>
          <Picture name={post.cover} sizes="(min-width: 820px) 760px, 100vw" priority />
        </figure>
      )}
      <div className={styles.body}>
        {post.body.map((block, i) => <Block key={i} block={block} />)}
      </div>
    </article>
  );
}
