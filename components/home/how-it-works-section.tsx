import { BrainCircuit, FileOutput, FileText, MoveRight } from "lucide-react";
import { ReactNode } from "react";
import { MotionDiv, MotionH2, MotionH3 } from "../common/motion-wrapper";

type Steps = {
  icon: ReactNode;
  label: string;
  description: string;
};
const steps: Steps[] = [
  {
    icon: <FileText size={64} strokeWidth={1.5}></FileText>,
    label: "Upload your PDF",
    description: "Simply drag and drop your PDF document or click to upload",
  },
  {
    icon: <BrainCircuit size={64} strokeWidth={1.5}></BrainCircuit>,
    label: "AI Analyzes",
    description: "Our advanced AI scans and analyzes the content of your PDF",
  },
  {
    icon: <FileOutput size={64} strokeWidth={1.5}></FileOutput>,
    label: "Get Summary",
    description: "Receive a concise and clear summary of your document",
  },
];
export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
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
        <div className="text-center mb-16">
          <MotionH2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-xl uppercase mb-4 text-rose-500"
          >
            How it works
          </MotionH2>
          <MotionH3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-bold text-3xl max-w-2xl mx-auto"
          >
            Transform any PDF into an easy-to-digest summary in 3 simple steps
          </MotionH3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {steps.map((step, idx) => (
            <MotionDiv
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative flex items-stretch"
              key={idx}
            >
              <StepItem {...step} />
              {idx < steps.length - 1 && (
                <MotionDiv
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.2 + 0.3 }}
                  className="hidden md:block absolute  top-1/2 -right-4 transform -translate-y-1/2 z-10"
                >
                  <MoveRight
                    size={32}
                    strokeWidth={1}
                    className="text-rose-400"
                  ></MoveRight>
                </MotionDiv>
              )}
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepItem({ icon, label, description }: Steps) {
  return (
    <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-rose-500/5 transition-colors group w-full">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-linear-to-br from-rose-500/10 to-transparent group-hover:from-rose-500/20 transition-colors">
          <div className="text-rose-500">{icon}</div>
        </div>
        <div className="flex flex-col gap-1 flex-1 justify-between">
          <h4 className="text-center font-bold text-xl">{label}</h4>
          <p className="text-center text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
