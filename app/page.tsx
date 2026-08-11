"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Download,
  ArrowUpRight,
  Terminal,
  Send,
  User,
  Braces,
  Atom,
  FileType2,
  Server,
  Wind,
  Layers,
  Code2,
  Award,
  Briefcase,
} from "lucide-react";
import { Image as ImagePlaceholder } from "lucide-react";

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

.f-display { font-family: 'Space Grotesk', sans-serif; }
.f-body { font-family: 'Inter', sans-serif; }
.f-mono { font-family: 'JetBrains Mono', monospace; }

.bg-app { background-color: #0A0A0E; }
.bg-surface { background-color: #14141B; }
.bg-surface-2 { background-color: #1C1C26; }
.text-app { color: #EDEBE3; }
.text-muted-app { color: #8B8A99; }
.border-app { border-color: #26262F; }
.text-accent { color: #FF8A3D; }
.bg-accent { background-color: #FF8A3D; }
.border-accent { border-color: #FF8A3D; }
.text-accent2 { color: #5EEAD4; }
.bg-accent2 { background-color: #5EEAD4; }

.grain-bg {
  background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.035) 1px, transparent 0);
  background-size: 22px 22px;
}

::selection { background: #FF8A3D; color: #0A0A0E; }
`;

const NAV_LINKS = [
  { id: "home", label: "inicio" },
  { id: "sobre", label: "sobre" },
  { id: "projetos", label: "projetos" },
  { id: "contato", label: "contato" },
];

const SKILLS = [
  { name: "JavaScript", level: 90, icon: Braces },
  { name: "React", level: 88, icon: Atom },
  { name: "Next.js", level: 82, icon: Layers },
  { name: "TypeScript", level: 75, icon: FileType2 },
  { name: "Node.js", level: 70, icon: Server },
  { name: "Tailwind CSS", level: 92, icon: Wind },
];

// Dica: para trocar a imagem de um projeto, coloque o arquivo em /public
// (ex: /public/projetos/painel-financeiro.png) e ajuste o campo "image" abaixo.
// Se "image" ficar vazio (""), o card volta a mostrar o placeholder automaticamente.
const PROJECTS = [
  {
    id: "01",
    title: "Painel financeiro",
    desc: "Dashboard de controle de gastos pessoais com gráficos em tempo real, categorização automática de transações e resumo mensal de entradas e saídas.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    github: "https://github.com/RaferaX/financas-pessoaiso",
    deploy: "https://financas-pessoais-hdcq.vercel.app/",
    image: "./painel-financeiro.png",
  },
  {
    id: "02",
    title: "App de receitas",
    desc: "Aplicativo mobile-first para organizar receitas pessoais com busca por ingredientes disponíveis.",
    stack: ["Next.js", "Tailwind", "Supabase"],
    github: "https://github.com/seu-usuario/app-receitas",
    deploy: "",
    image: "",
  },
  {
    id: "03",
    title: "Encurtador de links",
    desc: "Serviço de encurtamento de URLs com estatísticas de clique e proteção contra spam.",
    stack: ["TypeScript", "Redis", "Express"],
    github: "https://github.com/seu-usuario/encurtador",
    deploy: "",
    image: "",
  },
  {
    id: "04",
    title: "Landing page SaaS",
    desc: "Página de conversão para produto SaaS fictício, com animações de scroll e formulário de waitlist.",
    stack: ["React", "Framer Motion"],
    github: "https://github.com/seu-usuario/landing-saas",
    deploy: "",
    image: "",
  },
];


const CERTIFICATES = [
  {
    id: "c01",
    title: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    issuer: "Nome da Faculdade",
    date: "2024",
    desc: "Conclusão do curso superior de tecnologia, com foco em desenvolvimento de software e engenharia de sistemas.",
  },
  {
    id: "c02",
    title: "Certificação em React avançado",
    issuer: "Nome da Escola/Plataforma",
    date: "2023",
    desc: "Curso focado em padrões avançados de componentização, performance e gerenciamento de estado.",
  },
  {
    id: "c03",
    title: "Fundamentos de UX/UI Design",
    issuer: "Nome da Plataforma",
    date: "2023",
    desc: "Formação em princípios de usabilidade, prototipação e design de interfaces centradas no usuário.",
  },
];

const EXPERIENCES = [
  {
    id: "e01",
    role: "Desenvolvedor(a) Full-Stack",
    company: "Nome da Empresa",
    period: "2023 — atual",
    desc: "Responsável pelo desenvolvimento de novas funcionalidades no produto principal, atuando do banco de dados à interface.",
  },
  {
    id: "e02",
    role: "Estagiário(a) de Desenvolvimento",
    company: "Nome da Empresa Anterior",
    period: "2022 — 2023",
    desc: "Suporte no desenvolvimento de features web, correção de bugs e participação em revisões de código.",
  },
  {
    id: "e03",
    role: "Projetos freelancer",
    company: "Autônomo",
    period: "2021 — 2022",
    desc: "Desenvolvimento de sites e sistemas simples para pequenos negócios locais.",
  },
];

const BIO_LINES = [
  { key: "nome", value: '"Rafael Leonardo da Silva"' },
  { key: "idade", value: "22" },
  { key: "cargo", value: '"Desenvolvedor Full-Stack"' },
  { key: "baseadoEm", value: '"Brasil"' },
  { key: "foco", value: '["web", "produto", "UI"]' },
  { key: "disponivel", value: "true" },
];

function useTypedLines(lines, speed = 28, startDelay = 400, pauseDuration = 3000) {
  const [typedCount, setTypedCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const firstRun = useRef(true);

  useEffect(() => {
    let timeout;

    if (typedCount >= lines.length) {
      timeout = setTimeout(() => {
        setTypedCount(0);
        setCharCount(0);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }

    const fullLine = `${lines[typedCount].key}: ${lines[typedCount].value},`;

    if (charCount < fullLine.length) {
      const delay =
        typedCount === 0 && charCount === 0 && firstRun.current
          ? startDelay
          : speed;
      timeout = setTimeout(() => {
        firstRun.current = false;
        setCharCount((c) => c + 1);
      }, delay);
    } else {
      timeout = setTimeout(() => {
        setTypedCount((t) => t + 1);
        setCharCount(0);
      }, 220);
    }

    return () => clearTimeout(timeout);
  }, [typedCount, charCount, lines, speed, startDelay, pauseDuration]);

  return { typedCount, charCount };
}

function CodeCard() {
  const { typedCount, charCount } = useTypedLines(BIO_LINES);

  return (
    <motion.div
      drag
      dragElastic={0.12}
      dragMomentum={false}
      whileDrag={{ scale: 1.02, rotate: -1 }}
      initial={{ opacity: 0, y: 24, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-surface border border-app rounded-xl shadow-2xl w-full max-w-md cursor-grab active:cursor-grabbing select-none"
      style={{ boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)" }}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-app bg-surface-2 rounded-t-xl">
        <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F56" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#FFBD2E" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#27C93F" }} />
        <span className="f-mono text-xs text-muted-app ml-2">sobre-mim.js</span>
      </div>
      <div className="p-6 f-mono text-sm leading-relaxed min-h-[220px]">
        <p className="text-muted-app">
          <span className="text-accent2">const</span> dev = {"{"}
        </p>
        {BIO_LINES.map((line, i) => {
          const full = `${line.key}: ${line.value},`;
          let display = "";
          if (i < typedCount) display = full;
          else if (i === typedCount) display = full.slice(0, charCount);
          if (i > typedCount) return null;
          return (
            <p key={line.key} className="pl-4 text-app">
              <span className="text-accent">{line.key.split(":")[0]}</span>
              {display.slice(line.key.length)}
              {i === typedCount && (
                <span className="inline-block w-[7px] h-[14px] bg-accent align-middle ml-0.5 animate-pulse" />
              )}
            </p>
          );
        })}
        {typedCount >= BIO_LINES.length && <p className="text-muted-app">{"}"}</p>}
      </div>
    </motion.div>
  );
}

function useCountUp(target, active, duration = 1000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = null;
    let frame;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

function SkillCard({ skill, index }) {
  const [entered, setEntered] = useState(false);
  const count = useCountUp(skill.level, entered);
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      onViewportEnter={() => setEntered(true)}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -4, borderColor: "#FF8A3D" }}
      className="bg-surface border border-app rounded-xl p-4 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-lg bg-surface-2 flex items-center justify-center">
          <Icon size={17} className="text-accent" />
        </div>
        <motion.span
          className="f-mono text-lg font-medium text-app"
          animate={entered ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.3, delay: 1 }}
        >
          {count}%
        </motion.span>
      </div>
      <p className="f-body text-sm text-app mb-2">{skill.name}</p>
      <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #FF8A3D, #5EEAD4)",
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.08, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`px-6 md:px-12 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="f-mono text-xs text-accent tracking-widest uppercase mb-3">
      // {children}
    </p>
  );
}

function Nav({ active }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-12 py-5">
        <a href="#home" className="f-display text-lg font-semibold text-app flex items-center gap-2">
          <Terminal size={18} className="text-accent" />
          Rafael Silva<span className="text-accent">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`f-mono text-sm transition-colors ${
                active === l.id ? "text-accent" : "text-muted-app hover:text-app"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-app f-mono text-sm border border-app rounded px-3 py-1.5"
        >
          {open ? "fechar" : "menu"}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-t border-app overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="f-mono text-sm text-app"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <Section id="home" className="pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="grid md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Eyebrow>disponível para novos projetos</Eyebrow>
          <h1 className="f-display text-4xl md:text-6xl font-semibold text-app leading-[1.08] mb-6">
            Eu construo produtos digitais
            <span className="text-accent"> que funcionam</span> de verdade.
          </h1>
          <p className="f-body text-muted-app text-base md:text-lg max-w-md mb-8">
            Desenvolvedor(a) full-stack focado em interfaces limpas, código
            sustentável e experiências que resolvem problemas reais.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projetos"
              className="f-mono text-sm bg-accent text-black px-5 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Ver projetos <ArrowUpRight size={16} />
            </a>
            <a
              href="#"
              className="f-mono text-sm border border-app text-app px-5 py-3 rounded-lg hover:border-accent transition-colors flex items-center gap-2"
            >
              <Download size={16} /> Baixar CV
            </a>
          </div>
        </motion.div>
        <div className="flex justify-center md:justify-end">
          <CodeCard />
        </div>
      </div>
    </Section>
  );
}

// Troque para true e ajuste o src assim que tiver a foto no /public
const PROFILE_IMAGE = "/perfil1.png";

function Sobre() {
  return (
    <Section id="sobre" className="py-24 border-t border-app">
      <div className="grid md:grid-cols-2 gap-16 mb-16">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
            viewport={{ once: true }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 rounded-2xl border-2 border-dashed border-app bg-surface flex flex-col items-center justify-center gap-2 overflow-hidden"
          >
            {PROFILE_IMAGE ? (
              <img
                src={PROFILE_IMAGE}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <User size={28} className="text-muted-app" />
                <span className="f-mono text-[10px] text-muted-app text-center px-2">
                  sua foto aqui
                </span>
              </>
            )}
          </motion.div>
          <div>
            <Eyebrow>sobre mim</Eyebrow>
            <h2 className="f-display text-3xl md:text-4xl font-semibold text-app mb-4">
              Da ideia ao deploy.
            </h2>
          </div>
        </div>
        <div className="hidden md:block" />
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <p className="f-body text-muted-app leading-relaxed mb-4">
            Comecei a programar por curiosidade e virou profissão. Hoje
            trabalho construindo aplicações web do zero, cuidando desde a
            arquitetura até os detalhes de interface que fazem o produto
            parecer polido.
          </p>
          <p className="f-body text-muted-app leading-relaxed">
            Gosto de projetos onde consigo participar de decisões de produto,
            não só executar tarefas. Fora do código, estudo design de
            interação e acompanho o que sai de novo no ecossistema
            JavaScript.
          </p>
        </div>
        <div>
          <Eyebrow>stack principal</Eyebrow>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {SKILLS.map((s, i) => (
              <SkillCard key={s.name} skill={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function PhotoPlaceholder({ label = "adicione uma imagem", className = "" }) {
  return (
    <div
      className={`w-full aspect-video rounded-lg border border-dashed border-app bg-surface-2 flex flex-col items-center justify-center gap-1.5 overflow-hidden ${className}`}
    >
      <ImagePlaceholder size={20} className="text-muted-app" />
      <span className="f-mono text-[10px] text-muted-app">{label}</span>
    </div>
  );
}

const PORTFOLIO_TABS = [
  { id: "projetos", label: "projetos" },
  { id: "certificados", label: "certificados" },
  { id: "experiencias", label: "experiências" },
];

function ProjectCard({ p, i, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.4, delay: i * 0.06 }}
      onClick={() => onOpen(p)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen(p);
      }}
      className="group bg-surface border border-app rounded-xl p-5 hover:border-accent transition-colors cursor-pointer"
    >
      {p.image ? (
        <img
          src={p.image}
          alt={`Screenshot do projeto ${p.title}`}
          className="w-full aspect-video object-cover rounded-lg mb-4"
        />
      ) : (
        <PhotoPlaceholder label="screenshot do projeto" className="mb-4" />
      )}
      <div className="flex items-start justify-between mb-3">
        <span className="f-mono text-xs text-muted-app">{p.id}</span>
        <a
          href={p.github}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 f-mono text-xs text-muted-app group-hover:text-accent transition-colors"
        >
          <Code2 size={14} /> repositório
        </a>
      </div>
      <h3 className="f-display text-lg font-semibold text-app mb-2">
        {p.title}
      </h3>
      <p className="f-body text-sm text-muted-app leading-relaxed mb-4">
        {p.desc}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {p.stack.map((t) => (
          <span
            key={t}
            className="f-mono text-xs text-accent2 bg-surface-2 px-2.5 py-1 rounded-md"
          >
            {t}
          </span>
        ))}
      </div>
      <span className="f-mono text-xs text-muted-app group-hover:text-accent transition-colors flex items-center gap-1.5">
        ver detalhes <ArrowUpRight size={13} />
      </span>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="bg-surface border border-app rounded-2xl w-full max-w-2xl max-h-[88vh] overflow-y-auto"
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`Screenshot do projeto ${project.title}`}
            className="w-full aspect-video object-cover rounded-t-2xl"
          />
        ) : (
          <PhotoPlaceholder
            label="screenshot do projeto"
            className="rounded-t-2xl rounded-b-none aspect-[16/7]"
          />
        )}

        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="f-mono text-xs text-muted-app">{project.id}</span>
              <h3 className="f-display text-2xl md:text-3xl font-semibold text-app mt-1">
                {project.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="f-mono text-xs text-muted-app hover:text-accent transition-colors border border-app rounded-lg px-3 py-1.5 flex-shrink-0"
            >
              fechar
            </button>
          </div>

          <p className="f-body text-muted-app leading-relaxed mb-6">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.stack.map((t) => (
              <span
                key={t}
                className="f-mono text-xs text-accent2 bg-surface-2 px-2.5 py-1 rounded-md"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {project.deploy && (
              <a
                href={project.deploy}
                target="_blank"
                rel="noreferrer"
                className="f-mono text-sm bg-accent text-black px-5 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                Ver projeto online <ArrowUpRight size={16} />
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="f-mono text-sm border border-app text-app px-5 py-3 rounded-lg hover:border-accent transition-colors flex items-center gap-2"
            >
              <Code2 size={16} /> repositório
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CertificateCard({ c, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: i * 0.06 }}
      className="group bg-surface border border-app rounded-xl p-5 hover:border-accent transition-colors"
    >
      <PhotoPlaceholder label="foto do certificado" className="mb-4" />
      <div className="flex items-center gap-2 mb-3">
        <Award size={15} className="text-accent" />
        <span className="f-mono text-xs text-muted-app">{c.date}</span>
      </div>
      <h3 className="f-display text-lg font-semibold text-app mb-1">
        {c.title}
      </h3>
      <p className="f-mono text-xs text-accent2 mb-3">{c.issuer}</p>
      <p className="f-body text-sm text-muted-app leading-relaxed">{c.desc}</p>
    </motion.div>
  );
}

function ExperienceCard({ e, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: i * 0.06 }}
      className="group bg-surface border border-app rounded-xl p-5 hover:border-accent transition-colors"
    >
      <PhotoPlaceholder label="logo da empresa" className="mb-4" />
      <div className="flex items-center gap-2 mb-3">
        <Briefcase size={15} className="text-accent" />
        <span className="f-mono text-xs text-muted-app">{e.period}</span>
      </div>
      <h3 className="f-display text-lg font-semibold text-app mb-1">
        {e.role}
      </h3>
      <p className="f-mono text-xs text-accent2 mb-3">{e.company}</p>
      <p className="f-body text-sm text-muted-app leading-relaxed">{e.desc}</p>
    </motion.div>
  );
}

function Projetos() {
  const [tab, setTab] = useState("projetos");
  const [openProject, setOpenProject] = useState(null);

  const content = {
    projetos: PROJECTS.map((p, i) => (
      <ProjectCard key={p.id} p={p} i={i} onOpen={setOpenProject} />
    )),
    certificados: CERTIFICATES.map((c, i) => (
      <CertificateCard key={c.id} c={c} i={i} />
    )),
    experiencias: EXPERIENCES.map((e, i) => (
      <ExperienceCard key={e.id} e={e} i={i} />
    )),
  };

  return (
    <Section id="projetos" className="py-24 border-t border-app">
      <Eyebrow>portfólio</Eyebrow>
      <h2 className="f-display text-3xl md:text-4xl font-semibold text-app mb-8">
        Alguns projetos recentes.
      </h2>

      <div className="inline-flex bg-surface border border-app rounded-lg p-1 mb-10 gap-1">
        {PORTFOLIO_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="relative f-mono text-sm px-4 py-2 rounded-md transition-colors"
          >
            {tab === t.id && (
              <motion.span
                layoutId="tab-bg"
                className="absolute inset-0 bg-accent rounded-md"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <span
              className={`relative z-10 ${
                tab === t.id ? "text-black" : "text-muted-app"
              }`}
            >
              {t.label}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {content[tab]}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {openProject && (
          <ProjectModal
            project={openProject}
            onClose={() => setOpenProject(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}

function Contato() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });

  const handleSubmit = () => {
    if (!form.nome || !form.email || !form.mensagem) return;
    setSent(true);
  };

  return (
    <Section id="contato" className="py-24 border-t border-app">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <Eyebrow>contato</Eyebrow>
          <h2 className="f-display text-3xl md:text-4xl font-semibold text-app mb-6">
            Vamos conversar sobre seu projeto.
          </h2>
          <p className="f-body text-muted-app leading-relaxed mb-8 max-w-md">
            Estou aberto a freelas, vagas full-time ou só trocar uma ideia
            sobre tecnologia. Me manda uma mensagem.
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/RaferaX"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-lg border border-app text-app hover:border-accent hover:text-accent transition-colors f-mono text-xs"
            >
              GH
            </a>
            <a
              href="https://www.linkedin.com/in/rafael-leonardo-820b4328a"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-lg border border-app text-app hover:border-accent hover:text-accent transition-colors f-mono text-xs"
            >
              IN
            </a>
            <a
              href="#"
              className="w-11 h-11 flex items-center justify-center rounded-lg border border-app text-app hover:border-accent hover:text-accent transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="bg-surface border border-app rounded-xl p-6 md:p-8">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-10"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Send size={20} className="text-accent" />
                </div>
                <p className="f-display text-lg text-app mb-1">Mensagem enviada</p>
                <p className="f-body text-sm text-muted-app">
                  Retorno em breve, obrigado pelo contato.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div>
                  <label className="f-mono text-xs text-muted-app block mb-2">
                    nome
                  </label>
                  <input
                    required
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    className="w-full bg-surface-2 border border-app rounded-lg px-4 py-2.5 text-app f-body text-sm outline-none focus:border-accent transition-colors"
                    placeholder="Como você se chama"
                  />
                </div>
                <div>
                  <label className="f-mono text-xs text-muted-app block mb-2">
                    email
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-surface-2 border border-app rounded-lg px-4 py-2.5 text-app f-body text-sm outline-none focus:border-accent transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="f-mono text-xs text-muted-app block mb-2">
                    mensagem
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.mensagem}
                    onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                    className="w-full bg-surface-2 border border-app rounded-lg px-4 py-2.5 text-app f-body text-sm outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Conta um pouco sobre o projeto"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full f-mono text-sm bg-accent text-black py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  Enviar mensagem <Send size={15} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("home");
  const sectionsRef = useRef({});

  useEffect(() => {
    const handler = () => {
      const offsets = NAV_LINKS.map((l) => {
        const el = document.getElementById(l.id);
        if (!el) return { id: l.id, top: Infinity };
        return { id: l.id, top: Math.abs(el.getBoundingClientRect().top - 120) };
      });
      offsets.sort((a, b) => a.top - b.top);
      setActive(offsets[0].id);
    };
    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="bg-app text-app min-h-screen grain-bg">
      <style>{FONT_CSS}</style>
      <Nav active={active} />
      <Hero />
      <Sobre />
      <Projetos />
      <Contato />
      <footer className="border-t border-app py-8 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="f-mono text-xs text-muted-app">
            © {new Date().getFullYear()} — feito com Next.js, Tailwind e Framer Motion
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="f-mono text-xs text-muted-app hover:text-accent transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            voltar ao topo <ArrowUpRight size={13} className="rotate-[-45deg]" />
          </button>
        </div>
      </footer>
    </div>
  );
}
