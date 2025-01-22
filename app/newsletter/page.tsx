import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ai agents & dna storage newsletter - tony kipkemboi',
  description: 'bi-weekly insights on ai agents and dna data storage technologies - the future of intelligence and information.',
}

export default function Newsletter() {
  return (
    <section>
      <h1 className="text-2xl font-medium mb-8 text-neutral-900 dark:text-neutral-100">
        my newsletter
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        welcome to my bi-weekly newsletter where i explore the fascinating intersection of <em><strong>ai agents</strong></em> and <em><strong>dna storage technologies</strong></em>. 
        expect quick, no-fluff updates on breakthroughs and news in ai agents, practical applications of dna data storage,
        and thought-provoking insights about the future of computing and data storage.
      </p>
      
      {/* Substack iframe embed */}
      <iframe
        src="https://tonykipkemboi.substack.com/embed?v=2"
        width="100%"
        height="320"
        style={{ border: '1px solid #EEE', background: 'transparent' }}
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </section>
  )
} 