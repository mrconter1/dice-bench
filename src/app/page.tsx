import { VideoPlayer } from '@/components/video-player'
import { ContactButton } from '@/components/contact-button'
import { SortableTable } from "@/components/sortable-table"
import { CitationBlock } from '@/components/citation-block'

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
                <span>3. DiceBench Overview</span>
              </a>
              <ul className="ml-6 mt-2 space-y-2">
                <li><a href="#performance" className="text-primary/80 hover:text-accent transition-colors">Leaderboard</a></li>
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
            <li>
              <a href="#citation" className="text-primary hover:text-accent transition-colors flex items-center gap-2 group">
                <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
                <span>6. Citation</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Motivation Section */}
        <section id="motivation" className="mb-16 scroll-mt-20">
          <h2 className="text-secondary-foreground">Motivation</h2>
          <div className="bg-secondary/10 p-6 rounded-lg border border-secondary">
            <p>
              Our analysis of <strong>benchmark lifespans</strong> suggests we need <strong>evaluation methods</strong>{' '}
              that can meaningfully differentiate between systems operating <strong>beyond human performance</strong>. 
              Just as humans can intuitively predict the trajectory of moving vehicles—a task that would be nearly 
              impossible for simpler animals—we expect that more advanced AI systems should demonstrate{' '}
              <strong>increasingly accurate predictions</strong> of complex physical systems like dice rolls, even 
              when humans cannot. This creates an opportunity to measure intelligence at levels{' '}
              <strong>far above human capability</strong>, rather than limiting ourselves to human-level intelligence as a ceiling.
            </p>
            <p className="mb-0">
              Our analysis of benchmark lifespans (documented at <a href="https://h-matched.vercel.app/" 
              className="font-medium text-accent hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">H-Matched</a>) suggests
              an opportunity to expand our evaluation methods. The increasing frequency with which 
              AI systems achieve human-level performance on these benchmarks indicates that 
              complementary approaches to AI evaluation could be beneficial for measuring and 
              understanding artificial intelligence.
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
            <div id="information-completeness" className="p-6 rounded-lg bg-gradient-to-br from-secondary/20 to-transparent border border-secondary">
              <h4 className="font-bold text-primary mb-3">1. Information Completeness</h4>
              <p className="mb-0">
                Each datapoint must contain sufficient information to theoretically achieve better
                performance than random guessing. In DiceBench, each video frame sequence contains all the
                physical information (momentum, rotation, surface properties) needed to predict
                the outcome, even though humans cannot process this information effectively.
              </p>
            </div>

            <div id="human-performance" className="p-6 rounded-lg bg-gradient-to-br from-secondary/20 to-transparent border border-secondary">
              <h4 className="font-bold text-primary mb-3">2. Human Performance Gap</h4>
              <p className="mb-0">
                Breaking free from anthropocentric bias, the benchmark must measure capabilities 
                that transcend human cognitive limitations. By design, human performance should 
                be demonstrably far from optimal, challenging our assumption that human-level 
                performance is a meaningful milestone for advanced AI systems.
              </p>
            </div>

            <div id="objective-evaluation" className="p-6 rounded-lg bg-gradient-to-br from-secondary/20 to-transparent border border-secondary">
              <h4 className="font-bold text-primary mb-3">3. Objective Evaluation</h4>
              <p className="mb-0">
                Each data point must have an unambiguous, verifiable correct answer, allowing for precise
                performance measurement. This enables us to identify superior performance even in domains
                where humans perform poorly. In DiceBench, each video has exactly one correct final die outcome.
              </p>
            </div>
          </div>
        </section>

        {/* DiceBench Overview Section */}
        <section id="dicebench" className="mb-16 scroll-mt-20">
          <h2 className="text-secondary-foreground">DiceBench Overview</h2>
          <div className="bg-secondary/10 p-6 rounded-lg border border-secondary space-y-6">
            <div className="space-y-4">
              <p>
                DiceBench consists of a <strong>private evaluation set of 100 videos</strong> and a 
                <strong> public dataset of 10 videos</strong> available through the interactive test 
                on this website. All videos are recorded using a handheld Galaxy S24 camera, capturing 
                dice rolls across ten different surface types. Each sequence shows a die of varying color 
                and material being rolled, cutting approximately one second before it comes to rest—after 
                at least two bounces on the surface.
              </p>
              <p>
                While all necessary physical information for prediction is present in the videos 
                (momentum, rotation, surface properties), the timing makes the final outcome challenging 
                to determine through human perception alone. The public dataset allows researchers to 
                benchmark current vision models like <strong>GPT-4V</strong> and <strong>Gemini Pro Vision</strong>{' '}
                before requesting access to the full evaluation set, which is kept private to maintain 
                benchmark integrity.
              </p>
            </div>

            <div id="performance" className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Leaderboard</h3>
              <div className="not-prose">
                <SortableTable />
              </div>
            </div>
          </div>
        </section>

        {/* Try it Yourself section */}
        <section id="try-it" className="mb-16 scroll-mt-20">
          <h2 className="text-secondary-foreground">Try it Yourself</h2>
          <div className="bg-secondary/10 p-6 rounded-lg border border-secondary mb-8">
            <p className="mb-6">
              Below is an example video that demonstrates the task. The video stops after
              two bounces, and your challenge is to predict the final number shown on the die.
              You can use the controls to play, pause, step through frames, and adjust playback
              speed. 
              You can also zoom in and pan around the video using your mouse wheel or pinch gestures on mobile.
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
              {' '}for access to the private dataset. We encourage
              the AI research community to join us in developing more PHL Benchmarks as we move into an
              era where traditional human-comparative benchmarks may no longer be sufficient.
            </p>
          </div>
        </section>

        {/* Citation Section */}
        <section id="citation" className="mb-12 scroll-mt-20">
          <h2 className="text-secondary-foreground">Citation</h2>
          <div className="bg-secondary/10 p-6 rounded-lg border border-secondary">
            <p className="mb-4">If you use DiceBench in your research, please cite our work:</p>
            <CitationBlock />
          </div>
        </section>

      </main>
    </div>
  );
}
