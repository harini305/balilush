import Picture, { imageMeta } from '@/components/Picture';
import alts from '@/data/alt-text';

// Builds the props <Gallery> needs: a server-rendered thumbnail plus the
// full-size WebP set used by the viewer.
export function galleryItems(names, { sizes = '(min-width: 768px) 25vw, 50vw', captions = [], firstSizes } = {}) {
  return names.map((name, i) => {
    const meta = imageMeta(name);
    const base = `/images/${name}`;
    return {
      src: `${base}-${meta.fallback}.jpg`,
      srcSet: meta.widths.map((w) => `${base}-${w}.webp ${w}w`).join(', '),
      width: meta.width,
      height: meta.height,
      alt: alts[name] ?? '',
      caption: captions[i] ?? null,
      thumb: <Picture name={name} sizes={i === 0 && firstSizes ? firstSizes : sizes} />,
    };
  });
}
