import { useState } from "react";
import { Icon } from "./Icon";

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
};

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="video-facade">
      {isActive ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="video-trigger"
          onClick={() => setIsActive(true)}
          aria-label={`Play video: ${title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            alt=""
            loading="lazy"
          />
          <span className="video-play">
            <Icon name="play" />
            Watch the walkthrough
          </span>
        </button>
      )}
    </div>
  );
}
