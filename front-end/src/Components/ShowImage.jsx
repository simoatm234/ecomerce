import { useState } from 'react';
import { ImageOff } from 'lucide-react';

export default function ShowImage({ url, alt = 'Image', className = '' }) {
  const backendImageUrl = import.meta.env.VITE_BACK_END_URL_DATA;

  const [failed, setFailed] = useState(false);

  // No url provided at all — show placeholder
  if (!url) {
    return (
      <div
        className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#cbc4d2] text-[#494551] ${className}`}
      >
        <ImageOff size={36} />
        <p className="mt-2 text-sm">No image</p>
      </div>
    );
  }

  // Build the full image src.
  // If `url` is already an absolute URL (http/https), use it as-is —
  // otherwise prefix it with the backend base URL.
  const isAbsolute = /^https?:\/\//i.test(url);
  const src = isAbsolute
    ? url
    : `${backendImageUrl}/${url.replace(/^\/+/, '')}`;

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#cbc4d2] text-[#494551] ${className}`}
      >
        <ImageOff size={36} />
        <p className="mt-2 text-sm">Failed to load image</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`object-cover rounded-xl border border-[#cbc4d2] ${className}`}
    />
  );
}
