import Image from 'next/image'
import Link from 'next/link'

export function PopularVideo() {
  // Most popular video details
  const popularVideo = {
    title: "How to Chat with Your PDFs Using Local Large Language Models [Ollama RAG]",
    videoId: "ztBJqzBU5kc",
    description: "Learn how to build a powerful PDF chat system using Ollama and LangChain. This tutorial shows you how to create a Retrieval-Augmented Generation (RAG) system that runs completely on your local machine.",
    views: "140K+ views",
    thumbnail: `https://img.youtube.com/vi/ztBJqzBU5kc/maxresdefault.jpg`
  }

  return (
    <Link
      href={`https://www.youtube.com/watch?v=${popularVideo.videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-lg border border-neutral-200 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600 transition-all"
    >
      <div className="aspect-video relative">
        <Image
          src={popularVideo.thumbnail}
          alt={popularVideo.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-medium text-neutral-900 dark:text-neutral-100 line-clamp-2">
            {popularVideo.title}
          </h3>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {popularVideo.views}
          </span>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2">
          {popularVideo.description}
        </p>
      </div>
    </Link>
  )
}
