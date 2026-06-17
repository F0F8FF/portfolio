import { PROFILE, PROJECTS } from "@/lib/content";
import { Badge } from "@/components/badge";
import { FeaturedProject, ProjectGridCard } from "@/components/project-card";
import { ArrowDown } from "lucide-react";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  const featured = PROJECTS.filter((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6">
      {/* Nav */}
      <header className="flex items-center justify-between py-6">
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-sm font-semibold hover:text-primary"
        >
          github.com/F0F8FF
        </a>
        <nav className="hidden items-center gap-6 text-sm text-muted sm:flex">
          <a href="#projects" className="hover:text-foreground">
            프로젝트
          </a>
          <a href="#stack" className="hover:text-foreground">
            스택
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-start gap-5 py-16 md:py-24">
        <Badge variant="primary">
          <span>●</span> AI Engineer · Full-stack
        </Badge>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
          {PROFILE.tagline}
        </h1>
        <p className="max-w-xl text-base text-muted md:text-lg">
          {PROFILE.subtitle}
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-semibold text-[hsl(222_47%_6%)] hover:bg-primary/90"
          >
            <GithubIcon className="h-4 w-4" /> GitHub
          </a>
        </div>
        <a
          href="#projects"
          className="mt-6 inline-flex items-center gap-1 text-xs text-muted hover:text-foreground"
        >
          대표 프로젝트 보기 <ArrowDown className="h-3 w-3" />
        </a>
      </section>

      {/* Featured projects */}
      <section id="projects" className="py-10">
        <h2 className="mb-2 text-xs font-mono uppercase tracking-widest text-muted">
          Featured Work
        </h2>
        <p className="mb-8 text-sm text-muted">
          문제 정의 → 접근 → 엔지니어링 결정 → 정량 결과 중심으로 정리했습니다.
        </p>
        <div className="flex flex-col gap-6">
          {featured.map((p) => (
            <FeaturedProject key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* All projects */}
      {others.length > 0 && (
        <section className="py-10">
          <h2 className="mb-6 text-xs font-mono uppercase tracking-widest text-muted">
            More Projects
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {others.map((p) => (
              <ProjectGridCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}

      {/* Stack */}
      <section id="stack" className="py-10">
        <h2 className="mb-6 text-xs font-mono uppercase tracking-widest text-muted">
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {PROFILE.stack.map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>
      </section>

      {/* GitHub */}
      <section
        id="contact"
        className="my-10 rounded-[var(--radius)] border border-border bg-surface/50 p-8 text-center"
      >
        <h2 className="mb-2 text-xl font-semibold">코드 & 데모</h2>
        <p className="mx-auto mb-6 max-w-md text-sm text-muted">
          프로젝트 소스와 README는 GitHub에서 확인할 수 있습니다.
        </p>
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-border px-4 py-2 text-sm hover:bg-surface-2"
        >
          <GithubIcon className="h-4 w-4" />
          github.com/F0F8FF
        </a>
      </section>

      <footer className="py-8 text-center text-xs text-muted">
        © {new Date().getFullYear()}. Built with Next.js.
      </footer>
    </main>
  );
}
