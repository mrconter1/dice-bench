import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="font-mono text-sm font-bold">
          DiceBench
        </Link>
        <nav className="ml-auto flex gap-6">
          <Link href="https://h-matched.vercel.app/" 
                className="text-muted-foreground hover:text-foreground text-sm"
                target="_blank"
                rel="noopener noreferrer">
            H-Matched
          </Link>
          <a href="https://github.com/mrconter1/dice-bench" 
             className="text-muted-foreground hover:text-foreground text-sm"
             target="_blank"
             rel="noopener noreferrer">
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
} 