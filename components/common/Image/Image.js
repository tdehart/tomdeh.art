import "lazysizes";

export function Image({ alt, src, previewSrc, className }) {
  return (
    <picture className={className}>
      <source type="image/png" data-srcset={src} />
      <img
        className={`lazyload blur ${className}`}
        alt={alt}
        src={previewSrc}
      />
    </picture>
  );
}
