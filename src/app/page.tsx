import { VideoPlayer } from '@/components/video-player'
import { ContactButton } from '@/components/contact-button'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <main className="prose prose-neutral dark:prose-invert">
        <h1 className="mb-8">DiceBench: A Post-Human Level Benchmark</h1>
        
        <p className="text-lg font-medium text-muted-foreground mb-8">
          Introducing the first PHL (Post-Human Level) Benchmark for testing superintelligent AI systems
        </p>

        {/* Table of Contents */}
        <nav className="my-8 p-6 border rounded-lg bg-muted/50">
          <h2 className="mt-0 mb-4">Contents</h2>
          <ul className="space-y-2 list-none ml-0">
            <li>
              <a href="#motivation">1. Motivation</a>
            </li>
            <li>
              <a href="#phl-definition">2. Post-Human Level (PHL) Benchmarks</a>
              <ul className="ml-4 mt-2 space-y-1">
                <li><a href="#information-completeness">Information Completeness</a></li>
                <li><a href="#human-performance">Human Performance Gap</a></li>
                <li><a href="#objective-evaluation">Objective Evaluation</a></li>
              </ul>
            </li>
            <li>
              <a href="#dicebench">3. DiceBench Implementation</a>
              <ul className="ml-4 mt-2 space-y-1">
                <li><a href="#methodology">Methodology</a></li>
                <li><a href="#dataset">Dataset Structure</a></li>
                <li><a href="#performance">Current Performance</a></li>
              </ul>
            </li>
            <li>
              <a href="#try-it">4. Try it Yourself</a>
            </li>
            <li>
              <a href="#access">5. Access & Contact</a>
            </li>
          </ul>
        </nav>

        {/* Motivation Section */}
        <section id="motivation" className="mb-12">
          <h2>Motivation</h2>
          <p>
            The AI research community has traditionally relied on human performance as the gold standard
            for evaluating AI systems. We've progressed from middle school to high school benchmarks,
            then to college-level tests, and finally to PhD-level challenges. However, we're rapidly
            approaching—or have already reached—a critical inflection point where this approach is
            becoming obsolete.
          </p>
          <p>
            Our analysis of benchmark lifespans (documented at <a href="https://h-matched.vercel.app/" 
            className="font-medium" target="_blank" rel="noopener noreferrer">H-Matched</a>) reveals
            an accelerating trend: the time between a benchmark's release and AI systems achieving
            human-level performance is shrinking dramatically. Even sophisticated benchmarks like ARC-AGI
            are being solved faster than anticipated.
          </p>
        </section>

        {/* PHL Definition Section */}
        <section id="phl-definition" className="mb-12">
          <h2>Post-Human Level (PHL) Benchmarks</h2>
          <p>
            We propose a paradigm shift in AI evaluation methodology through the introduction of
            Post-Human Level (PHL) Benchmarks. These benchmarks are fundamentally different from
            traditional AI evaluation methods in that they are designed to measure capabilities
            beyond human performance while maintaining objective measurability.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Definition of PHL Benchmarks</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">1. Information Completeness</h4>
              <p>
                Each datapoint must <i>arguably</i> contain sufficient information to theoretically achieve better
                performance than random guessing. In DiceBench, each video frame sequence contains all the
                physical information (momentum, rotation, surface properties) needed to predict
                the outcome, even though humans cannot process this information effectively.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">2. Human Performance Gap</h4>
              <p>
                Human performance is not a focus in PHL benchmarks, moving beyond using human capabilities
                as a proxy for intelligence. Though human performance on these tasks is realistically very
                low compared to the theoretical maximum, establishing that the benchmark measures capabilities
                fundamentally disconnected from human intelligence.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">3. Objective Evaluation</h4>
              <p>
                Each data point must have an unambiguous, verifiable correct answer. This
                allows for precise performance measurement and makes it possible to identify
                when an AI system has achieved superior performance. In DiceBench, each
                video has exactly one correct final die outcome.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 border rounded-lg bg-muted/50">
            <h4 className="font-medium mb-2">Why This Matters</h4>
            <p>
              Traditional benchmarks become obsolete when AI reaches human-level performance,
              making it difficult to measure further progress. PHL Benchmarks provide a new
              way to measure AI capabilities by identifying tasks where:
            </p>
            <ul className="mt-4 ml-6 list-disc space-y-2">
              <li>
                We can be confident better-than-human performance is possible (Information Completeness)
              </li>
              <li>
                We can verify when it has been achieved (Objective Evaluation)
              </li>
              <li>
                The benchmark won't be quickly saturated by reaching human-level performance
                (Human Performance Gap)
              </li>
            </ul>
          </div>
        </section>

        {/* DiceBench Implementation */}
        <section id="dicebench" className="mb-12">
          <h2>DiceBench Implementation</h2>
          <p>
            DiceBench represents our first implementation of a PHL Benchmark. The task—predicting
            dice outcomes from partial throw videos—is specifically chosen because it meets our key
            criteria: it's nearly impossible for humans to solve accurately, yet we can be confident
            that a sufficiently advanced AI system could perform this task by analyzing physics,
            momentum, and rotation patterns from the video frames.
          </p>
          <p>
            This benchmark demonstrates a key principle of PHL evaluation: we don't need to be able
            to solve the task ourselves to know that it's solvable by a sufficiently advanced
            intelligence. The laws of physics that determine the dice's final state are deterministic
            (excluding quantum effects), making this an objectively measurable task despite being
            beyond human capability.
          </p>
        </section>

        {/* Dataset Structure */}
        <section id="dataset" className="mb-12">
          <h2>Dataset Structure</h2>
          <p>
            The benchmark consists of two parts:
          </p>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>
              A private evaluation set of 100 videos with known outcomes, used for
              official model evaluation. These videos are split across 10 different
              surfaces and dice colors to ensure robust testing.
            </li>
            <li>
              A public example video (shown below) where researchers and visitors
              can test their own prediction capabilities and understand the task's
              complexity.
            </li>
          </ul>
        </section>

        {/* Current Performance */}
        <section id="performance" className="mb-12">
          <h2>Current Performance</h2>
          <div className="not-prose">
            <div className="border rounded-lg p-6 bg-muted/50">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left pb-4">System</th>
                    <th className="text-right pb-4">Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-4">Random Baseline</td>
                    <td className="text-right">16.67%</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-4">Human Performance</td>
                    <td className="text-right">x%</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-4">Gemini 1.5 Pro</td>
                    <td className="text-right">N%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Try it Yourself */}
        <section id="try-it" className="mb-12">
          <h2>Try it Yourself</h2>
          <p>
            Below is an example video that demonstrates the task. The video stops after
            two bounces, and your challenge is to predict the final number shown on the die.
            You can use the controls to play, pause, step through frames, and adjust playback
            speed.
          </p>
          <div className="not-prose">
            <VideoPlayer />
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Note: This example is representative of the videos in the evaluation set but
            is not part of the official benchmark.
          </p>
        </section>

        {/* Access Section */}
        <section id="access" className="mb-12">
          <h2>Access & Contact</h2>
          <p>
            The evaluation set is kept private to maintain benchmark integrity. Researchers and organizations
            interested in evaluating their models can{' '}
            <ContactButton />
            {' '}for access to the test set. We encourage
            the AI research community to join us in developing more PHL Benchmarks as we move into an
            era where traditional human-comparative benchmarks may no longer be sufficient.
          </p>
        </section>
      </main>
    </div>
  );
}
