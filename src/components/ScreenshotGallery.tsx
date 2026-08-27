import { useCallback, useEffect, useRef, useState } from "react";
import type { ScreenshotEntry } from "../content/siteContent";

type ScreenshotGalleryProps = {
  items: readonly ScreenshotEntry[];
  label: string;
};

export function ScreenshotGallery({ items, label }: ScreenshotGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const lastOpened = useRef<number | null>(null);

  const close = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const step = useCallback(
    (delta: number) => {
      setSelectedIndex((current) => {
        if (current === null || items.length === 0) {
          return current;
        }
        return (current + delta + items.length) % items.length;
      });
    },
    [items.length]
  );

  useEffect(() => {
    if (selectedIndex === null) {
      if (lastOpened.current !== null) {
        triggerRefs.current[lastOpened.current]?.focus();
        lastOpened.current = null;
      }
      return;
    }

    lastOpened.current = selectedIndex;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      } else if (event.key === "ArrowRight") {
        step(1);
      } else if (event.key === "ArrowLeft") {
        step(-1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedIndex, close, step]);

  const selectedItem = selectedIndex === null ? null : items[selectedIndex];

  return (
    <>
      <div className="gallery-grid" aria-label={label} role="list">
        {items.map((item, index) => (
          <figure className="card shot-card" key={item.src} role="listitem">
            <button
              type="button"
              className="shot-trigger"
              onClick={() => setSelectedIndex(index)}
              aria-label={`Open larger view: ${item.caption}`}
              ref={(node) => {
                triggerRefs.current[index] = node;
              }}
            >
              <img
                src={item.thumb}
                alt={item.alt}
                loading="lazy"
                width={800}
                height={500}
              />
            </button>
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>

      {selectedItem ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Large view: ${selectedItem.caption}`}
          onClick={close}
        >
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <div className="lightbox-controls">
              <button
                type="button"
                className="icon-button"
                onClick={close}
                aria-label="Close screenshot preview"
                ref={closeRef}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            {items.length > 1 ? (
              <>
                <button
                  type="button"
                  className="icon-button lightbox-nav prev"
                  onClick={() => step(-1)}
                  aria-label="Previous screenshot"
                >
                  <span aria-hidden="true">‹</span>
                </button>
                <button
                  type="button"
                  className="icon-button lightbox-nav next"
                  onClick={() => step(1)}
                  aria-label="Next screenshot"
                >
                  <span aria-hidden="true">›</span>
                </button>
              </>
            ) : null}
            <picture>
              <source srcSet={selectedItem.src} type="image/webp" />
              <img
                src={selectedItem.fallback}
                alt={selectedItem.alt}
                className="lightbox-image"
              />
            </picture>
            <p className="lightbox-caption">
              {selectedItem.caption}{" "}
              <span className="muted">
                ({(selectedIndex ?? 0) + 1} of {items.length})
              </span>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function ScreenshotPicture({
  item,
  className,
  loading = "lazy"
}: {
  item: ScreenshotEntry;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  return (
    <picture>
      <source srcSet={item.src} type="image/webp" />
      <img
        src={item.fallback}
        alt={item.alt}
        loading={loading}
        decoding="async"
        {...(className ? { className } : {})}
      />
    </picture>
  );
}
