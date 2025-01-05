'use client'

export function ContactButton() {
  return (
    <button 
      onClick={() => window.location.href = 'mailto:rasmus.lindahl1996@gmail.com'}
      className="font-medium text-accent hover:text-primary transition-colors inline-block"
      title="rasmus.lindahl1996@gmail.com"
    >
      contact us
    </button>
  )
} 