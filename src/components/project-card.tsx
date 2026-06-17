import { Badge } from "@/components/badge";
import type { Project } from "@/lib/content";
import { ArrowUpRight, Target, Wrench, GitBranch } from "lucide-react";

const STATUS: Record<Project["status"], { label: string; variant: "primary" | "accent" | "default" }> = {
  live: { label: "Live", variant: "primary" },
  wip: { label: "진행 중", variant: "accent" },
  planned: { label: "예정", variant: "default" },
};

export function FeaturedProject({ project }: { project: Project }) {
  const status = STATUS[project.status];
  return (
    <article className="rounded-[var(--radius)] border border-border bg-surface/50 p-6 md:p-8">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
        <Badge variant={status.variant}>{status.label}</Badge>
        <span className="text-xs text-muted">
          {project.role} · {project.period}
        </span>
      </div>

      <p className="mb-5 text-sm text-muted">{project.oneLiner}</p>

      {project.metrics.length > 0 && (
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-[var(--radius)] border border-border bg-surface-2/40 p-3"
            >
              <p className="text-lg font-semibold text-primary">{m.value}</p>
              <p className="text-[11px] text-muted">{m.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted">
            <Target className="h-3.5 w-3.5" /> 문제
          </p>
          <p className="text-sm leading-relaxed">{project.problem}</p>
        </div>
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted">
            <Wrench className="h-3.5 w-3.5" /> 접근
          </p>
          <ul className="space-y-1.5 text-sm">
            {project.approach.map((a) => (
              <li key={a} className="flex gap-2">
                <span className="text-primary">›</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {project.decisions.length > 0 && (
        <div className="mt-6">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-medium text-muted">
            <GitBranch className="h-3.5 w-3.5" /> 핵심 엔지니어링 결정
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {project.decisions.map((d) => (
              <div
                key={d.label}
                className="rounded-[var(--radius)] border border-border bg-surface-2/30 p-3"
              >
                <p className="text-sm font-medium">{d.label}</p>
                <p className="mt-1 text-xs text-muted">{d.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {project.tags.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>

      {project.links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-3">
          {project.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              {l.label} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

export function ProjectGridCard({ project }: { project: Project }) {
  const status = STATUS[project.status];
  return (
    <div className="flex flex-col rounded-[var(--radius)] border border-border bg-surface/40 p-5">
      <div className="mb-2 flex items-center gap-2">
        <h4 className="text-sm font-semibold">{project.title}</h4>
        <Badge variant={status.variant}>{status.label}</Badge>
      </div>
      <p className="mb-3 flex-1 text-sm text-muted">{project.oneLiner}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, 4).map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
    </div>
  );
}
