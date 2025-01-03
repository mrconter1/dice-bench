import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link 
          href="/" 
          className="relative font-mono text-lg font-bold bg-gradient-to-r from-primary via-accent to-primary bg-300% bg-clip-text text-transparent animate-gradient group"
        >
          <span className="relative">
            DiceBench
            <span className="absolute -bottom-px left-0 w-full h-px bg-gradient-to-r from-primary/0 via-accent/70 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-8">
          <Link 
            href="https://h-matched.vercel.app/" 
            className="relative text-primary/80 hover:text-accent transition-colors text-sm group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="relative">
              H-Matched
              <span className="absolute -bottom-px left-0 w-full h-px bg-gradient-to-r from-accent/0 via-accent to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </span>
          </Link>
          <a 
            href="https://github.com/mrconter1/dice-bench" 
            className="relative text-primary/80 hover:text-accent transition-colors text-sm group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="relative">
              GitHub
              <span className="absolute -bottom-px left-0 w-full h-px bg-gradient-to-r from-accent/0 via-accent to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </span>
          </a>
        </nav>
      </div>
    </header>
  )
} 