/*
  EDIT DATA PROJECT DI SINI.
  Semua 4 kartu tampil dalam satu halaman.
  Ganti href dengan URL project yang asli.
*/
const projects = [
  {
    title: "Zeebooth",
    description: "Photobooth online dengan efek kamera.",
    category: "Camera experience",
    href: "https://example.com/zeebooth",
    icon: "video",
    accent: "#5279b9",
    tint: "#edf3fc"
  },
  {
    title: "Trazel",
    description: "Trading journal dan tools trading.",
    category: "Trading tools",
    href: "https://example.com/trazel",
    icon: "video",
    accent: "#41856a",
    tint: "#eaf5ef"
  },
  {
    title: "Project Website",
    description: "Lihat project website terbaru.",
    category: "Web project",
    href: "https://example.com/project-website",
    icon: "video",
    accent: "#8063b5",
    tint: "#f1edfa"
  },
  {
    title: "Digital Product",
    description: "Jelajahi produk digital yang tersedia.",
    category: "Digital product",
    href: "https://example.com/product",
    icon: "box",
    accent: "#b17a3d",
    tint: "#fbf1e5"
  }
];

const iconMarkup = {
  camera: '<rect x="3" y="7" width="18" height="14" rx="3"></rect><circle cx="12" cy="14" r="3"></circle><path d="M8 7l1.5-3h5L16 7"></path>',
  chart: '<path d="M4 19V5"></path><path d="M4 19h17"></path><path d="m7 15 4-4 3 2 5-6"></path>',
  video: '<rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m10 9 5 3-5 3z"></path><path d="M8 22h8"></path>',
  box: '<path d="m12 3 9 5-9 5-9-5 9-5Z"></path><path d="m3 8 9 5 9-5M3 8v9l9 5 9-5V8M12 13v9"></path>'
};

const list = document.getElementById("link-list");

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function safeHref(value) {
  try {
    const url = new URL(value, window.location.href);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "#";
  } catch {
    return "#";
  }
}

function safeColor(value, fallback) {
  return /^#[0-9a-f]{3,8}$/i.test(value) ? value : fallback;
}

list.innerHTML = projects.slice(0, 4).map((project) => {
  const icon = iconMarkup[project.icon] || iconMarkup.video;
  const accent = safeColor(project.accent, "#777777");
  const tint = safeColor(project.tint, "#f5f5f5");

  return `
    <a class="project-link"
       href="${escapeHTML(safeHref(project.href))}"
       target="_blank"
       rel="noopener noreferrer"
       style="--project-accent:${accent};--project-tint:${tint}">
      <span class="project-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">${icon}</svg>
      </span>
      <span class="project-copy">
        <span class="project-category">${escapeHTML(project.category)}</span>
        <span class="project-title">${escapeHTML(project.title)}</span>
        <span class="project-description">${escapeHTML(project.description)}</span>
      </span>
      <svg class="project-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M7 17 17 7M7 7h10v10"></path>
      </svg>
    </a>`;
}).join("");

document.getElementById("year").textContent = new Date().getFullYear();
