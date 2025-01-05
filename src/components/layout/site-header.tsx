import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b-2 border-primary/20 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/40">
      <div className="container flex h-16 items-center">
        <Link 
          href="/" 
          className="relative font-mono text-xl font-bold text-primary hover:text-accent transition-colors"
        >
          DiceBench
        </Link>
        <nav className="ml-auto flex items-center gap-8">
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