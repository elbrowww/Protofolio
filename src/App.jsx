import { useState } from "react";
import { profile, projects, skills } from "./data.js";

function Project({ p, open, onToggle }) {
  return (
    <li className={`project ${open ? "is-open" : ""}`}>
      <button
        className="project-head"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="project-title">{p.title}</span>
        <span className="project-meta">{p.role}</span>
        <span className="project-year">{p.year}</span>
        <span className="project-icon" aria-hidden="true" />
      </button>
      <div className="project-body" hidden={!open}>
        <p>{p.desc}</p>
        <ul className="tags">
          {p.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <a className="link" href={p.href} target="_blank" rel="noreferrer">
          Buka proyek
        </a>
      </div>
    </li>
  );
}

export default function App() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <header className="bar">
        <a href="#top" className="brand">{profile.name}</a>
        <nav aria-label="Navigasi utama">
          <a href="#proyek">Proyek</a>
          <a href="#tentang">Tentang</a>
          <a href="#kontak">Kontak</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <p className="role">{profile.role}</p>
          <h1>{profile.headline}</h1>
          <p className="intro">{profile.intro}</p>
          <div className="actions">
            <a className="btn btn-solid" href="#proyek">Lihat proyek</a>
            <a className="btn" href="#kontak">Hubungi saya</a>
          </div>
        </section>

        <section id="proyek" className="section">
          <h2>Proyek</h2>
          <ul className="projects">
            {projects.map((p, i) => (
              <Project
                key={p.title}
                p={p}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </ul>
        </section>

        <section id="tentang" className="section about">
          <h2>Tentang</h2>
          <div className="about-grid">
            <div className="prose">
              {profile.about.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            <dl className="skills">
              {skills.map((s) => (
                <div key={s.group}>
                  <dt>{s.group}</dt>
                  <dd>{s.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="kontak" className="section contact">
          <h2>Punya proyek untuk dikerjakan?</h2>
          <a className="mail" href={`mailto:${profile.email}`}>{profile.email}</a>
          <ul className="social">
            {profile.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="foot">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
