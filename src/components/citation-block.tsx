'use client'

import { useState } from 'react'

const bibtex = `@misc{dicebench2024,
  title = {DiceBench: A Post-Human Level Benchmark},
  author = {Lindahl, Rasmus},
  year = {2024},
  publisher = {becose},
  url = {https://dicebench.vercel.app},
  note = {AI consultancy specializing in advanced machine learning solutions}
}`

export function CitationBlock() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(bibtex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <div className="relative">
      <pre className="font-mono text-sm p-4 bg-background/50 rounded-lg border border-secondary/50 overflow-x-auto whitespace-pre-wrap">
        {bibtex}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 text-primary/50 hover:text-accent transition-colors rounded-lg hover:bg-secondary/20 group"
        title="Copy to clipboard"
      >
        {copied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          >
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
        )}
        <span className={`
          absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 
          rounded bg-accent text-background text-xs whitespace-nowrap
          transition-all duration-200
          ${copied 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-2 pointer-events-none'
          }
        `}>
          Copied!
        </span>
      </button>
    </div>
  )
} 