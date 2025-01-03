import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ai agents & dna storage newsletter - tony kipkemboi',
  description: 'bi-weekly insights on ai agents and dna data storage technologies - the future of intelligence and information.',
}

export default function Newsletter() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <section>
          <h1 className="text-2xl font-medium mb-8">
            my newsletter
          </h1>
        </section>
        <p className="text-lg mb-8">
          this bi-weekly newsletter brings you the latest in <em><strong>ai agents</strong></em> and <em><strong>dna storage technologies</strong></em>.
          i am interested in these two vertical at the moment and will be sharing my learnings and insights on these topics + industry news.
          no fluff or spam, just the good stuff. 
        </p>
        
        {/* Substack iframe embed */}
        <iframe
          src="https://tonykipkemboi.substack.com/embed?v=2"
          width="100%"
          height="320"
          style={{ border: '1px solid #EEE', background: 'white' }}
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>
    </div>
  )
} 