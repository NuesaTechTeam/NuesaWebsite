import { useEffect, useState } from "react";

const ShufflingImage = ({
  images,
  src,
  alt = "",
  className = "",
  imgClassName = "",
  interval = 4000,
}) => {
  const list = (
    Array.isArray(images) && images.length ? images : src ? [src] : []
  ).filter(Boolean);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (list.length <= 1) return undefined;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % list.length);
    }, interval);

    return () => clearInterval(timer);
  }, [list.length, interval]);

  if (list.length === 0) return null;

  if (list.length === 1) {
    return (
      <img
        src={list[0]}
        alt={alt}
        className={`${className} ${imgClassName}`.trim()}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {list.map((image, i) => (
        <img
          key={`${image}-${i}`}
          src={image}
          alt={alt}
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${imgClassName} ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

export default ShufflingImage;
