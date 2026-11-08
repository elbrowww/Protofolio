import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2, Code2, Globe, Lightbulb, Mail, MapPin, Pencil, Phone, Search, Send } from "lucide-react";

const fallback = {
  profile: {
    name: "ANGELLO ERIYA DEWANGGA", role: "FULL STACK DEVELOPER", location: "Indonesia",
    email: "emailanda@example.com", phone: "+62 8xx xxxx xxxx",
    availability: "Terbuka untuk peluang dan kolaborasi",
    about: "Saya adalah developer yang senang mengubah ide menjadi produk digital yang fungsional, cepat, dan mudah digunakan. Saya menikmati proses membangun antarmuka, merancang API, mengelola database, hingga menyiapkan aplikasi untuk digunakan.",
    stats: [{value:"01+",label:"TAHUN BELAJAR & BERKARYA"},{value:"10+",label:"PROJECT DIKERJAKAN"},{value:"05+",label:"TEKNOLOGI DIKUASAI"}]
  },
  projects: [
    {id:1,number:"01",name:"MADRASAHKU",type:"EDUCATION PLATFORM",description:"Aplikasi manajemen madrasah untuk membantu pengelolaan data guru, jadwal, materi, tugas, dan aktivitas belajar.",stack:["Flutter","PHP","MySQL"],result:"Sistem informasi pendidikan",theme:"project-red",url:"https://www.bengkuluinteraktif.com/wp-content/uploads/2019/05/Kosong.png"},
    {id:2,number:"02",name:"DAPUR BU MON",type:"CATERING MANAGEMENT",description:"Aplikasi pemesanan katering dengan alur pelanggan, keranjang, aktivitas pesanan, pembayaran, dan dashboard pemilik.",stack:["Flutter","PHP","MySQL"],result:"Pemesanan dan pengelolaan pesanan",theme:"project-cream",url:"https://www.bengkuluinteraktif.com/wp-content/uploads/2019/05/Kosong.png"},
    {id:3,number:"03",name:"SI-AKADEMIK API",type:"REST API DEVELOPMENT",description:"Backend sistem akademik dengan autentikasi, token, validasi input, dan operasi CRUD data mahasiswa.",stack:["PHP","REST API","JWT"],result:"API terstruktur dengan autentikasi",theme:"project-olive",url:"https://www.bengkuluinteraktif.com/wp-content/uploads/2019/05/Kosong.png"}
  ],
  experience: [
    {period:"2025 — SEKARANG",role:"STUDENT DEVELOPER",company:"Personal & Academic Projects",detail:"Membangun aplikasi web dan mobile sebagai bagian dari pembelajaran, eksplorasi teknologi, dan project kolaborasi."},
    {period:"2024 — 2025",role:"WEB DEVELOPMENT LEARNER",company:"Independent Learning",detail:"Mempelajari dasar frontend, backend, database relasional, REST API, version control, dan proses debugging."}
  ],
  certifications: [
    {year:"2025",title:"Web Development Fundamentals",issuer:"Tambahkan nama penyelenggara",note:"Ganti dengan sertifikasi yang benar-benar Anda miliki."},
    {year:"2025",title:"Database & API Development",issuer:"Tambahkan nama penyelenggara",note:"Tambahkan nomor atau tautan sertifikat jika tersedia."}
  ],
  skills: [
    {group:"FRONTEND",items:["HTML5","CSS3","JavaScript","React","Responsive UI"]},
    {group:"BACKEND",items:["Node.js","Express.js","PHP","REST API"]},
    {group:"DATABASE & TOOLS",items:["MySQL","SQLite","Git","Postman","VS Code"]}
  ]
};

function App() {
  const [data, setData] = useState(fallback);
  const [form, setForm] = useState({name:"",email:"",subject:"",message:""});
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    fetch("/api/portfolio").then(r => r.ok ? r.json() : Promise.reject()).then(setData).catch(() => {});
  }, []);

  const { profile, projects, skills } = data;
  const update = (e) => setForm({...form, [e.target.name]: e.target.value});
  const submit = async (e) => {
    e.preventDefault(); setSending(true); setNotice(null);
    try {
      const response = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Pesan gagal dikirim.");
      setNotice({type:"success", text:result.message}); setForm({name:"",email:"",subject:"",message:""});
    } catch (err) {
      setNotice({type:"error", text:err.message || "Server belum aktif. Jalankan npm run dev."});
    } finally { setSending(false); }
  };

  return <main>
    <header className="topbar">
      <a className="brand" href="#home"><span>FULL STACK<br/><small>DEVELOPER</small></span></a>
      <a className="availability" href="#contact">AVAILABLE FOR FREELANCE <span className="availability-star">✳</span></a>
    </header>

    <section className="hero" id="home">
      <div className="hero-bg-word" aria-hidden="true">PORTFOLIO</div>
      <div className="hero-copy">
        <p className="eyebrow"><span/> FULL STACK DEVELOPER</p>
        <p className="script">Hello, I'm</p>
        <h1>{profile.name.split(" ").slice(0,2).join(" ")}<br/><em>{profile.name.split(" ").slice(2).join(" ") || "DEVELOPER"}</em></h1>
        <h2>FULL STACK<br/><span></span>DEVELOPER</h2>
        <p className="intro">{profile.about}</p>
        <span className="worldwide"><Globe size={13}/> AVAILABLE WORLDWIDE</span>
      </div>
      <div className="hero-visual">
        <img src="/EL.png" alt="Profil Saya" />
      </div>
      <div className="hero-side">
        <span className="side-star">✳</span><p>Turning ideas<br/>into powerful<br/><b>digital experiences.</b></p>
        <div className="stat-list">{profile.stats.map(s=><div className="stat" key={s.label}><strong>{s.value}</strong><small>{s.label}</small></div>)}</div>
      </div>
    </section>

    <section className="projects section-pad" id="projects">
      <div className="section-title-row"><h2>SELECTED PROJECTS</h2><a className="section-note" href="#contact">VIEW ALL PROJECTS <ArrowRight size={18}/></a></div>
      <div className="project-grid">{projects.map((p,i)=><article className="project-card" key={p.id}>
        <a className={`project-art project-image-${i%3}`} href={p.url || "#contact"} aria-label={`Lihat ${p.name}`}>
          <span className="art-top"><span>{p.type}</span><ArrowUpRight size={15}/></span>
          <span className="art-name">{p.name}</span>
        </a>
        <div className="project-info"><div className="project-number">0{i+1}</div><div className="project-caption"><h3>{p.name}</h3><span>{p.type}</span></div><a href={p.url || "#contact"} aria-label={`Lihat ${p.name}`}><ArrowRight size={19}/></a></div>
      </article>)}</div>
    </section>

    <section className="details-grid" id="skills">
      <div className="education-panel section-pad">
        <h2>EDUCATION &amp; SKILLS</h2>
        <div className="education-block"><p className="eyebrow">EDUCATION</p><b>INFORMATICS / INFORMATION TECHNOLOGY</b><span>Indonesia · Ongoing</span></div>
        <div className="skills-block"><p className="eyebrow">SKILLS</p>{skills.map(group=><div className="skill-category" key={group.group}><span>{group.group}</span><div className="skill-pills">{group.items.map(item=><span key={item}>{item}</span>)}</div></div>)}</div>
      </div>
      <div className="process-panel section-pad">
        <h2>WORK PROCESS</h2>
        <div className="process-list">{[
          ["01","DISCOVER","Understanding goals, audience, and project requirements."],
          ["02","IDEATE","Planning, wireframing, and creating the right concept."],
          ["03","DESIGN","Crafting visual design with a focus on user experience."],
          ["04","DEVELOP","Building fast, responsive, and high-performing websites."],
          ["05","DELIVER","Testing, optimizing, and launching with perfection."]
        ].map(([number,title,description])=>{const ProcessIcon=[Search,Lightbulb,Pencil,Code2,Send][Number(number)-1];return <div className="process-item" key={number}><span>{number}</span><div className="process-icon"><ProcessIcon size={15}/></div><p><b>{title}</b>{description}</p></div>})}</div>
      </div>
      <aside className="quote-panel"><span className="quote-mark">“</span><blockquote>Good design is not just how it looks, but how it works.</blockquote><span className="quote-sign">{profile.name.split(" ")[0]}.</span><div className="quote-bottom">LET'S CREATE<br/>SOMETHING GREAT<br/>TOGETHER.</div></aside>
    </section>

    <section className="contact section-pad" id="contact">
      <div className="contact-head"><h2>LET'S WORK<br/>TOGETHER<span className="availability-star">✳</span></h2><p>{profile.about}</p><a className="freelance-link" href={`mailto:${profile.email}`}><ArrowRight size={17}/> AVAILABLE FOR FREELANCE</a></div>
      <div className="contact-links"><a href={`mailto:${profile.email}`}><Mail size={17}/>{profile.email}</a><a href={`https://${profile.email.split("@")[1] || "example.com"}`}><Globe size={17}/>{`www.${profile.email.split("@")[1] || "yourwebsite.com"}`}</a><a href={`tel:${profile.phone}`}><Phone size={17}/>{profile.phone}</a><span><MapPin size={17}/>{profile.location}</span></div>
      <div className="contact-art" aria-hidden="true"><div className="laptop-screen"><span>WEB DESIGN<br/>DIGITAL<br/>EXPERIENCES</span><i/></div><div className="laptop-base"/></div>
      <details className="contact-form"><summary>HAVE A PROJECT IN MIND? SEND A MESSAGE</summary><form onSubmit={submit}>
        <label className="visually-hidden" htmlFor="contact-name">Your name</label><input id="contact-name" name="name" value={form.name} onChange={update} placeholder="Nama lengkap" required maxLength="100"/>
        <label className="visually-hidden" htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" value={form.email} onChange={update} placeholder="nama@email.com" required maxLength="150"/>
        <label className="visually-hidden" htmlFor="contact-subject">Subject</label><input id="contact-subject" name="subject" value={form.subject} onChange={update} placeholder="Project / Collaboration"/>
        <label className="visually-hidden" htmlFor="contact-message">Your message</label><textarea id="contact-message" name="message" value={form.message} onChange={update} placeholder="Ceritakan sedikit tentang kebutuhan Anda..." required rows="3" maxLength="3000"/>
        <button className="submit-btn" disabled={sending}>{sending ? "SENDING..." : "SEND MESSAGE"} <ArrowUpRight size={18}/></button>
        {notice && <p className={`notice ${notice.type}`}><CheckCircle2 size={15}/>{notice.text}</p>}
      </form></details>
    </section>
    <footer><a className="brand" href="#home"><span>FULL STACK<br/><small>DEVELOPER</small></span></a><span>© {new Date().getFullYear()} {profile.name}</span><a href="#home">BACK TO TOP ↑</a></footer>
  </main>;
}

export default App;
