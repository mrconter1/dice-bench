export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <main className="prose prose-neutral dark:prose-invert">
        <h1 className="mb-8">DiceBench: A Post-Human Level Benchmark</h1>
        
        <p className="text-lg font-medium text-muted-foreground mb-8">
          Introducing the first PHL (Post-Human Level) Benchmark for testing superintelligent AI systems
        </p>

        <section className="mb-12">
          <h2>The End of Human-Comparative Benchmarks</h2>
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

        <section className="mb-12">
          <h2>Post-Human Level (PHL) Benchmarks</h2>
          <p>
            We propose a paradigm shift in AI evaluation methodology through the introduction of
            Post-Human Level (PHL) Benchmarks. Instead of persistently trying to create tasks that
            capture intelligence through human performance as a proxy, PHL Benchmarks are designed
            to measure capabilities that are:
          </p>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Demonstrably beyond human capabilities</li>
            <li>Objectively measurable</li>
            <li>Have clear theoretical upper bounds for performance</li>
          </ul>
          <p>
            This approach acknowledges that as AI systems surpass human capabilities in more domains,
            we need new ways to measure and understand their capabilities beyond human-comparative
            metrics.
          </p>
        </section>

        <section className="mb-12">
          <h2>DiceBench: The First PHL Benchmark</h2>
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

        <section className="mb-12">
          <h2>Methodology</h2>
          <p>
            The benchmark consists of 100 high-speed video recordings of dice throws, cut precisely two
            bounces into each throw. The task is to predict the final outcome of each throw. The dataset
            is divided into ten categories, each featuring different colored dice and surfaces to ensure
            robust testing across varying conditions.
          </p>
          <p>
            Videos were captured using a Samsung S24 under controlled conditions. Each video provides
            sufficient frames to theoretically determine the dice's momentum, rotation, and interaction
            with the surface, while being far too complex for human visual processing to analyze effectively.
          </p>
        </section>

        <section className="mb-12">
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

        <section className="mb-12">
          <h2>Access</h2>
          <p>
            The evaluation set is kept private to maintain benchmark integrity. Researchers and organizations
            interested in evaluating their models can contact us for access to the test set. We encourage
            the AI research community to join us in developing more PHL Benchmarks as we move into an
            era where traditional human-comparative benchmarks may no longer be sufficient.
          </p>
        </section>
      </main>
    </div>
  );
}
