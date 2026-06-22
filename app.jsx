const { useState, useEffect, useRef } = React;

// ─── Data ─────────────────────────────────────────────────────────────

const VALUES = [
  { n: "01", t: "Honesty",      body: "Honesty in the workplace is the key to quickly detect and solve any problem that surfaces in our day-to-day work." },
  { n: "02", t: "Politeness",   body: "Being polite to each other creates a conducive environment that lets us deliver the best service to our customers." },
  { n: "03", t: "Commitment",   body: "We are committed and ready to go the extra mile to make sure that our standard is never compromised." },
  { n: "04", t: "Perseverance", body: "We are passionate in what we do, and pay attention to the details of our work — down to the very last paper." },
  { n: "05", t: "Reliable",     body: "A team of experienced professionals, expert in their fields. Ready to answer your printing and production needs." },
];

const WORKFLOW = [
  { n: "01", t: "Marketing & Customer Service", body: "Ready to receive your order and tailor the service to your needs.", img: "img/wf/01-marketing.jpg" },
  { n: "02", t: "Design",         body: "Our internal design team translates your vision into printed results.",            img: "img/wf/02-design.jpg" },
  { n: "03", t: "Pre-press",      body: "We produce a sample print and review it with you for approval before production.", img: "img/wf/03-prepress.jpg" },
  { n: "04", t: "Printing",       body: "State-of-the-art presses and a supervised process keep your color stable.",        img: "img/wf/04-printing.jpg" },
  { n: "05", t: "Finishing",      body: "Finishing techniques are applied to enhance and protect the print.",                img: "img/wf/05-finishing.jpg" },
  { n: "06", t: "Quality Control",body: "Final quality checks performed during and after the process — every run, every time.", img: "img/wf/06-qc.jpg" },
  { n: "07", t: "Delivery",       body: "A reliable delivery team brings the finished products to your door, on time.",      img: "img/wf/07-delivery.jpg" },
];

const CAPABILITIES = [
  { group: "Offset Printing",      img: "img/cap/heidelberg.jpg",      machines: [
    { name: "Heidelberg SM52",         spec: "5 colors" },
    { name: "Komori Lithrone 540",     spec: "5 colors" },
    { name: "Komori Lithrone 440",     spec: "4C + Water Base" },
    { name: "Mitsubishi Daiya 2F",     spec: "4 colors" },
    { name: "Ryobi 750",               spec: "6 colors UV" },
  ]},
  { group: "Cutting & Die-cut",    img: "img/cap/paper-cutting.jpg",   machines: [
    { name: "Polar MOHR",              spec: "Paper cutting · 2 units" },
    { name: "Dayuan MHC-1060",         spec: "Die-cutting & creasing" },
    { name: "Manual Die-cut & Crease", spec: "4 units" },
  ]},
  { group: "Finishing",            img: "img/cap/laminating.jpg",      machines: [
    { name: "Automatic Laminating ZFM-800YA", spec: "Matte / Gloss" },
    { name: "Wa Yen LMB800",                  spec: "Thermal / flutter" },
    { name: "Automatic Hot Stamp TYMB-930",   spec: "Foil transfer" },
    { name: "Manual Hot Stamp",               spec: "4 units" },
    { name: "Hoson ZH-880FT",                 spec: "Folding & gluing · 2 units" },
  ]},
  { group: "Special",              img: "img/cap/window-patching.jpg", machines: [
    { name: "Hengtong ZKT-700",        spec: "Window patching" },
    { name: "Onda 250",                spec: "Blanking stripping" },
    { name: "Automatic Spot UV",       spec: "UV finish" },
    { name: "CTP PlateRite 8300N-S",   spec: "Platemaking" },
    { name: "Spectro Densitometer",    spec: "Color control" },
  ]},
];

const PRODUCTS = Array.from({ length: 12 }, (_, i) => ({
  img: `img/prod/${String(i + 1).padStart(2, "0")}.jpg`,
  tag: ["Premium Box","Rigid Box","Mailer","Retail","Sleeve","Box Drawer","Display","Specialty","Eco kraft","Folding Carton","One Color Box","Promo"][i],
}));

const CLIENTS = [
  { name: "PT Dalim Fideta Kornesia",       img: "img/clients/01.jpg" },
  { name: "PT Shinta Woo Sung",             img: "img/clients/02.jpg" },
  { name: "PT Dongan Kreasi Indonesia",     img: "img/clients/03.jpg" },
  { name: "PT Yuro Mustika",                img: "img/clients/04.jpg" },
  { name: "PT HLS Star Wig",                img: "img/clients/05.jpg" },
  { name: "PT Sunstarindo Wirahusada",      img: "img/clients/06.jpg" },
  { name: "PT Samindo Electronics",         img: "img/clients/07.jpg" },
  { name: "PT Dong Yang Illust Indonesia",  img: "img/clients/08.jpg" },
  { name: "Subway",                         img: "img/clients/09.jpg" },
  { name: "Saehan Puriwell",                img: "img/clients/10.jpg" },
  { name: "LG Electronics",                 img: "img/clients/11.jpg" },
  { name: "Dae Sang Agung Indonesia",       img: "img/clients/12.jpg" },
];

// ─── Helpers ─────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
  const [ref, inView] = useInView();
  return (
    <Tag ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

const Arrow = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 7h8m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowUpRight = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M5 11 11 5M5.5 5h5.5v5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Nav ──────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["About", "about"],
    ["Process", "workflow"],
    ["Capabilities", "capabilities"],
    ["Work", "products"],
    ["Clients", "clients"],
    ["Contact", "contact"],
  ];
  return (
    <nav className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#top" className="nav-brand">
        <img className="nav-logo" src="img/logo-insai.png" alt="INSAI"/>
        <span className="nav-brand-sub">Indonesia</span>
      </a>
      <ul className="nav-list">
        {links.map(([l, id]) => (
          <li key={id}><a href={`#${id}`}>{l}</a></li>
        ))}
      </ul>
      <a href="#contact" className="btn btn-md nav-cta">
        <span>Start a project</span>
        <span className="btn-arrow"><Arrow size={12}/></span>
      </a>
      <button className="nav-menu" onClick={() => setOpen(!open)} aria-label="Menu">
        <span/><span/>
      </button>
      {open && (
        <div className="nav-drawer" onClick={() => setOpen(false)}>
          {links.map(([l, id]) => <a key={id} href={`#${id}`}>{l}</a>)}
          <a href="#contact" className="drawer-cta">Start a project →</a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────

function Hero() {
  return (
    <header id="top" className="hero">
      <div className="hero-bg">
        <img src="img/hero-press.jpg" alt="Offset press in production"/>
        <span className="hero-bg-overlay"></span>
      </div>
      <div className="hero-inner">
        <div className="hero-top">
          <span className="eyebrow">
            <span className="eyebrow-dot"></span>
            <span>Now accepting Q3 orders · Cikupa, Tangerang</span>
          </span>
          <span className="t-label">PT INSAI INDONESIA / EST. 2000</span>
        </div>

        <div className="hero-main">
          <h1 className="hero-title">
            <span className="line"><span>Various</span></span>
            <span className="line"><span>Packaging</span></span>
            <span className="line"><span>Solution</span></span>
            <span className="line accent"><span>Expert.</span></span>
          </h1>

          <div className="hero-foot">
            <p className="hero-lead">
              A leading offset printing and production company, focused on packaging —
              serving local and international customers since the year 2000.
            </p>
            <div className="hero-actions">
              <a href="#workflow" className="btn">
                <span>See our process</span>
                <span className="btn-arrow"><Arrow size={12}/></span>
              </a>
              <a href="#capabilities" className="btn btn-outline">View capabilities</a>
            </div>
          </div>
        </div>

        <div className="hero-credit">
          <span className="hero-art-badge"><span className="dot"></span>Live · Press floor</span>
          <div className="hero-art-tag">
            <span className="l">Fig. 01 — 5-color offset</span>
            <span className="v">Komori Lithrone 540</span>
          </div>
        </div>

        <div className="hero-stats">
          {[
            ["25", "+", "Years operating"],
            ["12", "",  "Production lines"],
            ["07", "",  "Step workflow"],
            ["13", "",  "Active clients"],
          ].map(([n, sup, l], i) => (
            <Reveal key={i} className="stat" delay={i * 60}>
              <div className="stat-num">{n}{sup && <sup>{sup}</sup>}</div>
              <div className="stat-label">{l}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </header>
  );
}

// ─── About ───────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="section about">
      <div className="section-inner">
        <div className="section-head">
          <div className="section-head-meta">
            <div className="section-head-row">
              <span className="section-head-num">01 / About</span>
            </div>
            <Reveal as="h2" className="t-display">
              Quality is not<br/>an action.<br/><em>It's a habit.</em>
            </Reveal>
          </div>
          <Reveal as="p" className="section-tagline t-body-l" delay={80}>
            First established in the year 2000, PT Insai has grown into a leading offset printing
            and production company focused on packaging — with more than two decades of experience
            serving both local and international customers.
          </Reveal>
        </div>

        <Reveal className="about-body">
          <p>
            We work in a clean environment with punctual hours, and we treat the day with the
            friendliest smile. That habit is what produces only the highest-quality result —
            packed with care for our customers.
          </p>
        </Reveal>

        <div className="vm-grid">
          <Reveal className="vm-card" delay={80}>
            <div className="vm-card-head">
              <span className="badge">Vision</span>
              <span className="vm-card-num">VS / 01</span>
            </div>
            <div className="vm-card-q">
              To become a leader that <em>leads by example</em> in the printing industry.
            </div>
          </Reveal>
          <Reveal className="vm-card" delay={160}>
            <div className="vm-card-head">
              <span className="badge">Mission</span>
              <span className="vm-card-num">MS / 01</span>
            </div>
            <div className="vm-card-q">
              A <em>one-stop solution</em> in offset printing & production — high-quality results
              paired with friendly service that ensures customer satisfaction.
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Values ──────────────────────────────────────────────────────────

function Values() {
  return (
    <section id="values" className="section values">
      <div className="section-inner">
        <div className="section-head">
          <div className="section-head-meta">
            <div className="section-head-row"><span className="section-head-num">02 / Values</span></div>
            <Reveal as="h2" className="t-display">Five habits<br/><em>we never compromise.</em></Reveal>
          </div>
          <Reveal as="p" className="section-tagline t-body-l" delay={80}>
            The corporate values that shape every print run on our floor —
            from how we communicate with a client to how we handle the last paper of the day.
          </Reveal>
        </div>

        <div className="values-grid">
          {VALUES.map((v, i) => (
            <Reveal key={v.n} className="value-card" delay={i * 50}>
              <span className="value-card-num">{v.n}</span>
              <div className="value-card-title">{v.t}</div>
              <p className="value-card-body">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Workflow ────────────────────────────────────────────────────────

function Workflow() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % WORKFLOW.length), 3500);
    return () => clearInterval(id);
  }, [active]);

  return (
    <section id="workflow" className="section workflow">
      <div className="section-inner">
        <div className="section-head">
          <div className="section-head-meta">
            <div className="section-head-row"><span className="section-head-num">03 / Process</span></div>
            <Reveal as="h2" className="t-display">From your brief<br/><em>to your door.</em></Reveal>
          </div>
          <Reveal as="p" className="section-tagline t-body-l" delay={80}>
            Seven coordinated stages — from a friendly Marketing team to a reliable Delivery crew.
            PT Insai promises one thing across all of them: <strong style={{ color: 'var(--text-strong)' }}>quality.</strong>
          </Reveal>
        </div>

        <div className="workflow-stage">
          <figure className="workflow-figure">
            <div className="workflow-progress">
              {WORKFLOW.map((_, i) => (
                <div
                  key={i}
                  className={`workflow-progress-bar ${i < active ? "is-done" : ""} ${i === active ? "is-active" : ""}`}
                />
              ))}
            </div>
            {WORKFLOW.map((step, i) => (
              <img key={step.n} src={step.img} alt={step.t} className={i === active ? "is-active" : ""}/>
            ))}
            <div className="workflow-figure-overlay">
              <div className="workflow-figure-overlay-num">{WORKFLOW[active].n}</div>
              <div className="workflow-figure-overlay-text">{WORKFLOW[active].t}</div>
            </div>
          </figure>
          <div className="workflow-list">
            {WORKFLOW.map((step, i) => (
              <button
                key={step.n}
                className={`wf-row ${i === active ? "is-active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="wf-row-num">{step.n}</span>
                <div className="wf-row-content">
                  <span className="wf-row-title">{step.t}</span>
                  <span className="wf-row-body">{step.body}</span>
                </div>
                <span className="wf-row-arrow"><Arrow/></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Capabilities ───────────────────────────────────────────────────

function Capabilities() {
  const [group, setGroup] = useState(0);
  return (
    <section id="capabilities" className="section capabilities">
      <div className="section-inner">
        <div className="section-head">
          <div className="section-head-meta">
            <div className="section-head-row"><span className="section-head-num">04 / Capabilities</span></div>
            <Reveal as="h2" className="t-display">World-class machines.<br/><em>Distinguishable results.</em></Reveal>
          </div>
          <Reveal as="p" className="section-tagline t-body-l" delay={80}>
            We invest in equipment that protects your color, your shape and your finish —
            from CTP platemaking through five-color offset to automatic spot UV.
          </Reveal>
        </div>

        <div className="cap-tabs">
          {CAPABILITIES.map((g, i) => (
            <button
              key={g.group}
              className={`cap-tab ${i === group ? "is-active" : ""}`}
              onClick={() => setGroup(i)}
            >
              <span>{g.group}</span>
              <span className="cap-tab-count">{String(g.machines.length).padStart(2, "0")}</span>
            </button>
          ))}
        </div>

        <div className="cap-panel">
          <figure className="cap-figure">
            <span className="cap-figure-tag">Group · {String(group + 1).padStart(2, "0")}</span>
            {CAPABILITIES.map((g, i) => (
              <img key={g.group} src={g.img} alt={g.group} className={i === group ? "is-active" : ""}/>
            ))}
            <div className="cap-figure-bottom">
              <span className="cap-figure-bottom-title">{CAPABILITIES[group].group}</span>
              <span className="cap-figure-bottom-count">{CAPABILITIES[group].machines.length} machines</span>
            </div>
          </figure>

          <ul className="cap-machines">
            {CAPABILITIES[group].machines.map((m, i) => (
              <li key={m.name} className="cap-machine" style={{ animationDelay: `${i * 50}ms` }}>
                <span className="cap-machine-idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="cap-machine-name">{m.name}</span>
                <span className="cap-machine-spec">{m.spec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── Products ──────────────────────────────────────────────────────

function Products() {
  return (
    <section id="products" className="section products">
      <div className="section-inner">
        <div className="section-head">
          <div className="section-head-meta">
            <div className="section-head-row"><span className="section-head-num">05 / Work</span></div>
            <Reveal as="h2" className="t-display">Print and finish<br/><em>across formats.</em></Reveal>
          </div>
          <Reveal as="p" className="section-tagline t-body-l" delay={80}>
            A selection of recent runs — folding cartons, rigid boxes, mailers, sleeves and
            specialty pieces produced on our floor.
          </Reveal>
        </div>

        <div className="products-grid">
          {PRODUCTS.map((p, i) => (
            <Reveal key={i} className={`product product--${(i % 6) + 1}`} delay={i * 30}>
              <div className="product-img">
                <img src={p.img} alt={p.tag}/>
              </div>
              <div className="product-meta">
                <span className="product-tag">{p.tag}</span>
                <span className="product-num">#{String(i + 1).padStart(3, "0")}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Clients ──────────────────────────────────────────────────────

function Clients() {
  return (
    <section id="clients" className="section clients">
      <div className="section-inner">
        <div className="section-head">
          <div className="section-head-meta">
            <div className="section-head-row"><span className="section-head-num">06 / Clients</span></div>
            <Reveal as="h2" className="t-display">Trusted across<br/><em>the region.</em></Reveal>
          </div>
          <Reveal as="p" className="section-tagline t-body-l" delay={80}>
            A short list of partners whose packaging we've had the privilege to print.
          </Reveal>
        </div>

        <div className="clients-grid">
          {CLIENTS.map((c, i) => (
            <Reveal key={c.name} className="client" delay={i * 30}>
              <div className="client-logo"><img src={c.img} alt={c.name}/></div>
              <div className="client-name">{c.name}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ───────────────────────────────────────────────────────

function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const sent = status === "sent";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending" || status === "sent") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/insaipack@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error("Network error");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-card">
        <div className="contact-left">
          <img className="contact-logo" src="img/logo-insai-white.png" alt="INSAI"/>
          <span className="badge badge-dark">07 / Contact</span>
          <Reveal as="h2" className="contact-title">
            Let's get something<br/><em>printed.</em>
          </Reveal>
          <Reveal as="p" className="contact-lead" delay={80}>
            Tell us about your packaging brief — size, stock, finishing and quantity.
            We'll come back with a quote and a sample plan.
          </Reveal>

          <Reveal className="contact-details" delay={160}>
            <div className="contact-detail">
              <span className="contact-detail-label">Address</span>
              <p className="contact-detail-value">Jl. Raya Serang Km. 16.8,<br/>Sukamulya, Cikupa,<br/>Tangerang — Banten 15710,<br/>Indonesia</p>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-label">Telephone</span>
              <p className="contact-detail-value">(021) 2202 8556<br/>(021) 2202 8544</p>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-label">Email</span>
              <p className="contact-detail-value"><a href="mailto:insaipack@gmail.com">insaipack@gmail.com</a></p>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-label">Hours</span>
              <p className="contact-detail-value">Mon — Fri · 08:00–17:00 WIB<br/>Sat · 08:00–13:00 WIB</p>
            </div>
          </Reveal>
        </div>

        {sent ? (
          <div className="contact-thanks">
            <span className="contact-thanks-check">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M5 12.5 10 17.5 19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <h3 className="contact-thanks-title">Thank you — your request is on its way.</h3>
            <p className="contact-thanks-body">We've received your brief and will get back to you with a quote and a sample plan, usually within one business day.</p>
            <button type="button" className="btn btn-outline" onClick={() => setStatus("idle")}>
              <span>Send another request</span>
            </button>
          </div>
        ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="hidden" name="_subject" value="New packaging request — INSAI website"/>
          <input type="hidden" name="_template" value="table"/>
          <input type="hidden" name="_captcha" value="false"/>
          <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off"/>
          <div className="contact-form-head">
            <span className="t-label">Request form · A-001</span>
            <span className="t-label">{new Date().toISOString().slice(0,10)}</span>
          </div>
          <label className="field">
            <span className="field-label">Company / Name</span>
            <input className="field-input" name="Company / Name" type="text" required placeholder="Acme Co."/>
          </label>
          <label className="field">
            <span className="field-label">Email</span>
            <input className="field-input" name="Email" type="email" required placeholder="you@company.com"/>
          </label>
          <div className="field-row">
            <label className="field">
              <span className="field-label">Project type</span>
              <select className="field-select" name="Project type" defaultValue="">
                <option value="" disabled>Select…</option>
                <option>Folding carton</option>
                <option>Rigid box</option>
                <option>Mailer / corrugated</option>
                <option>Label / sticker</option>
                <option>Brochure / catalog</option>
                <option>Other</option>
              </select>
            </label>
            <label className="field">
              <span className="field-label">Quantity</span>
              <input className="field-input" name="Quantity" type="text" placeholder="5,000 pcs"/>
            </label>
          </div>
          <label className="field">
            <span className="field-label">Brief</span>
            <textarea className="field-textarea" name="Brief" rows="4" placeholder="Size, stock, finishing, deadline…"/>
          </label>
          <button type="submit" className="btn" disabled={status === "sending"}>
            <span>{status === "sending" ? "Sending…" : "Send request"}</span>
            {status !== "sending" && <span className="btn-arrow"><Arrow size={12}/></span>}
          </button>
          {status === "error" && (
            <p className="form-error">Something went wrong. Please email <a href="mailto:insaipack@gmail.com">insaipack@gmail.com</a> directly.</p>
          )}
        </form>
        )}
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-brand-row">
              <img className="footer-logo" src="img/logo-insai.png" alt="INSAI"/>
            </div>
            <p className="footer-brand-desc">
              Various Packaging Solution Expert. Established in Tangerang,
              Indonesia, in the year 2000.
            </p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <span className="footer-col-head">— Explore</span>
              <a href="#about">About</a>
              <a href="#workflow">Process</a>
              <a href="#capabilities">Capabilities</a>
              <a href="#products">Selected work</a>
              <a href="#clients">Clients</a>
            </div>
            <div className="footer-col">
              <span className="footer-col-head">— Contact</span>
              <a href="mailto:insaipack@gmail.com">insaipack@gmail.com</a>
              <a href="tel:+62212202855">(021) 2202 8556</a>
              <a href="#contact">Request a quote</a>
            </div>
            <div className="footer-col">
              <span className="footer-col-head">— Location</span>
              <p>Jl. Raya Serang Km. 16.8<br/>Sukamulya, Cikupa<br/>Tangerang — Banten 15710</p>
            </div>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} PT INSAI INDONESIA. ALL RIGHTS RESERVED.</span>
          <span className="t-label">PACKAGING / OFFSET / FINISHING — EST. 2000</span>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────

function App() {
  return (
    <div className="page">
      <Nav />
      <main>
        <Hero />
        <About />
        <Values />
        <Workflow />
        <Capabilities />
        <Products />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
