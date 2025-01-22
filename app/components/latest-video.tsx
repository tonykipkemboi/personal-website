import Image from 'next/image'
import Link from 'next/link'

export function LatestVideo() {
  // Latest video details
  const latestVideo = {
    title: "ai agent generated podcast using crewai and elevenlabs",
    videoId: "I5K8KdY__sU",
    description: "the video demonstrates the entire process from uploading a research paper to generating the final podcast, providing explanations of the code and functionalities along the way.",
    thumbnail: `https://img.youtube.com/vi/I5K8KdY__sU/maxresdefault.jpg`
  }

  return (
    <Link
      href={`https://www.youtube.com/watch?v=${latestVideo.videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-lg border border-neutral-200 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600 transition-all"
    >
      <div className="aspect-video relative">
        <Image
          src={latestVideo.thumbnail}
          alt={latestVideo.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-2">
          {latestVideo.title}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2">
          {latestVideo.description}
        </p>
      </div>
    </Link>
  )
}
