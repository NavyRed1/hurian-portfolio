import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/schemas/profile";

/**
 * Asymmetric hero: text left, a small "pipeline" panel right — a visual that is
 * specific to the DS/ML subject matter rather than decorative gradient text.
 */
export function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="grid grid-cols-1 items-center gap-14 py-24 md:grid-cols-[1.15fr_0.85fr] md:py-28">
      <div>
        <p className="font-sans text-[13px] tracking-wide text-sunset-3">
          DATA SCIENCE · MACHINE LEARNING · SOFTWARE
        </p>
        <h1 className="mt-5 max-w-xl font-display text-[34px] font-extrabold leading-[1.08] tracking-tight text-ink md:text-[54px]">
          Building with data,{" "}
          <span className="relative inline">
            models
            <span className="absolute inset-x-0 bottom-[2px] -z-10 h-[10px] bg-sunset-1/35" />
          </span>
          , and software.
        </h1>
        <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink-dim">
          {profile.headline}. {profile.bio}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="#projects" variant="primary">View Projects</Button>
          {profile.resume_url && <Button href={profile.resume_url}>View Resume</Button>}
        </div>
      </div>

      <div className="rounded-panel border border-line bg-panel p-6 font-mono text-xs text-ink-dim">
        <div className="mb-4 text-[11px] tracking-wide text-sunset-3">// current pipeline</div>
        <PipelineRow steps={[{ label: "raw_data", active: true }, { label: "clean" }, { label: "features" }]} />
        <PipelineRow steps={[{ label: "train" }, { label: "evaluate" }, { label: "deploy", active: true }]} />
        <div className="mt-4 flex justify-between border-t border-dashed border-line pt-4">
          <span>status</span>
          <b className="font-medium text-ink">running</b>
        </div>
      </div>
    </section>
  );
}

function PipelineRow({ steps }: { steps: { label: string; active?: boolean }[] }) {
  return (
    <div className="mb-1.5 flex items-center">
      {steps.map((step, i) => (
        <div key={step.label} className="flex flex-1 items-center">
          <div
            className={`flex-1 rounded-md border px-2.5 py-2 text-center ${
              step.active ? "border-sunset-2 bg-sunset-2/10 text-ink" : "border-line bg-white/[0.04]"
            }`}
          >
            {step.label}
          </div>
          {i < steps.length - 1 && <span className="px-1.5 text-sunset-2">→</span>}
        </div>
      ))}
    </div>
  );
}
