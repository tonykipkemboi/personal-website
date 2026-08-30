type YouTubeProps = {
  /** The video id, e.g. `Mj7A5OdTXz0` from youtube.com/watch?v=Mj7A5OdTXz0 */
  id: string
  /** Accessible title for the iframe. Use the real video title. */
  title: string
  /** Optional caption rendered under the player. */
  caption?: string
}

/**
 * Responsive, lazy-loaded YouTube embed.
 *
 * Uses youtube-nocookie.com so the player does not set tracking cookies
 * until a visitor actually presses play.
 */
export function YouTube({ id, title, caption }: YouTubeProps) {
  return (
    <figure className="my-8">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-100">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-neutral-500">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export default YouTube
