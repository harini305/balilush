import images from '@/data/images.json';
import alts from '@/data/alt-text';

// Renders a pre-generated derivative set (scripts/build-images.mjs) as <picture>
// with AVIF/WebP sources and a JPEG fallback. No runtime image optimisation.
export default function Picture({ name, alt, sizes = '100vw', priority = false, className, imgClassName }) {
  const meta = images[name];
  if (!meta) throw new Error(`Unknown image "${name}" — add it to scripts/image-list.mjs and rebuild images.`);
  const base = `/images/${name}`;
  const srcSet = (ext) => meta.widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(', ');
  const fallbackHeight = Math.round((meta.height / meta.width) * meta.fallback);

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`${base}-${meta.fallback}.jpg`}
        width={meta.fallback}
        height={fallbackHeight}
        alt={alt ?? alts[name] ?? ''}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding={priority ? 'sync' : 'async'}
        className={imgClassName}
      />
    </picture>
  );
}

export function imageMeta(name) {
  return images[name];
}
