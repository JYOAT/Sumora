import { Pizza } from "lucide-react";
import { MotionDiv, MotionH3 } from "../common/motion-wrapper";
import { SummaryViewer } from "../summaries/summary-viewer";

const DEMO_SUMMARY = `# Quick Overview
Next.js 15 introduces powerful new features like Server Actions, improved caching, and enhanced routing — helping developers build high-performance web apps with ease.

# Bottom Line
🔥 Master Next.js 15 to build fast, scalable, and SEO-friendly web applications with the latest React features and best practices.

# Final Thoughts
This course transforms developers into Next.js experts, enabling them to build production-ready applications with confidence and efficiency.`;
export default function DemoSection() {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%-3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.14% 14.14%, 100% 61.8%, 67.92% 56.9%, 45.96% 91.17%, 29.89% 72.5%, 32.64% 62.08%, 52.42% 68.1%, 60.74% 85.53%, 85.53% 78.5%, 87.62% 44.1%, 71.76% 42.64%, 51.76% 17.65%)",
            }}
          ></div>
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4">
            <Pizza className="w-6 h-6 text-rose-500"></Pizza>
          </div>
          <div className="text-center mb-16">
            <MotionH3
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6"
            >
              Watch how Sumora transforms your PDFs into concise summaries
            </MotionH3>
          </div>
          <MotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center px-2 sm:px-4 lg:px-6"
          >
            <SummaryViewer summary={DEMO_SUMMARY}></SummaryViewer>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
