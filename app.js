const {
  useState,
  useEffect,
  useRef
} = React;

// ─── Data ─────────────────────────────────────────────────────────────

const HISTORY = [{
  y: "2001",
  t: "Company founded & plant launched",
  body: "PT INSAI INDONESIA is established and its offset printing and packaging manufacturing lines start operating."
}, {
  y: "2004",
  t: "GEOX & FILA packaging supply",
  body: "Dedicated individual boxes, hang-tags, labels and manual books supplied for GEOX (PT, Eagle, Taehwa, Wupu, etc.) and FILA."
}, {
  y: "2005",
  t: "CONVERSE (KMK) packaging supply",
  body: "Dedicated CONVERSE individual boxes and brand labels supplied through KMK, building deep know-how in global brand specifications."
}, {
  y: "2022",
  t: "CTP digital plate-making introduced",
  body: "Computer-to-Plate (CTP) imaging system introduced and put into operation, securing plate-making precision."
}, {
  y: "2023",
  t: "Spectrophotometer introduced",
  body: "In-process spectrophotometer for real-time color measurement, minimizing color deviation (ΔE) during printing."
}, {
  y: "2024",
  t: "ISO 9001 & RYOBI 6-color UV",
  body: "ISO 9001 quality management certification obtained and a RYOBI 6-color UV press introduced, expanding our premium beauty and specialty-paper printing line."
}, {
  y: "2026",
  t: "FSC® certification & QC expansion",
  body: "FSC® eco-certification obtained and two additional color-measurement units added for final quality-control inspection."
}];
const WORKFLOW = [{
  n: "01",
  t: "Marketing & Customer Service",
  body: "Ready to receive your order and tailor the service to your needs.",
  img: "img/wf/01-marketing.jpg"
}, {
  n: "02",
  t: "Design",
  body: "Our internal design team translates your vision into printed results.",
  img: "img/wf/02-design.jpg"
}, {
  n: "03",
  t: "Pre-press",
  body: "Screen PlateRite CTP sends digital data straight to plate — no film stage, no plate-register error. We review a sample print with you before production.",
  img: "img/wf/03-prepress.jpg"
}, {
  n: "04",
  t: "Printing",
  body: "Five multi-color offset lines, including a 6-color UV press, with on-press spectrophotometer control to hold Pantone spot colors steady.",
  img: "img/wf/04-printing.jpg"
}, {
  n: "05",
  t: "Finishing",
  body: "Automatic die-cutting and stripping, window patching, Spot UV, embossing, foil stamping and auto gluing — enhancing and protecting every print.",
  img: "img/wf/05-finishing.jpg"
}, {
  n: "06",
  t: "Quality Control",
  body: "Spectrophotometers and a densitometer measure ink density and Delta-E on every run, so reorders match the original color.",
  img: "img/wf/06-qc.jpg"
}, {
  n: "07",
  t: "Delivery",
  body: "A reliable delivery team brings the finished products to your door, on time.",
  img: "img/wf/07-delivery.jpg"
}];
const INFRA = [{
  k: "Pre-press & plate-making",
  gear: ["Screen PlateRite CTP digital platesetter"],
  perk: "Direct digital output removes the film stage and eliminates plate-register error."
}, {
  k: "Offset printing · 5 presses",
  gear: ["1 × 6-color UV (RYOBI 750)", "2 × 5-color offset (HEIDELBERG / KOMORI)", "2 × 4-color offset (MITSUBISHI DAIYA, etc.)"],
  perk: "Metallized and silver PET printing, precise Pantone spot colors and instant UV curing."
}, {
  k: "Automated finishing",
  gear: ["Automatic Thomson die-cutter & waste stripper", "Automatic window-patching machine", "Spot UV, embossing, debossing, gold / silver foil, auto gluer"],
  perk: "Contamination-free film attachment on window boxes, high-speed die-cutting and 3D surface finishes."
}, {
  k: "Precision color control",
  gear: ["1 × on-press spectrophotometer", "2 × final-QC spectrophotometers & densitometer"],
  perk: "Ink density and Delta-E (ΔE) managed numerically on every run — identical color on reorders."
}];
const CAPACITY = [{
  v: "2.0–2.5",
  u: "million",
  l: "Printing impressions",
  s: "per month, at stable utilization"
}, {
  v: "3.0–4.0",
  u: "million",
  l: "Finished packaging pieces",
  s: "per month · folding cartons & general boxes"
}, {
  v: "150–200",
  u: "tons",
  l: "Paper consumed",
  s: "per month · flexible for urgent orders and high-mix, low- to high-volume runs"
}, {
  v: "14",
  u: "million pairs",
  l: "Shoe trees",
  s: "per month · 14,000,000 pairs",
  hl: true
}];
const CAPABILITIES = [{
  group: "Offset Printing",
  img: "img/cap/heidelberg.jpg",
  machines: [{
    name: "Heidelberg SM52",
    spec: "5 colors"
  }, {
    name: "Komori Lithrone 540",
    spec: "5 colors"
  }, {
    name: "Komori Lithrone 440",
    spec: "4C + Water Base"
  }, {
    name: "Mitsubishi Daiya 2F",
    spec: "4 colors"
  }, {
    name: "Ryobi 750",
    spec: "6 colors UV"
  }]
}, {
  group: "Cutting & Die-cut",
  img: "img/cap/paper-cutting.jpg",
  machines: [{
    name: "Polar MOHR",
    spec: "Paper cutting · 2 units"
  }, {
    name: "Dayuan MHC-1060",
    spec: "Die-cutting & creasing"
  }, {
    name: "Manual Die-cut & Crease",
    spec: "4 units"
  }]
}, {
  group: "Finishing",
  img: "img/cap/laminating.jpg",
  machines: [{
    name: "Automatic Laminating ZFM-800YA",
    spec: "Matte / Gloss"
  }, {
    name: "Wa Yen LMB800",
    spec: "Thermal / flutter"
  }, {
    name: "Automatic Hot Stamp TYMB-930",
    spec: "Foil transfer"
  }, {
    name: "Manual Hot Stamp",
    spec: "4 units"
  }, {
    name: "Hoson ZH-880FT",
    spec: "Folding & gluing · 2 units"
  }]
}, {
  group: "Special",
  img: "img/cap/window-patching.jpg",
  machines: [{
    name: "Hengtong ZKT-700",
    spec: "Window patching"
  }, {
    name: "Onda 250",
    spec: "Blanking stripping"
  }, {
    name: "Automatic Spot UV",
    spec: "UV finish"
  }, {
    name: "CTP PlateRite 8300N-S",
    spec: "Platemaking"
  }, {
    name: "Spectro Densitometer",
    spec: "Color control"
  }]
}];
const PORTFOLIO = [{
  cat: "Footwear Packaging",
  items: ["Individual shoe boxes", "Hang-tags", "Size & barcode labels", "Brand manual books"],
  note: "Global-standard specifications, backed by a supply record for GEOX, FILA and CONVERSE."
}, {
  cat: "Beauty & Cosmetics",
  items: ["Wig window boxes (clear film)", "Cosmetic folding cartons", "Premium rigid boxes"],
  note: "Clear-film window finishing, premium coatings, gold / silver foil and 3D embossing."
}, {
  cat: "Food & Nori Packaging",
  items: ["Nori roll boxes", "Food outer boxes", "Deli paper"],
  note: "Non-toxic, water-based eco coating and hygienic food-packaging processes."
}, {
  cat: "Sports & Consumer Goods",
  items: ["Golf glove & sports gear packs", "Small electronics boxes", "Air-freshener cases"],
  note: "High-strength paper forming, precision die-cutting and durable coated finishes."
}, {
  cat: "Stickers & Special Labels",
  items: ["Security seal stickers", "Silver & clear PET labels", "Sheet and roll labels"],
  note: "High-precision printing combined with finishing for strong adhesion and sharp print quality."
}];
const PRODUCTS = Array.from({
  length: 12
}, (_, i) => ({
  img: `img/prod/${String(i + 1).padStart(2, "0")}.jpg`,
  tag: ["Premium Box", "Rigid Box", "Mailer", "Retail", "Sleeve", "Box Drawer", "Display", "Specialty", "Eco kraft", "Folding Carton", "One Color Box", "Promo"][i]
}));
const CLIENTS = [{
  name: "PT Dalim Fideta Kornesia",
  img: "img/clients/01.jpg"
}, {
  name: "PT Shinta Woo Sung",
  img: "img/clients/02.jpg"
}, {
  name: "PT Dongan Kreasi Indonesia",
  img: "img/clients/03.jpg"
}, {
  name: "PT Yuro Mustika",
  img: "img/clients/04.jpg"
}, {
  name: "PT HLS Star Wig",
  img: "img/clients/05.jpg"
}, {
  name: "PT Sunstarindo Wirahusada",
  img: "img/clients/06.jpg"
}, {
  name: "PT Samindo Electronics",
  img: "img/clients/07.jpg"
}, {
  name: "PT Dong Yang Illust Indonesia",
  img: "img/clients/08.jpg"
}, {
  name: "Subway",
  img: "img/clients/09.jpg"
}, {
  name: "Saehan Puriwell",
  img: "img/clients/10.jpg"
}, {
  name: "LG Electronics",
  img: "img/clients/11.jpg"
}, {
  name: "Dae Sang Agung Indonesia",
  img: "img/clients/12.jpg"
}];

// ─── Helpers ─────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, {
      threshold
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}
function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = ""
}) {
  const [ref, inView] = useInView();
  return /*#__PURE__*/React.createElement(Tag, {
    ref: ref,
    className: `reveal ${inView ? "in" : ""} ${className}`,
    style: {
      transitionDelay: `${delay}ms`
    }
  }, children);
}
const Arrow = ({
  size = 14
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 14 14",
  fill: "none",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7h8m-4-4 4 4-4 4",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const ArrowUpRight = ({
  size = 16
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 16 16",
  fill: "none",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M5 11 11 5M5.5 5h5.5v5.5",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

// ─── Nav ──────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [["About", "about"], ["Process", "workflow"], ["Capabilities", "capabilities"], ["Work", "products"], ["Clients", "clients"], ["Contact", "contact"]];
  return /*#__PURE__*/React.createElement("nav", {
    className: `nav ${scrolled ? "is-scrolled" : ""}`
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    className: "nav-brand"
  }, /*#__PURE__*/React.createElement("img", {
    className: "nav-logo",
    src: "img/logo-insai.png",
    alt: "INSAI"
  }), /*#__PURE__*/React.createElement("span", {
    className: "nav-brand-sub"
  }, "Indonesia")), /*#__PURE__*/React.createElement("ul", {
    className: "nav-list"
  }, links.map(([l, id]) => /*#__PURE__*/React.createElement("li", {
    key: id
  }, /*#__PURE__*/React.createElement("a", {
    href: `#${id}`
  }, l)))), /*#__PURE__*/React.createElement("a", {
    href: "#contact",
    className: "btn btn-md nav-cta"
  }, /*#__PURE__*/React.createElement("span", null, "Start a project"), /*#__PURE__*/React.createElement("span", {
    className: "btn-arrow"
  }, /*#__PURE__*/React.createElement(Arrow, {
    size: 12
  }))), /*#__PURE__*/React.createElement("button", {
    className: "nav-menu",
    onClick: () => setOpen(!open),
    "aria-label": "Menu"
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)), open && /*#__PURE__*/React.createElement("div", {
    className: "nav-drawer",
    onClick: () => setOpen(false)
  }, links.map(([l, id]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: `#${id}`
  }, l)), /*#__PURE__*/React.createElement("a", {
    href: "#contact",
    className: "drawer-cta"
  }, "Start a project \u2192")));
}

// ─── Hero ─────────────────────────────────────────────────────────────

function Hero() {
  return /*#__PURE__*/React.createElement("header", {
    id: "top",
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-bg"
  }, /*#__PURE__*/React.createElement("img", {
    src: "img/hero-press.jpg",
    alt: "Offset press in production"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hero-bg-overlay"
  })), /*#__PURE__*/React.createElement("div", {
    className: "hero-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow-dot"
  }), /*#__PURE__*/React.createElement("span", null, "Now accepting Q3 orders \xB7 Cikupa, Tangerang")), /*#__PURE__*/React.createElement("span", {
    className: "t-label"
  }, "PT INSAI INDONESIA / EST. 2000")), /*#__PURE__*/React.createElement("div", {
    className: "hero-main"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "hero-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "line"
  }, /*#__PURE__*/React.createElement("span", null, "Various")), /*#__PURE__*/React.createElement("span", {
    className: "line"
  }, /*#__PURE__*/React.createElement("span", null, "Packaging")), /*#__PURE__*/React.createElement("span", {
    className: "line"
  }, /*#__PURE__*/React.createElement("span", null, "Solution")), /*#__PURE__*/React.createElement("span", {
    className: "line accent"
  }, /*#__PURE__*/React.createElement("span", null, "Expert."))), /*#__PURE__*/React.createElement("div", {
    className: "hero-foot"
  }, /*#__PURE__*/React.createElement("p", {
    className: "hero-lead"
  }, "A leading offset printing and production company, focused on packaging \u2014 serving local and international customers since the year 2000."), /*#__PURE__*/React.createElement("div", {
    className: "hero-actions"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#workflow",
    className: "btn"
  }, /*#__PURE__*/React.createElement("span", null, "See our process"), /*#__PURE__*/React.createElement("span", {
    className: "btn-arrow"
  }, /*#__PURE__*/React.createElement(Arrow, {
    size: 12
  }))), /*#__PURE__*/React.createElement("a", {
    href: "#capabilities",
    className: "btn btn-outline"
  }, "View capabilities")))), /*#__PURE__*/React.createElement("div", {
    className: "hero-credit"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hero-art-badge"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "Live \xB7 Press floor"), /*#__PURE__*/React.createElement("div", {
    className: "hero-art-tag"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Fig. 01 \u2014 5-color offset"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "Komori Lithrone 540"))), /*#__PURE__*/React.createElement("div", {
    className: "hero-stats"
  }, [["25", "+", "Years operating"], ["12", "", "Production lines"], ["07", "", "Step workflow"], ["13", "", "Active clients"]].map(([n, sup, l], i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    className: "stat",
    delay: i * 60
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, n, sup && /*#__PURE__*/React.createElement("sup", null, sup)), /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, l))))));
}

// ─── About ───────────────────────────────────────────────────────────

function About() {
  return /*#__PURE__*/React.createElement("section", {
    id: "about",
    className: "section about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-head-num"
  }, "01 / About")), /*#__PURE__*/React.createElement(Reveal, {
    as: "h2",
    className: "t-display"
  }, "Quality is not", /*#__PURE__*/React.createElement("br", null), "an action.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "It's a habit."))), /*#__PURE__*/React.createElement(Reveal, {
    as: "p",
    className: "section-tagline t-body-l",
    delay: 80
  }, "First established in the year 2000, PT Insai has grown into a leading offset printing and production company focused on packaging \u2014 with more than two decades of experience serving both local and international customers.")), /*#__PURE__*/React.createElement(Reveal, {
    className: "about-body"
  }, /*#__PURE__*/React.createElement("p", null, "We work in a clean environment with punctual hours, and we treat the day with the friendliest smile. That habit is what produces only the highest-quality result \u2014 packed with care for our customers.")), /*#__PURE__*/React.createElement("div", {
    className: "vm-grid"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "vm-card",
    delay: 80
  }, /*#__PURE__*/React.createElement("div", {
    className: "vm-card-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, "Vision"), /*#__PURE__*/React.createElement("span", {
    className: "vm-card-num"
  }, "VS / 01")), /*#__PURE__*/React.createElement("div", {
    className: "vm-card-q"
  }, "To become a leader that ", /*#__PURE__*/React.createElement("em", null, "leads by example"), " in the printing industry.")), /*#__PURE__*/React.createElement(Reveal, {
    className: "vm-card",
    delay: 160
  }, /*#__PURE__*/React.createElement("div", {
    className: "vm-card-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, "Mission"), /*#__PURE__*/React.createElement("span", {
    className: "vm-card-num"
  }, "MS / 01")), /*#__PURE__*/React.createElement("div", {
    className: "vm-card-q"
  }, "A ", /*#__PURE__*/React.createElement("em", null, "one-stop solution"), " in offset printing & production \u2014 high-quality results paired with friendly service that ensures customer satisfaction.")))));
}

// ─── History ─────────────────────────────────────────────────────────

function HistorySection() {
  return /*#__PURE__*/React.createElement("section", {
    id: "history",
    className: "section values"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-head-num"
  }, "02 / History")), /*#__PURE__*/React.createElement(Reveal, {
    as: "h2",
    className: "t-display"
  }, "History &", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "milestones."))), /*#__PURE__*/React.createElement(Reveal, {
    as: "p",
    className: "section-tagline t-body-l",
    delay: 80
  }, "Since our earliest days we have grown by meeting the strict individual-box and trim specifications of global footwear brands. Over the last four years we have invested in digital plate-making (CTP), a 6-color UV press and three precision spectrophotometers \u2014 completing a quality-control system that meets global tier-1 brand standards.")), /*#__PURE__*/React.createElement("div", {
    className: "history-grid"
  }, HISTORY.map((h, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: h.y,
    className: "value-card history-card",
    delay: i * 50
  }, /*#__PURE__*/React.createElement("span", {
    className: "history-year"
  }, h.y), /*#__PURE__*/React.createElement("div", {
    className: "value-card-title"
  }, h.t), /*#__PURE__*/React.createElement("p", {
    className: "value-card-body"
  }, h.body))), /*#__PURE__*/React.createElement(Reveal, {
    className: "value-card history-card history-card-esg",
    delay: HISTORY.length * 50
  }, /*#__PURE__*/React.createElement("span", {
    className: "history-year"
  }, "Next 3 years"), /*#__PURE__*/React.createElement("div", {
    className: "value-card-title"
  }, "Eco-material sourcing & ESG strategy"), /*#__PURE__*/React.createElement("p", {
    className: "value-card-body"
  }, "To get ahead of rising global-brand demand for eco-friendly packaging, we run a sourcing process that continuously researches the latest recycled papers, non-toxic water-based inks and biodegradable coating materials \u2014 and applies the best of them in actual production.")))));
}

// ─── Workflow ────────────────────────────────────────────────────────

function Workflow() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % WORKFLOW.length), 3500);
    return () => clearInterval(id);
  }, [active]);
  return /*#__PURE__*/React.createElement("section", {
    id: "workflow",
    className: "section workflow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-head-num"
  }, "03 / Process")), /*#__PURE__*/React.createElement(Reveal, {
    as: "h2",
    className: "t-display"
  }, "From your brief", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "to your door."))), /*#__PURE__*/React.createElement(Reveal, {
    as: "p",
    className: "section-tagline t-body-l",
    delay: 80
  }, "Seven coordinated stages \u2014 from a friendly Marketing team to a reliable Delivery crew. PT Insai promises one thing across all of them: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-strong)'
    }
  }, "quality."))), /*#__PURE__*/React.createElement("div", {
    className: "workflow-stage"
  }, /*#__PURE__*/React.createElement("figure", {
    className: "workflow-figure"
  }, /*#__PURE__*/React.createElement("div", {
    className: "workflow-progress"
  }, WORKFLOW.map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `workflow-progress-bar ${i < active ? "is-done" : ""} ${i === active ? "is-active" : ""}`
  }))), WORKFLOW.map((step, i) => /*#__PURE__*/React.createElement("img", {
    key: step.n,
    src: step.img,
    alt: step.t,
    className: i === active ? "is-active" : ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "workflow-figure-overlay"
  }, /*#__PURE__*/React.createElement("div", {
    className: "workflow-figure-overlay-num"
  }, WORKFLOW[active].n), /*#__PURE__*/React.createElement("div", {
    className: "workflow-figure-overlay-text"
  }, WORKFLOW[active].t))), /*#__PURE__*/React.createElement("div", {
    className: "workflow-list"
  }, WORKFLOW.map((step, i) => /*#__PURE__*/React.createElement("button", {
    key: step.n,
    className: `wf-row ${i === active ? "is-active" : ""}`,
    onMouseEnter: () => setActive(i),
    onClick: () => setActive(i)
  }, /*#__PURE__*/React.createElement("span", {
    className: "wf-row-num"
  }, step.n), /*#__PURE__*/React.createElement("div", {
    className: "wf-row-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wf-row-title"
  }, step.t), /*#__PURE__*/React.createElement("span", {
    className: "wf-row-body"
  }, step.body)), /*#__PURE__*/React.createElement("span", {
    className: "wf-row-arrow"
  }, /*#__PURE__*/React.createElement(Arrow, null))))))));
}

// ─── Capabilities ───────────────────────────────────────────────────

function Capabilities() {
  const [group, setGroup] = useState(0);
  return /*#__PURE__*/React.createElement("section", {
    id: "capabilities",
    className: "section capabilities"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-head-num"
  }, "04 / Capabilities")), /*#__PURE__*/React.createElement(Reveal, {
    as: "h2",
    className: "t-display"
  }, "World-class machines.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "Distinguishable results."))), /*#__PURE__*/React.createElement(Reveal, {
    as: "p",
    className: "section-tagline t-body-l",
    delay: 80
  }, "We invest in equipment that protects your color, your shape and your finish \u2014 from CTP platemaking through five-color offset to automatic spot UV.")), /*#__PURE__*/React.createElement("div", {
    className: "cap-tabs"
  }, CAPABILITIES.map((g, i) => /*#__PURE__*/React.createElement("button", {
    key: g.group,
    className: `cap-tab ${i === group ? "is-active" : ""}`,
    onClick: () => setGroup(i)
  }, /*#__PURE__*/React.createElement("span", null, g.group), /*#__PURE__*/React.createElement("span", {
    className: "cap-tab-count"
  }, String(g.machines.length).padStart(2, "0"))))), /*#__PURE__*/React.createElement("div", {
    className: "cap-panel"
  }, /*#__PURE__*/React.createElement("figure", {
    className: "cap-figure"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cap-figure-tag"
  }, "Group \xB7 ", String(group + 1).padStart(2, "0")), CAPABILITIES.map((g, i) => /*#__PURE__*/React.createElement("img", {
    key: g.group,
    src: g.img,
    alt: g.group,
    className: i === group ? "is-active" : ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "cap-figure-bottom"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cap-figure-bottom-title"
  }, CAPABILITIES[group].group), /*#__PURE__*/React.createElement("span", {
    className: "cap-figure-bottom-count"
  }, CAPABILITIES[group].machines.length, " machines"))), /*#__PURE__*/React.createElement("ul", {
    className: "cap-machines"
  }, CAPABILITIES[group].machines.map((m, i) => /*#__PURE__*/React.createElement("li", {
    key: m.name,
    className: "cap-machine",
    style: {
      animationDelay: `${i * 50}ms`
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "cap-machine-idx"
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
    className: "cap-machine-name"
  }, m.name), /*#__PURE__*/React.createElement("span", {
    className: "cap-machine-spec"
  }, m.spec))))), /*#__PURE__*/React.createElement("div", {
    className: "infra"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "infra-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "infra-eyebrow"
  }, "One-stop infrastructure"), /*#__PURE__*/React.createElement("p", {
    className: "infra-lead"
  }, "Five multi-color offset lines, digital plate-making, automated finishing and precision color measurement \u2014 integrated in a single production facility.")), /*#__PURE__*/React.createElement("div", {
    className: "infra-grid"
  }, INFRA.map((c, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: c.k,
    className: "infra-card",
    delay: i * 50
  }, /*#__PURE__*/React.createElement("div", {
    className: "infra-card-title"
  }, c.k), /*#__PURE__*/React.createElement("ul", {
    className: "infra-gear"
  }, c.gear.map(g => /*#__PURE__*/React.createElement("li", {
    key: g
  }, g))), /*#__PURE__*/React.createElement("p", {
    className: "infra-perk"
  }, c.perk)))), /*#__PURE__*/React.createElement(Reveal, {
    className: "infra-head capacity-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "infra-eyebrow"
  }, "Monthly production capacity"), /*#__PURE__*/React.createElement("p", {
    className: "infra-lead"
  }, "Standard output at stable utilization.")), /*#__PURE__*/React.createElement("div", {
    className: "capacity-grid"
  }, CAPACITY.map((c, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: c.l,
    className: `capacity-tile ${c.hl ? "is-hl" : ""}`,
    delay: i * 50
  }, /*#__PURE__*/React.createElement("div", {
    className: "capacity-label"
  }, c.l), /*#__PURE__*/React.createElement("div", {
    className: "capacity-value"
  }, /*#__PURE__*/React.createElement("span", {
    className: "capacity-num"
  }, c.v), /*#__PURE__*/React.createElement("span", {
    className: "capacity-unit"
  }, c.u)), /*#__PURE__*/React.createElement("div", {
    className: "capacity-sub"
  }, c.s)))))));
}

// ─── Products ──────────────────────────────────────────────────────

function Products() {
  return /*#__PURE__*/React.createElement("section", {
    id: "products",
    className: "section products"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-head-num"
  }, "05 / Work")), /*#__PURE__*/React.createElement(Reveal, {
    as: "h2",
    className: "t-display"
  }, "Print and finish", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "across formats."))), /*#__PURE__*/React.createElement(Reveal, {
    as: "p",
    className: "section-tagline t-body-l",
    delay: 80
  }, "From footwear and beauty to food, sports goods and labels \u2014 a portfolio built on global-brand standards, plus a selection of recent runs produced on our floor.")), /*#__PURE__*/React.createElement("div", {
    className: "portfolio-grid"
  }, PORTFOLIO.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: p.cat,
    className: "portfolio-card",
    delay: i * 50
  }, /*#__PURE__*/React.createElement("span", {
    className: "portfolio-idx"
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("div", {
    className: "portfolio-cat"
  }, p.cat), /*#__PURE__*/React.createElement("ul", {
    className: "infra-gear"
  }, p.items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it
  }, it))), /*#__PURE__*/React.createElement("p", {
    className: "infra-perk"
  }, p.note)))), /*#__PURE__*/React.createElement("div", {
    className: "infra-eyebrow portfolio-photos-label"
  }, "Recent runs"), /*#__PURE__*/React.createElement("div", {
    className: "products-grid"
  }, PRODUCTS.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    className: `product product--${i % 6 + 1}`,
    delay: i * 30
  }, /*#__PURE__*/React.createElement("div", {
    className: "product-img"
  }, /*#__PURE__*/React.createElement("img", {
    src: p.img,
    alt: p.tag
  })), /*#__PURE__*/React.createElement("div", {
    className: "product-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "product-tag"
  }, p.tag), /*#__PURE__*/React.createElement("span", {
    className: "product-num"
  }, "#", String(i + 1).padStart(3, "0"))))))));
}

// ─── Clients ──────────────────────────────────────────────────────

function Clients() {
  return /*#__PURE__*/React.createElement("section", {
    id: "clients",
    className: "section clients"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-head-num"
  }, "06 / Clients")), /*#__PURE__*/React.createElement(Reveal, {
    as: "h2",
    className: "t-display"
  }, "Trusted across", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "the region."))), /*#__PURE__*/React.createElement(Reveal, {
    as: "p",
    className: "section-tagline t-body-l",
    delay: 80
  }, "A short list of partners whose packaging we've had the privilege to print.")), /*#__PURE__*/React.createElement("div", {
    className: "clients-grid"
  }, CLIENTS.map((c, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: c.name,
    className: "client",
    delay: i * 30
  }, /*#__PURE__*/React.createElement("div", {
    className: "client-logo"
  }, /*#__PURE__*/React.createElement("img", {
    src: c.img,
    alt: c.name
  })), /*#__PURE__*/React.createElement("div", {
    className: "client-name"
  }, c.name))))));
}

// ─── Contact ───────────────────────────────────────────────────────

function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const sent = status === "sent";
  const handleSubmit = async e => {
    e.preventDefault();
    if (status === "sending" || status === "sent") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/insaipack@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: data
      });
      if (!res.ok) throw new Error("Network error");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    className: "contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact-left"
  }, /*#__PURE__*/React.createElement("img", {
    className: "contact-logo",
    src: "img/logo-insai-white.png",
    alt: "INSAI"
  }), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-dark"
  }, "07 / Contact"), /*#__PURE__*/React.createElement(Reveal, {
    as: "h2",
    className: "contact-title"
  }, "Let's get something", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "printed.")), /*#__PURE__*/React.createElement(Reveal, {
    as: "p",
    className: "contact-lead",
    delay: 80
  }, "Tell us about your packaging brief \u2014 size, stock, finishing and quantity. We'll come back with a quote and a sample plan."), /*#__PURE__*/React.createElement(Reveal, {
    className: "contact-details",
    delay: 160
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact-detail"
  }, /*#__PURE__*/React.createElement("span", {
    className: "contact-detail-label"
  }, "Address"), /*#__PURE__*/React.createElement("p", {
    className: "contact-detail-value"
  }, "Jl. Raya Serang Km. 16.8,", /*#__PURE__*/React.createElement("br", null), "Sukamulya, Cikupa,", /*#__PURE__*/React.createElement("br", null), "Tangerang \u2014 Banten 15710,", /*#__PURE__*/React.createElement("br", null), "Indonesia")), /*#__PURE__*/React.createElement("div", {
    className: "contact-detail"
  }, /*#__PURE__*/React.createElement("span", {
    className: "contact-detail-label"
  }, "Telephone"), /*#__PURE__*/React.createElement("p", {
    className: "contact-detail-value"
  }, "(021) 2202 8556", /*#__PURE__*/React.createElement("br", null), "(021) 2202 8544")), /*#__PURE__*/React.createElement("div", {
    className: "contact-detail"
  }, /*#__PURE__*/React.createElement("span", {
    className: "contact-detail-label"
  }, "Email"), /*#__PURE__*/React.createElement("p", {
    className: "contact-detail-value"
  }, /*#__PURE__*/React.createElement("a", {
    href: "mailto:insaipack@gmail.com"
  }, "insaipack@gmail.com"))), /*#__PURE__*/React.createElement("div", {
    className: "contact-detail"
  }, /*#__PURE__*/React.createElement("span", {
    className: "contact-detail-label"
  }, "Hours"), /*#__PURE__*/React.createElement("p", {
    className: "contact-detail-value"
  }, "Mon \u2014 Fri \xB7 08:00\u201317:00 WIB", /*#__PURE__*/React.createElement("br", null), "Sat \xB7 08:00\u201313:00 WIB")))), sent ? /*#__PURE__*/React.createElement("div", {
    className: "contact-thanks"
  }, /*#__PURE__*/React.createElement("span", {
    className: "contact-thanks-check"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "26",
    height: "26",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12.5 10 17.5 19 7",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "contact-thanks-title"
  }, "Thank you \u2014 your request is on its way."), /*#__PURE__*/React.createElement("p", {
    className: "contact-thanks-body"
  }, "We've received your brief and will get back to you with a quote and a sample plan, usually within one business day."), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-outline",
    onClick: () => setStatus("idle")
  }, /*#__PURE__*/React.createElement("span", null, "Send another request"))) : /*#__PURE__*/React.createElement("form", {
    className: "contact-form",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_subject",
    value: "New packaging request \u2014 INSAI website"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_template",
    value: "table"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_captcha",
    value: "false"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "_honey",
    style: {
      display: "none"
    },
    tabIndex: -1,
    autoComplete: "off"
  }), /*#__PURE__*/React.createElement("div", {
    className: "contact-form-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-label"
  }, "Request form \xB7 A-001"), /*#__PURE__*/React.createElement("span", {
    className: "t-label"
  }, new Date().toISOString().slice(0, 10))), /*#__PURE__*/React.createElement("label", {
    className: "field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "field-label"
  }, "Company / Name"), /*#__PURE__*/React.createElement("input", {
    className: "field-input",
    name: "Company / Name",
    type: "text",
    required: true,
    placeholder: "Acme Co."
  })), /*#__PURE__*/React.createElement("label", {
    className: "field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "field-label"
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    className: "field-input",
    name: "Email",
    type: "email",
    required: true,
    placeholder: "you@company.com"
  })), /*#__PURE__*/React.createElement("div", {
    className: "field-row"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "field-label"
  }, "Project type"), /*#__PURE__*/React.createElement("select", {
    className: "field-select",
    name: "Project type",
    defaultValue: ""
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Select\u2026"), /*#__PURE__*/React.createElement("option", null, "Folding carton"), /*#__PURE__*/React.createElement("option", null, "Rigid box"), /*#__PURE__*/React.createElement("option", null, "Mailer / corrugated"), /*#__PURE__*/React.createElement("option", null, "Label / sticker"), /*#__PURE__*/React.createElement("option", null, "Brochure / catalog"), /*#__PURE__*/React.createElement("option", null, "Other"))), /*#__PURE__*/React.createElement("label", {
    className: "field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "field-label"
  }, "Quantity"), /*#__PURE__*/React.createElement("input", {
    className: "field-input",
    name: "Quantity",
    type: "text",
    placeholder: "5,000 pcs"
  }))), /*#__PURE__*/React.createElement("label", {
    className: "field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "field-label"
  }, "Brief"), /*#__PURE__*/React.createElement("textarea", {
    className: "field-textarea",
    name: "Brief",
    rows: "4",
    placeholder: "Size, stock, finishing, deadline\u2026"
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn",
    disabled: status === "sending"
  }, /*#__PURE__*/React.createElement("span", null, status === "sending" ? "Sending…" : "Send request"), status !== "sending" && /*#__PURE__*/React.createElement("span", {
    className: "btn-arrow"
  }, /*#__PURE__*/React.createElement(Arrow, {
    size: 12
  }))), status === "error" && /*#__PURE__*/React.createElement("p", {
    className: "form-error"
  }, "Something went wrong. Please email ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:insaipack@gmail.com"
  }, "insaipack@gmail.com"), " directly."))));
}

// ─── Footer ───────────────────────────────────────────────────────

function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-brand-row"
  }, /*#__PURE__*/React.createElement("img", {
    className: "footer-logo",
    src: "img/logo-insai.png",
    alt: "INSAI"
  })), /*#__PURE__*/React.createElement("p", {
    className: "footer-brand-desc"
  }, "Various Packaging Solution Expert. Established in Tangerang, Indonesia, in the year 2000.")), /*#__PURE__*/React.createElement("div", {
    className: "footer-cols"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("span", {
    className: "footer-col-head"
  }, "\u2014 Explore"), /*#__PURE__*/React.createElement("a", {
    href: "#about"
  }, "About"), /*#__PURE__*/React.createElement("a", {
    href: "#workflow"
  }, "Process"), /*#__PURE__*/React.createElement("a", {
    href: "#capabilities"
  }, "Capabilities"), /*#__PURE__*/React.createElement("a", {
    href: "#products"
  }, "Selected work"), /*#__PURE__*/React.createElement("a", {
    href: "#clients"
  }, "Clients")), /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("span", {
    className: "footer-col-head"
  }, "\u2014 Contact"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:insaipack@gmail.com"
  }, "insaipack@gmail.com"), /*#__PURE__*/React.createElement("a", {
    href: "tel:+62212202855"
  }, "(021) 2202 8556"), /*#__PURE__*/React.createElement("a", {
    href: "#contact"
  }, "Request a quote")), /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("span", {
    className: "footer-col-head"
  }, "\u2014 Location"), /*#__PURE__*/React.createElement("p", null, "Jl. Raya Serang Km. 16.8", /*#__PURE__*/React.createElement("br", null), "Sukamulya, Cikupa", /*#__PURE__*/React.createElement("br", null), "Tangerang \u2014 Banten 15710")))), /*#__PURE__*/React.createElement("div", {
    className: "footer-base"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 ", new Date().getFullYear(), " PT INSAI INDONESIA. ALL RIGHTS RESERVED."), /*#__PURE__*/React.createElement("span", {
    className: "t-label"
  }, "PACKAGING / OFFSET / FINISHING \u2014 EST. 2000"))));
}

// ─── App ──────────────────────────────────────────────────────────

function App() {
  return /*#__PURE__*/React.createElement("div", {
    className: "page"
  }, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement(HistorySection, null), /*#__PURE__*/React.createElement(Workflow, null), /*#__PURE__*/React.createElement(Capabilities, null), /*#__PURE__*/React.createElement(Products, null), /*#__PURE__*/React.createElement(Clients, null), /*#__PURE__*/React.createElement(Contact, null)), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));