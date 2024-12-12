import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        tony kipkemboi
      </h1>
      <p className="mb-4">
        {`this is home for me. this where i write in lowercase because it does relive some stress when reading; it speaks to me as no pressure, just enjoy it. this is also where i share my thoughts.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
