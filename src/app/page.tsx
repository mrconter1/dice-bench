import { VideoPlayer } from '@/components/video-player'
import { ContactButton } from '@/components/contact-button'
import { SortableTable } from "@/components/sortable-table"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <main className="prose">
        <div className="space-y-4 text-center mb-16">
          <h1 className="mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-300% bg-clip-text text-transparent animate-gradient">
            DiceBench: A Post-Human Level Benchmark
          </h1>
          
          <p className="text-xl font-medium text-primary/90 mb-8 max-w-2xl mx-auto">
            Introducing the first PHL (Post-Human Level) Benchmark for testing superintelligent AI systems. 
            Developed by <a 
              href="https://midas-consulting.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-accent hover:text-primary transition-colors"
            >
              becose
            </a>, an AI consultancy specializing in advanced machine learning solutions.
          </p>
        </div>

        {/* Table of Contents */}
        <nav className="my-12 p-8 border-2 rounded-xl bg-secondary/30 shadow-lg shadow-secondary/5 backdrop-blur-sm">
          <h2 className="mt-0 mb-6 text-secondary-foreground font-bold">Contents</h2>
          <ul className="space-y-3 list-none ml-0">
            <li>
              <a href="#motivation" className="text-primary hover:text-accent transition-colors flex items-center gap-2 group">
                <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
                <span>1. Motivation</span>
              </a>
            </li>
            <li>
              <a href="#phl-definition" className="text-primary hover:text-accent transition-colors flex items-center gap-2 group">
                <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
                <span>2. Post-Human Level (PHL) Benchmarks</span>
              </a>
              <ul className="ml-6 mt-2 space-y-2">
                <li><a href="#information-completeness" className="text-primary/80 hover:text-accent transition-colors">Information Completeness</a></li>
                <li><a href="#human-performance" className="text-primary/80 hover:text-accent transition-colors">Human Performance Gap</a></li>
                <li><a href="#objective-evaluation" className="text-primary/80 hover:text-accent transition-colors">Objective Evaluation</a></li>
              </ul>
            </li>
            <li>
              <a href="#dicebench" className="text-primary hover:text-accent transition-colors flex items-center gap-2 group">
                <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
                <span>3. DiceBench Implementation</span>
              </a>
              <ul className="ml-6 mt-2 space-y-2">
                <li><a href="#methodology" className="text-primary/80 hover:text-accent transition-colors">Methodology</a></li>
                <li><a href="#dataset" className="text-primary/80 hover:text-accent transition-colors">Dataset Structure</a></li>
                <li><a href="#performance" className="text-primary/80 hover:text-accent transition-colors">Current Performance</a></li>
              </ul>
            </li>
            <li>
              <a href="#try-it" className="text-primary hover:text-accent transition-colors flex items-center gap-2 group">
                <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
                <span>4. Try it Yourself</span>
              </a>
            </li>
            <li>
              <a href="#access" className="text-primary hover:text-accent transition-colors flex items-center gap-2 group">
                <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
                <span>5. Access & Contact</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Motivation Section */}
        <section id="motivation" className="mb-16 scroll-mt-20">
          <h2 className="text-secondary-foreground">Motivation</h2>
          <div className="bg-secondary/10 p-6 rounded-lg border border-secondary">
            <p>
              For too long, the AI research community has treated human intelligence as a 
              "golden standard" for AI evaluation—a fundamental error in our approach. 
              We've clung to human performance as an artificial ceiling, progressing through 
              increasingly difficult human-centric benchmarks—from middle school to PhD-level 
              challenges. This anthropocentric focus has become not just obsolete, but 
              potentially harmful to progress in AI evaluation.
            </p>
            <p className="mb-0">
              Our analysis of benchmark lifespans (documented at <a href="https://h-matched.vercel.app/" 
              className="font-medium text-accent hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">H-Matched</a>) reveals
              a stark truth: we must abandon this notion of human intelligence as the golden standard. 
              The rapid pace at which AI systems surpass human-level performance on these benchmarks 
              demonstrates that our anthropocentric bias is holding us back from developing truly 
              meaningful measures of artificial intelligence.
            </p>
          </div>
        </section>

        {/* PHL Definition Section */}
        <section id="phl-definition" className="mb-16 scroll-mt-20">
          <h2 className="text-secondary-foreground">Post-Human Level (PHL) Benchmarks</h2>
          <p className="text-lg">
            We propose Post-Human Level (PHL) Benchmarks as a paradigm shift away from 
            anthropocentric evaluation methods. By moving beyond human performance as our 
            reference point, we can develop more meaningful standards for measuring artificial 
            intelligence. A PHL Benchmark is defined by three key criteria that deliberately 
            transcend traditional human-centric metrics:
          </p>
          
          <div className="grid gap-6 mt-8">
            <div className="p-6 rounded-lg bg-gradient-to-br from-secondary/20 to-transparent border border-secondary">
              <h4 className="font-bold text-primary mb-3">1. Information Completeness</h4>
              <p className="mb-0">
                Each datapoint must contain sufficient information to theoretically achieve better
                performance than random guessing. In DiceBench, each video frame sequence contains all the
                physical information (momentum, rotation, surface properties) needed to predict
                the outcome, even though humans cannot process this information effectively.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-gradient-to-br from-secondary/20 to-transparent border border-secondary">
              <h4 className="font-bold text-primary mb-3">2. Human Performance Gap</h4>
              <p className="mb-0">
                Breaking free from anthropocentric bias, the benchmark must measure capabilities 
                that transcend human cognitive limitations. By design, human performance should 
                be demonstrably far from optimal, challenging our assumption that human-level 
                performance is a meaningful milestone for advanced AI systems.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-gradient-to-br from-secondary/20 to-transparent border border-secondary">
              <h4 className="font-bold text-primary mb-3">3. Objective Evaluation</h4>
              <p className="mb-0">
                Each data point must have an unambiguous, verifiable correct answer, allowing for precise
                performance measurement. This enables us to identify superior performance even in domains
                where humans perform poorly. In DiceBench, each video has exactly one correct final die outcome.
              </p>
            </div>
          </div>
        </section>

        {/* Current Performance */}
        <section id="performance" className="mb-16 scroll-mt-20">
          <h2 className="text-secondary-foreground">Current Performance</h2>
          <div className="not-prose">
            <SortableTable />
          </div>
        </section>

        {/* Try it Yourself */}
        <section id="try-it" className="mb-16 scroll-mt-20">
          <h2 className="text-secondary-foreground">Try it Yourself</h2>
          <div className="bg-secondary/10 p-6 rounded-lg border border-secondary mb-8">
            <p className="mb-6">
              Below is an example video that demonstrates the task. The video stops after
              two bounces, and your challenge is to predict the final number shown on the die.
              You can use the controls to play, pause, step through frames, and adjust playback
              speed.
            </p>
            <div className="not-prose rounded-lg overflow-hidden shadow-xl">
              <VideoPlayer />
            </div>
          </div>
          <p className="text-sm text-muted-foreground italic">
            Note: This example is representative of the videos in the evaluation set but
            is not part of the official benchmark.
          </p>
        </section>

        {/* Access Section */}
        <section id="access" className="mb-12 scroll-mt-20">
          <h2 className="text-secondary-foreground">Access & Contact</h2>
          <div className="bg-secondary/10 p-6 rounded-lg border border-secondary">
            <p className="mb-0">
              The evaluation set is kept private to maintain benchmark integrity. Researchers and organizations
              interested in evaluating their models can{' '}
              <ContactButton />
              {' '}for access to the test set. We encourage
              the AI research community to join us in developing more PHL Benchmarks as we move into an
              era where traditional human-comparative benchmarks may no longer be sufficient.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
