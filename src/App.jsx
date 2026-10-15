import { useEffect, useState } from "react";
import { intro, elements, projects, glossary } from "./data.js";
import Circuit1 from "./Circuit1.jsx";

const KEY = "agf-progress-v1";
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || { done: [], last: null, theme: null }; } catch { return { done: [], last: null, theme: null }; } };
const lessonLinks = [...intro.map((i) => ({ key: "intro:" + i.id, path: "/intro/" + i.id, title: i.title })), ...projects.filter((p) => p.full).map((p) => ({ key: "proj:" + p.id, path: "/projects/" + p.id, title: p.n + ". " + p.title }))];

function Quiz({ items }) {
  const [ans, setAns] = useState({});
  return (<section><h2>Bilik yoxlama sualları</h2>{items.map((it, i) => (
    <div className="card" key={i}><b>{i + 1}. {it.q}</b>
      {it.o.map((o, j) => { const sel = ans[i]; const cls = sel === undefined ? "" : j === it.a ? "ok" : j === sel ? "bad" : "";
        return <button key={j} className={"opt " + cls} disabled={sel !== undefined} onClick={() => setAns({ ...ans, [i]: j })}>{o}</button>; })}
      {ans[i] !== undefined && <p className="muted">{ans[i] === it.a ? "Düzgündür ✔" : "Səhvdir. Düzgün cavab: " + it.o[it.a]}</p>}
    </div>))}</section>);
}

function Zoom({ children }) {
  const [open, setOpen] = useState(false);
  return (<>
    <div className="zoomwrap"><div onClick={() => setOpen(true)} role="button" tabIndex={0}>{children}</div><button className="btn" onClick={() => setOpen(true)}>🔍 Böyüt</button></div>
    {open && <div className="modal" onClick={() => setOpen(false)}><button className="btn close">✕ Bağla</button><div className="modalin" onClick={(e) => e.stopPropagation()}>{children}</div></div>}
  </>);
}

function Mark({ k, st }) {
  const done = st.done.includes(k);
  return <button className={"btn " + (done ? "primary" : "")} onClick={() => st.up((s) => ({ ...s, done: done ? s.done.filter((x) => x !== k) : [...s.done, k] }))}>{done ? "✔ Tamamlandı" : "Tamamlandı kimi işarələ"}</button>;
}

function Next({ k }) {
  const i = lessonLinks.findIndex((l) => l.key === k); const n = lessonLinks[i + 1];
  return n ? <p><a className="btn primary" href={"#" + n.path}>Növbəti: {n.title} →</a></p> : <p><a className="btn" href="#/projects">Bütün layihələr</a></p>;
}

function Project({ p, st }) {
  const k = "proj:" + p.id;
  useEffect(() => { st.up((s) => ({ ...s, last: k })); }, [k]);
  if (!p.full) return (<article><h1>{p.n}. {p.title}</h1><span className="tag">{p.level}</span><div className="card"><h2>Bu dərsdə nə öyrənəcəyəm?</h2><p>{p.goal}</p><p className="muted">Bu dərs növbəti versiyada əlavə olunacaq.</p></div><p><a className="btn" href="#/projects">← Layihələr</a></p></article>);
  return (<article>
    <h1>{p.n}. {p.title}</h1><span className="tag">{p.level}</span>
    <h2>1. Bu dərsdə nə öyrənəcəyəm?</h2><div className="card"><p><b>Məqsəd:</b> {p.goal}</p><ul>{p.learn.map((x) => <li key={x}>{x}</li>)}</ul></div>
    <h2>2. Lazım olan elementlər</h2><div className="table"><table><thead><tr><th>İşarə</th><th>Element</th><th>Sxemdəki yeri</th></tr></thead><tbody>{p.parts.map((r) => <tr key={r[0]}><td><b>{r[0]}</b></td><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody></table></div>
    <h2>3. Sxemin aydın şəkli</h2>
    {p.id === "p1" ? <><Zoom><Circuit1 /></Zoom><p className="muted">Məntiq: +24 V → STOP (NC) → [START (NO) ‖ K1 13–14] → K1 A1 → A2 → 0 V. Lampa H1 bobinə paraleldir.</p></> : <div className="card"><p>Güc dövrəsi: L1/L2/L3 → Q1 → K1 (1-2, 3-4, 5-6) → F2 → M1. İdarəetmə dövrəsi 1-ci layihədəki kimidir, yalnız S1-dən sonra F2 95–96 ardıcıl qoşulur. Sxem şəkli növbəti versiyada əlavə olunacaq.</p></div>}
    <h2>4. Sxemin izahı</h2>
    <h3>Naqillərin birləşmələri</h3><div className="table"><table><thead><tr><th>Haradan</th><th>Hara</th></tr></thead><tbody>{p.wires.map((r, i) => <tr key={i}><td>{r[0]}</td><td>{r[1]}</td></tr>)}</tbody></table></div>
    <h3>Addım-addım iş prinsipi</h3><ol>{p.steps.map((x, i) => <li key={i}>{x}</li>)}</ol>
    <h2>5. CADe_SIMU-da qurulma təlimatı</h2><ol className="steps">{p.sim.map((x, i) => <li key={i}>{x}</li>)}</ol>
    <h2>6. Ən çox edilən səhvlər</h2>{p.mistakes.map((m) => <div className="card warn" key={m[0]}><b>✖ {m[0]}</b><p>{m[1]}</p></div>)}
    <Quiz items={p.quiz} /><p><Mark k={k} st={st} /></p><Next k={k} />
  </article>);
}

function Intro({ l, st }) {
  const k = "intro:" + l.id;
  useEffect(() => { st.up((s) => ({ ...s, last: k })); }, [k]);
  return (<article><h1>{l.title}</h1>{l.body.map((t, i) => <p key={i}>{t}</p>)}<p><Mark k={k} st={st} /></p><Next k={k} /></article>);
}

function Search({ q }) {
  const t = q.toLowerCase();
  const res = [
    ...intro.filter((i) => (i.title + i.body.join(" ")).toLowerCase().includes(t)).map((i) => ["Giriş", i.title, "/intro/" + i.id]),
    ...elements.filter((e) => (e.name + e.mark + e.func).toLowerCase().includes(t)).map((e) => ["Element", e.name, "/elements"]),
    ...projects.filter((p) => (p.title + p.goal).toLowerCase().includes(t)).map((p) => ["Layihə", p.n + ". " + p.title, "/projects/" + p.id]),
    ...glossary.filter((g) => (g[0] + g[1]).toLowerCase().includes(t)).map((g) => ["Lüğət", g[0], "/glossary"]),
  ];
  return (<div><h1>Axtarış: “{q}”</h1>{res.length === 0 && <p className="muted">Nəticə tapılmadı.</p>}{res.map((r, i) => <a className="card row" key={i} href={"#" + r[2]}><span className="tag">{r[0]}</span> {r[1]}</a>)}</div>);
}

export default function App() {
  const [st0, setSt] = useState(load);
  const [hash, setHash] = useState(location.hash.slice(1) || "/");
  const [menu, setMenu] = useState(false);
  const up = (f) => setSt((p) => { const n = f(p); try { localStorage.setItem(KEY, JSON.stringify(n)); } catch {} return n; });
  const st = { ...st0, up };
  useEffect(() => { const f = () => { setHash(location.hash.slice(1) || "/"); setMenu(false); window.scrollTo(0, 0); }; addEventListener("hashchange", f); return () => removeEventListener("hashchange", f); }, []);
  const dark = st0.theme ? st0.theme === "dark" : typeof matchMedia === "function" && matchMedia("(prefers-color-scheme: dark)").matches;
  useEffect(() => { document.documentElement.dataset.theme = dark ? "dark" : "light"; }, [dark]);
  const [path, qs] = hash.split("?");
  const parts = path.split("/").filter(Boolean);
  const pct = Math.round((lessonLinks.filter((l) => st0.done.includes(l.key)).length / lessonLinks.length) * 100);
  const last = lessonLinks.find((l) => l.key === st0.last);
  let page;
  if (parts[0] === "intro" && parts[1]) { const l = intro.find((i) => i.id === parts[1]); page = l ? <Intro l={l} st={st} /> : <p>Dərs tapılmadı.</p>; }
  else if (parts[0] === "intro") page = (<div><h1>Elektrikə giriş</h1>{intro.map((i) => <a className="card row" key={i.id} href={"#/intro/" + i.id}>{st0.done.includes("intro:" + i.id) ? "✔" : "○"} {i.title}</a>)}</div>);
  else if (parts[0] === "elements") page = (<div><h1>Elektrik elementləri</h1><div className="grid">{elements.map((e) => (<div className="card" key={e.id}><div className="symbol">{e.mark}</div><h3>{e.name}</h3><p><b>Funksiyası:</b> {e.func}</p><p><b>Real istifadəsi:</b> {e.real}</p></div>))}</div></div>);
  else if (parts[0] === "projects" && parts[1]) { const p = projects.find((x) => x.id === parts[1]); page = p ? <Project p={p} st={st} /> : <p>Layihə tapılmadı.</p>; }
  else if (parts[0] === "projects") page = (<div><h1>Layihələr və sxemlər</h1><p className="muted">Başlanğıcdan çətinə doğru sıralanıb.</p>{projects.map((p) => <a className="card row" key={p.id} href={"#/projects/" + p.id}>{st0.done.includes("proj:" + p.id) ? "✔" : "○"} <b>{p.n}. {p.title}</b> <span className="tag">{p.level}</span>{!p.full && <span className="muted"> · tezliklə</span>}</a>)}</div>);
  else if (parts[0] === "glossary") page = (<div><h1>Elektrik terminləri lüğəti</h1>{glossary.map((g) => <div className="card" key={g[0]}><b>{g[0]}</b><p>{g[1]}</p></div>)}</div>);
  else if (parts[0] === "search") page = <Search q={decodeURIComponent((qs || "").replace(/^q=/, ""))} />;
  else page = (<div><section className="hero"><h1>⚡ Ağıllı Ferma Akademiyası</h1><p>Elektrik avtomatikasını sıfırdan öyrən, sxemləri CADe_SIMU-da özün qur.</p>
    <div className="bar"><div style={{ width: pct + "%" }} /></div><p className="muted">Ümumi irəliləyiş: {pct}%</p>
    <a className="btn primary" href={"#" + (last ? last.path : "/intro/gerginlik")}>{last ? "Davam et: " + last.title : "Öyrənməyə başla"}</a></section>
    <div className="grid"><a className="card" href="#/intro"><h3>1. Elektrikə giriş</h3><p>Gərginlik, cərəyan, AC/DC, təhlükəsizlik.</p></a><a className="card" href="#/elements"><h3>2. Elektrik elementləri</h3><p>Kontaktor, rele, düymələr, termik rele…</p></a><a className="card" href="#/projects"><h3>3. Layihələr və sxemlər</h3><p>9 layihə, START/STOP ilə başla.</p></a><a className="card" href="#/glossary"><h3>Lüğət</h3><p>Terminlərin Azərbaycan dilində izahı.</p></a></div></div>);
  return (<>
    <header><a className="logo" href="#/">⚡ Ağıllı Ferma</a>
      <form onSubmit={(e) => { e.preventDefault(); const v = e.target.q.value.trim(); if (v) location.hash = "/search?q=" + encodeURIComponent(v); }}><input name="q" placeholder="Axtar: kontaktor, NO…" aria-label="Axtarış" /></form>
      <button className="btn" onClick={() => up((s) => ({ ...s, theme: dark ? "light" : "dark" }))} aria-label="Rejimi dəyiş">{dark ? "☀️" : "🌙"}</button>
      <button className="btn burger" onClick={() => setMenu(!menu)} aria-label="Menyu">☰</button>
      <nav className={menu ? "open" : ""}><a href="#/intro">Giriş</a><a href="#/elements">Elementlər</a><a href="#/projects">Layihələr</a><a href="#/glossary">Lüğət</a></nav></header>
    <main>{page}</main><footer>Ağıllı Ferma Akademiyası · Tədris materialı: sxemlər CADe_SIMU-da qurulur.</footer></>);
}
