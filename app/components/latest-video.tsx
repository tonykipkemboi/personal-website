export function PopularVideo() {
  // Most popular video details
  const popularVideo = {
    title:
      'How to Chat with Your PDFs Using Local Large Language Models [Ollama RAG]',
    videoId: 'ztBJqzBU5kc',
    description:
      'Learn how to build a powerful PDF chat system using Ollama and LangChain. This tutorial shows you how to create a Retrieval-Augmented Generation (RAG) system that runs completely on your local machine.',
    views: '191K+ views',
    subscribers: '8.2K',
  }

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
      <div className="aspect-video relative">
        <iframe
          src={`https://www.youtube.com/embed/${popularVideo.videoId}`}
          title={popularVideo.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-medium text-neutral-900 dark:text-neutral-100 line-clamp-2">
            {popularVideo.title}
          </h3>
          <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 whitespace-nowrap flex-shrink-0">
            <span>{popularVideo.views}</span>
            <span className="text-neutral-300 dark:text-neutral-700">·</span>
            <span>{popularVideo.subscribers} subs</span>
          </div>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2">
          {popularVideo.description}
        </p>
      </div>
    </div>
  )
}
