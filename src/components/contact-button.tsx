'use client'

export function ContactButton() {
  return (
    <button 
      onClick={() => window.location.href = 'mailto:rasmus.lindahl1996@gmail.com'}
      className="font-medium hover:underline inline-block"
      title="rasmus.lindahl1996@gmail.com"
    >
      contact us
    </button>
  )
} 