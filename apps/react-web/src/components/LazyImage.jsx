import { useEffect, useRef, useState } from 'react';

export const LazyImage = ({ src, alt }) => {
  const [inView, setInView] = useState(false);
  const placeholderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      }
    });

    if (placeholderRef.current != null) {
      observer.observe(placeholderRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={placeholderRef}>
      {inView ? (
        <img src={src} alt={alt} width={500} height={500} />
      ) : (
        <img src='https://placehold.co/600x400' width={500} height={500} />
      )}
    </div>
  );
};
