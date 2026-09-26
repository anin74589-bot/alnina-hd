/* ==================================================
   Sena.Hd
   Stage 10: Testing & Polish
   ================================================== */

const PAGE_CONFIG = {
  welcome: { label: "Welcome", wallpaper: "welcome.png" },
  home: { label: "Home", wallpaper: "home.png" },
  popular: { label: "Populer", wallpaper: "popular.png" },
  order: { label: "Urutan", wallpaper: "order.png" },
  special: { label: "Special", wallpaper: "special.png" },
  player: { label: "Player", wallpaper: "player.png" }
};

const NAV_ITEMS = ["home", "popular", "order", "special"];

const ICONS = {
  menu: `<svg class="icon icon--lg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16"></path><path d="M4 12h16"></path><path d="M4 17h16"></path></svg>`,
  close: `<svg class="icon icon--lg" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12"></path><path d="M18 6 6 18"></path></svg>`,
  search: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"></circle><path d="m16 16 4.2 4.2"></path></svg>`,
  arrow: `<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13"></path><path d="m13 6 6 6-6 6"></path></svg>`,
  chevronLeft: `<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg>`,
  chevronRight: `<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>`,
  play: `<svg class="icon icon--lg" viewBox="0 0 24 24" aria-hidden="true" style="fill:currentColor;stroke:none"><path d="m9 6 10 6-10 6Z"></path></svg>`,
  external: `<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M13 5h6v6"></path><path d="m19 5-8 8"></path><path d="M18 14v5H5V6h5"></path></svg>`,
  volume: `<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6l-5 4H4"></path><path d="M16 9.5a4 4 0 0 1 0 5"></path></svg>`,
  fullscreen: `<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H3v5"></path><path d="M16 3h5v5"></path><path d="M21 16v5h-5"></path><path d="M3 16v5h5"></path></svg>`,
  more: `<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"></circle><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"></circle><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"></circle></svg>`,
  popular: `<svg class="icon icon--lg" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 4 2.3 4.7 5.2.8-3.8 3.7.9 5.2-4.6-2.4-4.6 2.4.9-5.2-3.8-3.7 5.2-.8L12 4Z"></path></svg>`,
  order: `<svg class="icon icon--lg" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h2"></path><path d="M10 6h9"></path><path d="M5 12h2"></path><path d="M10 12h9"></path><path d="M5 18h2"></path><path d="M10 18h9"></path></svg>`,
  special: `<svg class="icon icon--lg" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"></path><path d="m18.5 15 .7 2.3L21.5 18l-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z"></path></svg>`,
  list: `<svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h1"></path><path d="M9 6h10"></path><path d="M5 12h1"></path><path d="M9 12h10"></path><path d="M5 18h1"></path><path d="M9 18h10"></path></svg>`,
  miniPlay: `<svg class="icon icon--xs" viewBox="0 0 24 24" aria-hidden="true" style="fill:currentColor;stroke:none"><path d="m9 7 8 5-8 5Z"></path></svg>`
};

let currentPage = "welcome";
let isNavigating = false;
let drawerTouchStartX = null;
let globalButtonAdsBound = false;

/*
  Global advertisement state.
  One cooldown applies to the whole site, not to individual buttons/pages.
*/
const AD_COOLDOWN_MS = 20_000;
const AD_COOLDOWN_KEY = "senaHdAdCooldownUntil";

const storage = {
  get(key) {
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      sessionStorage.setItem(key, value);
    } catch {
      /* Storage can be blocked in privacy-restricted contexts. */
    }
  },
  remove(key) {
    try {
      sessionStorage.removeItem(key);
    } catch {
      /* Storage can be blocked in privacy-restricted contexts. */
    }
  }
};

const playerState = {
  videoId: Number(storage.get("senaHdCurrentVideoId")) || 1,
  visibleCount: 5
};

const adState = {
  cooldownUntil: Number(storage.get(AD_COOLDOWN_KEY)) || 0,
  timer: null
};

/* --------------------------------------------------
   Rotation + collections
   -------------------------------------------------- */

function getDayIndex() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / 86400000);
}

function getGroupedRotationItems(size, daysPerGroup) {
  if (!Array.isArray(videos) || videos.length === 0) return [];

  const groupCount = Math.max(1, Math.ceil(videos.length / size));
  const groupIndex = Math.floor(getDayIndex() / daysPerGroup) % groupCount;
  const start = groupIndex * size;

  return videos.slice(start, start + size);
}

function getWelcomeVideos() {
  return getGroupedRotationItems(
    SITE_CONFIG.welcomeRotation.videosPerDay,
    SITE_CONFIG.welcomeRotation.rotateEveryDays
  );
}

function getHomeVideos() {
  return getGroupedRotationItems(
    SITE_CONFIG.homeRotation.videosPerGroup,
    SITE_CONFIG.homeRotation.rotateEveryDays
  );
}

function getVideosByIds(ids) {
  if (!Array.isArray(ids) || ids.length === 0) return [];
  const idSet = new Set(ids);
  return videos.filter((video) => idSet.has(video.id));
}

function getPopularVideos() {
  const selected = getVideosByIds(COLLECTIONS.popularIds);
  return selected.length ? selected.slice(0, 10) : videos.slice(0, 10);
}

function getSpecialVideos() {
  const selected = getVideosByIds(COLLECTIONS.specialIds);
  return selected.length ? selected.slice(0, 8) : videos.slice(-8);
}

function getVideoThumbnail(video, index = 0) {
  if (video.thumbnail?.trim()) return video.thumbnail;

  const fallback = [
    "welcome.png", "home.png", "popular.png",
    "order.png", "special.png", "player.png"
  ];

  return `assets/wallpapers/${fallback[index % fallback.length]}`;
}

/* --------------------------------------------------
   URL state
   -------------------------------------------------- */

function getPageFromUrl() {
  const raw = window.location.hash.replace("#/", "").replace("#", "").trim();
  return PAGE_CONFIG[raw] ? raw : "welcome";
}

function syncUrl(pageKey, replace = false) {
  const target = pageKey === "welcome" ? "#/" : `#/${pageKey}`;
  if (replace) {
    history.replaceState({ page: pageKey }, "", target);
  } else {
    history.pushState({ page: pageKey }, "", target);
  }
}

/* --------------------------------------------------
   Navigation
   -------------------------------------------------- */

function createDesktopNav() {
  return NAV_ITEMS.map((key) => {
    const page = PAGE_CONFIG[key];
    const activeClass = currentPage === key ? "active" : "";

    return `
      <button class="nav-link ${activeClass}" type="button"
        data-page="${key}"
        aria-current="${currentPage === key ? "page" : "false"}">
        ${page.label}
      </button>
    `;
  }).join("");
}

function createDrawerNav() {
  return NAV_ITEMS.map((key) => {
    const page = PAGE_CONFIG[key];
    const activeClass = currentPage === key ? "is-active" : "";

    return `
      <button class="drawer__link ${activeClass}" type="button" data-page="${key}">
        <span>${page.label}</span>
        ${ICONS.arrow}
      </button>
    `;
  }).join("");
}

/* --------------------------------------------------
   Shared cards
   -------------------------------------------------- */

function createVideoCard(video, index = 0, mode = "watch") {
  const number = String(video.id).padStart(2, "0");
  const duration = video.duration?.trim() || "Video";

  const action = mode === "external"
    ? `
      <button class="video-card__action" type="button"
        data-external="${video.externalUrl?.trim() || ""}"
        ${video.externalUrl?.trim() ? "" : "disabled"}>
        For more ${ICONS.external}
      </button>
    `
    : `
      <button class="video-card__action" type="button" data-open-video="${video.id}">
        Watch ${ICONS.arrow}
      </button>
    `;

  return `
    <article class="video-card reveal reveal--${Math.min(index + 1, 5)}">
      <div class="video-thumb" style="background-image:url('${getVideoThumbnail(video, index)}')">
        <button class="video-play" type="button"
          aria-label="Open ${video.title || "video"}"
          data-open-video="${video.id}">
          ${ICONS.play}
        </button>
        <span class="video-duration">${duration}</span>
      </div>
      <div class="video-card__body">
        <div class="video-card__meta">${number} · ${video.category || "Learning"}</div>
        <h3 class="video-card__title">${video.title || "Untitled Video"}</h3>
        <p class="video-card__meta video-card__description">
          ${video.description?.trim() || "Materi pembelajaran Sena.Hd."}
        </p>
        ${action}
      </div>
    </article>
  `;
}

function createVideoRow(video, index = 0) {
  return `
    <button class="video-row" type="button" data-open-video="${video.id}"
      aria-label="Buka video ${video.title || video.id}">
      <span class="video-row__number">${String(video.id).padStart(2, "0")}</span>
      <span class="video-row__thumb"
        style="background-image:url('${getVideoThumbnail(video, index)}')"
        aria-hidden="true"></span>
      <span class="video-row__content">
        <strong class="video-row__title">${video.title || `Video ${String(video.id).padStart(2, "0")}`}</strong>
        <span class="video-row__meta">
          ${video.category || "Learning"}${video.duration ? ` · ${video.duration}` : ""}
        </span>
      </span>
      <span class="video-row__action" aria-hidden="true">${ICONS.arrow}</span>
    </button>
  `;
}

/* --------------------------------------------------
   Welcome
   -------------------------------------------------- */

function createWelcomeVideoCard(video, index) {
  return `
    <article class="welcome-video-card reveal reveal--${Math.min(index + 1, 5)}">
      <div class="welcome-video-card__media"
        style="background-image:url('${getVideoThumbnail(video, index)}')">
        <div class="welcome-video-card__shade"></div>
        <button class="video-play" type="button"
          aria-label="Preview ${video.title || "video"}"
          data-open-video="${video.id}">
          ${ICONS.play}
        </button>
        <span class="video-duration">${video.duration?.trim() || "Video"}</span>
      </div>

      <div class="welcome-video-card__body">
        <div class="welcome-video-card__eyebrow">
          ${String(video.id).padStart(2, "0")} · ${video.category || "Learning"}
        </div>
        <h3 class="welcome-video-card__title">${video.title || "Untitled Video"}</h3>
        <p class="welcome-video-card__description">
          ${video.description?.trim() || "Materi pembelajaran terstruktur yang bisa kamu buka untuk melanjutkan eksplorasi."}
        </p>
        <button class="video-card__action" type="button"
          data-external="${video.externalUrl?.trim() || ""}"
          ${video.externalUrl?.trim() ? "" : "disabled"}>
          For more ${ICONS.external}
        </button>
      </div>
    </article>
  `;
}

function renderWelcome() {
  const items = getWelcomeVideos();

  return `
    <section class="welcome-hero">
      <div class="welcome-hero__copy">
        <span class="eyebrow reveal">Learn · Grow · Build</span>
        <h1 class="welcome-hero__title reveal reveal--2">
          Mulai perjalanan belajar trading bersama ${SITE_CONFIG.brand}.
        </h1>
        <p class="welcome-hero__description reveal reveal--3">
          Materi disusun secara bertahap agar kamu bisa membangun
          pemahaman dari dasar sampai pembahasan yang lebih dalam.
        </p>
        <div class="welcome-hero__actions reveal reveal--4">
          <button class="btn btn-primary" type="button" data-page="home">
            Next ${ICONS.arrow}
          </button>
        </div>
      </div>
      <div class="welcome-hero__atmosphere" aria-hidden="true">
        <div class="welcome-hero__glass-orb"></div>
        <div class="welcome-hero__light"></div>
      </div>
    </section>

    <section class="welcome-preview section">
      <div class="section-head">
        <div class="section-head__copy">
          <span class="eyebrow">Preview materi hari ini</span>
          <h2 class="section-head__title">Mulai dari sini</h2>
        </div>
        <button class="btn btn-ghost" type="button" data-welcome-visit>
          Visit ${ICONS.external}
        </button>
      </div>

      <div class="welcome-video-track" aria-label="Preview materi">
        ${items.map(createWelcomeVideoCard).join("")}
      </div>
      <p class="welcome-preview__hint">${items.length} materi ditampilkan hari ini.</p>
    </section>
  `;
}

/* --------------------------------------------------
   Home
   -------------------------------------------------- */

function renderHome() {
  const homeVideos = getHomeVideos();

  return `
    <section class="home-hero">
      <div class="home-hero__copy">
        <span class="eyebrow reveal">${SITE_CONFIG.brand} Learning</span>
        <h1 class="home-hero__title reveal reveal--2">
          Belajar dengan alur yang lebih jelas.
        </h1>
        <p class="home-hero__description reveal reveal--3">
          Pilih jalur yang sedang kamu butuhkan atau lanjutkan
          dari materi yang sedang kamu pelajari.
        </p>
      </div>
    </section>

    <section class="section home-shortcuts">
      <div class="section-head">
        <div class="section-head__copy">
          <span class="eyebrow">Shortcut</span>
          <h2 class="section-head__title">Explore</h2>
        </div>
      </div>

      <div class="shortcut-grid">
        <button class="shortcut-card" type="button" data-page="popular">
          <span class="shortcut-icon">${ICONS.popular}</span>
          <span class="shortcut-copy">
            <strong>Populer</strong><span>Materi yang paling sering dibuka</span>
          </span>
          ${ICONS.arrow}
        </button>

        <button class="shortcut-card" type="button" data-page="order">
          <span class="shortcut-icon">${ICONS.order}</span>
          <span class="shortcut-copy">
            <strong>Urutan</strong><span>Ikuti 01 sampai 60 secara bertahap</span>
          </span>
          ${ICONS.arrow}
        </button>

        <button class="shortcut-card" type="button" data-page="special">
          <span class="shortcut-icon">${ICONS.special}</span>
          <span class="shortcut-copy">
            <strong>Special</strong><span>Topik pilihan di luar alur utama</span>
          </span>
          ${ICONS.arrow}
        </button>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <div class="section-head__copy">
          <span class="eyebrow">Recommended</span>
          <h2 class="section-head__title">Untuk kamu</h2>
          <p class="section-head__description">Pilihan yang berubah setiap 4 hari.</p>
        </div>
        <button class="btn btn-ghost" type="button" data-page="order">
          View all ${ICONS.arrow}
        </button>
      </div>

      <div class="video-grid">
        ${homeVideos.map((video, index) => createVideoCard(video, index)).join("")}
      </div>
    </section>
  `;
}

/* --------------------------------------------------
   Popular / Order / Special
   -------------------------------------------------- */

function renderPopular() {
  const items = getPopularVideos();

  return `
    <section class="page-heading section">
      <span class="eyebrow reveal">10 videos</span>
      <h1 class="type-h1 reveal reveal--2">Populer</h1>
      <p class="type-body-light reveal reveal--3">
        Materi pilihan yang bisa kamu buka kapan saja.
      </p>
    </section>

    <section class="section page-content-grid">
      <div class="video-grid video-grid--popular">
        ${items.map((video, index) => createVideoCard(video, index)).join("")}
      </div>
    </section>
  `;
}

function renderOrder() {
  return `
    <section class="page-heading section">
      <span class="eyebrow reveal">Master sequence</span>
      <h1 class="type-h1 reveal reveal--2">Urutan</h1>
      <p class="type-body-light reveal reveal--3">
        Seluruh 60 materi utama dalam satu urutan pembelajaran.
      </p>
    </section>

    <section class="section">
      <div class="video-list">
        ${videos.map((video, index) => createVideoRow(video, index)).join("")}
      </div>
    </section>
  `;
}

function renderSpecial() {
  const items = getSpecialVideos();

  return `
    <section class="page-heading section">
      <span class="eyebrow reveal">8 selected topics</span>
      <h1 class="type-h1 reveal reveal--2">Special</h1>
      <p class="type-body-light reveal reveal--3">
        Topik pilihan di luar alur utama pembelajaran.
      </p>
    </section>

    <section class="section">
      <div class="special-grid">
        ${items.map((video, index) => createVideoCard(video, index)).join("")}
      </div>
    </section>
  `;
}

/* --------------------------------------------------
   Advertisement system
   -------------------------------------------------- */

function getSmartlinkUrl() {
  const primary = SMARTLINK?.primary?.trim() || "";
  const secondary = SMARTLINK?.secondary?.trim() || "";

  return primary || secondary;
}

function isAdReady() {
  return Date.now() >= adState.cooldownUntil;
}

function getAdCooldownRemaining() {
  return Math.max(0, adState.cooldownUntil - Date.now());
}

function syncPlayerAdLayerVisibility() {
  const layer = document.querySelector("#playerAdLayer");
  if (!layer) return;

  const shouldShow = isAdReady() && Boolean(getSmartlinkUrl());
  layer.hidden = !shouldShow;
  layer.setAttribute("aria-hidden", shouldShow ? "false" : "true");
  layer.style.pointerEvents = shouldShow ? "auto" : "none";
  layer.style.visibility = shouldShow ? "visible" : "hidden";
}

function startAdCooldown() {
  adState.cooldownUntil = Date.now() + AD_COOLDOWN_MS;
  storage.set(AD_COOLDOWN_KEY, String(adState.cooldownUntil));
  // Hide the current player ad layer immediately, even when the Smartlink
  // was triggered by another button and the page is not re-rendered.
  syncPlayerAdLayerVisibility();
}

function clearAdCooldownTimer() {
  if (adState.timer) {
    window.clearTimeout(adState.timer);
    adState.timer = null;
  }
}

function scheduleAdCooldownRefresh() {
  clearAdCooldownTimer();

  const remaining = getAdCooldownRemaining();

  if (remaining <= 0) {
    return;
  }

  adState.timer = window.setTimeout(() => {
    adState.cooldownUntil = 0;
    storage.remove(AD_COOLDOWN_KEY);
    renderShell();
    syncPlayerAdLayerVisibility();
  }, remaining);
}

function openSmartlink() {
  const url = getSmartlinkUrl();

  if (!url || !isAdReady()) {
    return false;
  }

  /*
    The action is initiated by a real user click on the clearly-marked
    advertisement layer, so normal popup-blocking rules are respected.
  */
  const opened = window.open(url, "_blank", "noopener,noreferrer");

  if (!opened) {
    return false;
  }

  startAdCooldown();
  scheduleAdCooldownRefresh();
  return true;
}

function getAdLayerMarkup() {
  const ready = isAdReady();
  const urlAvailable = Boolean(getSmartlinkUrl());

  if (!ready || !urlAvailable) {
    return "";
  }

  return `
    <button
      class="player-ad-layer"
      id="playerAdLayer"
      type="button"
      aria-label="Advertisement"
      aria-hidden="false"
    >
      <span class="player-ad-label">Advertisement</span>
    </button>
  `;
}

/* --------------------------------------------------
   Player
   -------------------------------------------------- */

function getCurrentVideo() {
  return videos.find((video) => video.id === playerState.videoId) || videos[0];
}

function getPlayerVisibleItems() {
  // Keep the player navigator compact. It starts at 01–05 and grows only
  // when the user explicitly presses the reveal button.
  return videos.slice(0, Math.min(playerState.visibleCount, videos.length));
}

function createPlayerNumber(video) {
  const activeClass = video.id === playerState.videoId ? "is-active" : "";

  return `
    <button class="pagination__item ${activeClass}"
      type="button"
      data-player-video="${video.id}"
      aria-label="Video ${video.id}"
      aria-current="${video.id === playerState.videoId ? "true" : "false"}">
      ${ICONS.miniPlay}
      <span>${String(video.id).padStart(2, "0")}</span>
    </button>
  `;
}

function renderPlayer() {
  const video = getCurrentVideo();

  if (!video) {
    return `
      <section class="page-heading section">
        <span class="eyebrow">Player</span>
        <h1 class="type-h1">Video tidak ditemukan</h1>
      </section>
    `;
  }

  const hasVideoSource = Boolean(video.videoUrl?.trim());
  const fallbackPoster = getVideoThumbnail(video, video.id - 1);

  return `
    <section class="player-page section">
      <div class="player-wrap">
        <div class="player">
          ${getAdLayerMarkup()}

          ${
            hasVideoSource
              ? `
                <video
                  id="videoElement"
                  class="player__media"
                  src="${video.videoUrl}"
                  poster="${fallbackPoster}"
                  playsinline
                  preload="metadata"
                ></video>
              `
              : `
                <div
                  class="player__media player__media--placeholder"
                  style="background-image:url('${fallbackPoster}')"
                ></div>
              `
          }

          <div class="player__empty ${hasVideoSource ? "is-hidden" : ""}">
            <div class="player__empty-label">VIDEO SOURCE</div>
            <strong>Video ${String(video.id).padStart(2, "0")}</strong>
            <span>URL video belum diisi di data.js</span>
          </div>

          ${
            hasVideoSource
              ? `
                <div class="player__center-control" id="playerCenterPlay">
                  <button class="icon-circle" type="button" aria-label="Play">
                    ${ICONS.play}
                  </button>
                </div>

                <div class="player__controls">
                  <button class="icon-btn player__control-btn" id="playPauseBtn" type="button" aria-label="Play/Pause">
                    ${ICONS.play}
                  </button>

                  <span class="player__time" id="currentTime">0:00</span>

                  <input
                    id="progressRange"
                    class="player__range"
                    type="range"
                    min="0"
                    max="100"
                    value="0"
                    step="0.1"
                    aria-label="Progress video"
                  >

                  <span class="player__time" id="durationTime">0:00</span>

                  <button class="icon-btn player__control-btn" id="muteBtn" type="button" aria-label="Mute">
                    ${ICONS.volume}
                  </button>

                  <button class="icon-btn player__control-btn" id="fullscreenBtn" type="button" aria-label="Fullscreen">
                    ${ICONS.fullscreen}
                  </button>
                </div>
              `
              : ""
          }
        </div>

        <aside class="player-info glass-strong">
          <div class="player-info__label">
            Video ${String(video.id).padStart(2, "0")}
            ${video.category ? ` · ${video.category}` : ""}
          </div>

          <h1 class="player-info__title">
            ${video.title || `Video ${String(video.id).padStart(2, "0")}`}
          </h1>

          <p class="player-info__description">
            ${video.description?.trim() || "Deskripsi video akan muncul di sini setelah data diisi."}
          </p>

          <div class="player-nav-actions">
            <button
              class="btn btn-ghost"
              type="button"
              data-player-prev
              ${video.id <= 1 ? "disabled" : ""}
            >
              ${ICONS.chevronLeft}
              Sebelumnya
            </button>

            <button
              class="btn btn-primary"
              type="button"
              data-player-next
              ${video.id >= videos.length ? "disabled" : ""}
            >
              Berikutnya
              ${ICONS.chevronRight}
            </button>
          </div>
        </aside>
      </div>

      <section class="player-navigation section">
        <div class="section-head">
          <div class="section-head__copy">
            <span class="eyebrow eyebrow--icon">${ICONS.list} Video navigation</span>
            <h2 class="section-head__title">Pilih materi</h2>
            <p class="section-head__description">
              Menampilkan ${getPlayerVisibleItems().length} nomor yang tersedia saat ini.
            </p>
          </div>
        </div>

        <div class="pagination" id="playerPagination">
          ${getPlayerVisibleItems().map(createPlayerNumber).join("")}

          ${
            playerState.visibleCount < videos.length
              ? `
                <button
                  class="pagination__item pagination__more"
                  type="button"
                  data-player-reveal
                  aria-label="Tampilkan nomor berikutnya"
                >${ICONS.more}</button>
              `
              : ""
          }
        </div>
      </section>
    </section>
  `;
}

/* --------------------------------------------------
   Shell
   -------------------------------------------------- */

function createHeader() {
  if (currentPage === "welcome") return "";

  return `
    <header class="nav" id="siteNav">
      <a class="brand" href="#/" data-page="home" aria-label="${SITE_CONFIG.brand} home">
        ${SITE_CONFIG.brand}
      </a>

      <nav class="nav-links" aria-label="Primary navigation">
        ${createDesktopNav()}
      </nav>

      <button class="icon-btn nav-search" type="button" aria-label="Cari" title="Cari">
        ${ICONS.search}
      </button>

      <button
        id="menuBtn"
        class="icon-btn menu-btn"
        type="button"
        aria-label="Buka menu"
        aria-expanded="false"
        aria-controls="mobileDrawer"
      >
        ${ICONS.menu}
      </button>
    </header>
  `;
}

function createDrawer() {
  if (currentPage === "welcome") return "";

  return `
    <aside id="mobileDrawer" class="drawer" aria-hidden="true">
      <div class="drawer__scrim" data-close-drawer></div>

      <div class="drawer__panel" role="dialog" aria-modal="true" aria-label="Menu">
        <div class="drawer__head">
          <span class="drawer__title">MENU</span>
          <button id="closeDrawer" class="icon-btn" type="button" aria-label="Tutup menu">
            ${ICONS.close}
          </button>
        </div>

        <nav class="drawer__links" aria-label="Mobile navigation">
          ${createDrawerNav()}
        </nav>
      </div>
    </aside>
  `;
}

function renderCurrentPage() {
  switch (currentPage) {
    case "home": return renderHome();
    case "popular": return renderPopular();
    case "order": return renderOrder();
    case "special": return renderSpecial();
    case "player": return renderPlayer();
    case "welcome":
    default: return renderWelcome();
  }
}

function renderShell() {
  const page = PAGE_CONFIG[currentPage] ?? PAGE_CONFIG.welcome;

  document.querySelector("#app").innerHTML = `
    <div
      class="wallpaper"
      style="background-image:
        linear-gradient(180deg, rgba(0,0,0,.10), rgba(0,0,0,.46)),
        url('assets/wallpapers/${page.wallpaper}')"
      aria-hidden="true"
    ></div>

    <div class="scrim" aria-hidden="true"></div>

    <div class="page-shell page-enter">
      ${createHeader()}

      <main id="main" class="content" tabindex="-1">
        ${renderCurrentPage()}
      </main>

      <footer class="footer">
        © ${SITE_CONFIG.year} ${SITE_CONFIG.brand}
      </footer>
    </div>

    ${createDrawer()}
  `;

  bindShellEvents();
  bindPlayerEvents();
  updateBodyScrollLock();
}

/* --------------------------------------------------
   Events
   -------------------------------------------------- */

function shouldTriggerButtonAd(button) {
  if (!button || button.disabled) return false;

  // Explicitly excluded from the secondary Smartlink path:
  // navigation, Welcome-page controls, For more, and player prev/next controls.
  if (currentPage === "welcome") return false;
  if (button.closest(".nav, .drawer")) return false;
  if (button.matches("[data-page], [data-external], [data-welcome-visit]")) return false;
  // Player video-number buttons intentionally trigger Smartlink.
  // Other player navigation controls stay excluded.
  if (button.matches("[data-player-reveal], [data-player-prev], [data-player-next]")) return false;
  if (button.matches(".player-ad-layer")) return false;

  return true;
}

function bindGlobalButtonAds() {
  if (globalButtonAdsBound) return;

  globalButtonAdsBound = true;

  // One click can follow two paths: the button's original action and, when
  // the global ad state is ready, a Smartlink opened in a new tab.
  document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!shouldTriggerButtonAd(button)) return;

    openSmartlink();
  }, true);
}

function bindShellEvents() {
  document.querySelectorAll("[data-page]").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      const nextPage = element.dataset.page;

      if (PAGE_CONFIG[nextPage]) navigateTo(nextPage);
    });
  });

  document.querySelectorAll("[data-open-video]").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.stopPropagation();

      const id = Number(element.dataset.openVideo);
      if (Number.isInteger(id)) openPlayer(id);
    });
  });

  document.querySelectorAll("[data-external]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();

      const url = button.dataset.external?.trim();
      if (url) window.open(url, "_blank", "noopener,noreferrer");
    });
  });

  document.querySelector("[data-welcome-visit]")?.addEventListener("click", () => {
    const url = videos.find((video) => video.externalUrl?.trim())?.externalUrl?.trim();

    if (url) window.open(url, "_blank", "noopener,noreferrer");
  });

  const menuButton = document.querySelector("#menuBtn");
  const closeButton = document.querySelector("#closeDrawer");
  const drawer = document.querySelector("#mobileDrawer");

  menuButton?.addEventListener("click", () => setDrawerState(true));
  closeButton?.addEventListener("click", () => setDrawerState(false));
  drawer?.querySelector("[data-close-drawer]")?.addEventListener("click", () => {
    setDrawerState(false);
  });

  bindDrawerSwipe();
  bindGlobalButtonAds();
}

function bindDrawerSwipe() {
  const drawerPanel = document.querySelector(".drawer__panel");
  if (!drawerPanel) return;

  drawerPanel.addEventListener("touchstart", (event) => {
    drawerTouchStartX = event.touches[0]?.clientX ?? null;
  }, { passive: true });

  drawerPanel.addEventListener("touchend", (event) => {
    if (drawerTouchStartX === null) return;

    const endX = event.changedTouches[0]?.clientX ?? drawerTouchStartX;
    const deltaX = endX - drawerTouchStartX;

    if (deltaX > 60) setDrawerState(false);
    drawerTouchStartX = null;
  }, { passive: true });
}

function setDrawerState(isOpen) {
  const drawer = document.querySelector("#mobileDrawer");
  const menuButton = document.querySelector("#menuBtn");

  if (!drawer || !menuButton) return;

  drawer.classList.toggle("is-open", isOpen);
  drawer.setAttribute("aria-hidden", String(!isOpen));
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.innerHTML = isOpen ? ICONS.close : ICONS.menu;

  updateBodyScrollLock();
}

function updateBodyScrollLock() {
  const drawer = document.querySelector("#mobileDrawer");
  document.body.style.overflow = drawer?.classList.contains("is-open") ? "hidden" : "";
}

/* --------------------------------------------------
   Player events
   -------------------------------------------------- */

function updatePlayerState(videoId) {
  const numericId = Number(videoId);

  if (!Number.isInteger(numericId) || numericId < 1 || numericId > videos.length) {
    return;
  }

  playerState.videoId = numericId;
  storage.set("senaHdCurrentVideoId", String(numericId));

  renderShell();
  window.scrollTo({ top: 0, behavior: "instant" });
}

function openPlayer(videoId) {
  const video = videos.find((item) => item.id === Number(videoId));
  if (!video) return;

  playerState.videoId = video.id;
  playerState.visibleCount = 5;
  storage.set("senaHdCurrentVideoId", String(video.id));
  navigateTo("player");
}

function bindPlayerEvents() {
  if (currentPage !== "player") return;

  scheduleAdCooldownRefresh();

  document.querySelector("#playerAdLayer")?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const opened = openSmartlink();

    if (opened) {
      renderShell();
    }
  });

  document.querySelectorAll("[data-player-video]").forEach((button) => {
    button.addEventListener("click", () => {
      updatePlayerState(button.dataset.playerVideo);
    });
  });

  document.querySelector("[data-player-reveal]")?.addEventListener("click", () => {
    playerState.visibleCount = Math.min(videos.length, playerState.visibleCount + 1);
    renderShell();
  });

  document.querySelector("[data-player-prev]")?.addEventListener("click", () => {
    if (playerState.videoId > 1) updatePlayerState(playerState.videoId - 1);
  });

  document.querySelector("[data-player-next]")?.addEventListener("click", () => {
    if (playerState.videoId < videos.length) updatePlayerState(playerState.videoId + 1);
  });

  const video = document.querySelector("#videoElement");
  if (!video) return;

  const playButton = document.querySelector("#playPauseBtn");
  const centerButton = document.querySelector("#playerCenterPlay");
  const progress = document.querySelector("#progressRange");
  const currentTime = document.querySelector("#currentTime");
  const durationTime = document.querySelector("#durationTime");
  const muteButton = document.querySelector("#muteBtn");
  const fullscreenButton = document.querySelector("#fullscreenBtn");

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const syncPlayButton = () => {
    if (video.paused) {
      playButton.innerHTML = ICONS.play;
      centerButton.hidden = false;
    } else {
      playButton.innerHTML = `
        <svg class="icon icon--lg" viewBox="0 0 24 24" aria-hidden="true" style="fill:currentColor;stroke:none">
          <path d="M8 6h3v12H8z"></path>
          <path d="M13 6h3v12h-3z"></path>
        </svg>
      `;
      centerButton.hidden = true;
    }
  };

  const togglePlay = () => {
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  playButton?.addEventListener("click", togglePlay);
  centerButton?.addEventListener("click", togglePlay);

  video.addEventListener("loadedmetadata", () => {
    durationTime.textContent = formatTime(video.duration);
    progress.max = String(video.duration || 100);
  });

  video.addEventListener("timeupdate", () => {
    currentTime.textContent = formatTime(video.currentTime);
    progress.value = String(video.currentTime || 0);
  });

  video.addEventListener("play", syncPlayButton);
  video.addEventListener("pause", syncPlayButton);
  video.addEventListener("ended", () => {
    syncPlayButton();
  });

  progress?.addEventListener("input", () => {
    video.currentTime = Number(progress.value);
  });

  muteButton?.addEventListener("click", () => {
    video.muted = !video.muted;
    muteButton.setAttribute("aria-label", video.muted ? "Unmute" : "Mute");
  });

  fullscreenButton?.addEventListener("click", async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }

      await video.requestFullscreen?.();
    } catch {
      /* Fullscreen availability differs across browsers. */
    }
  });

  syncPlayButton();
}

/* --------------------------------------------------
   Navigation API
   -------------------------------------------------- */

async function navigateTo(pageKey, options = {}) {
  if (!PAGE_CONFIG[pageKey] || (isNavigating && !options.fromPopState)) {
    return;
  }

  if (pageKey === currentPage && !options.force) {
    setDrawerState(false);
    return;
  }

  isNavigating = true;
  setDrawerState(false);

  const shell = document.querySelector(".page-shell");

  if (shell && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    shell.classList.remove("page-enter");
    shell.classList.add("page-leave");
    await new Promise((resolve) => window.setTimeout(resolve, 160));
  }

  currentPage = pageKey;

  if (!options.fromPopState) {
    syncUrl(pageKey);
  }

  window.scrollTo({ top: 0, behavior: "instant" });
  renderShell();

  window.setTimeout(() => {
    document.querySelector("#main")?.focus({ preventScroll: true });
    isNavigating = false;
  }, 30);
}

window.addEventListener("popstate", () => {
  const nextPage = getPageFromUrl();
  if (nextPage !== currentPage) navigateTo(nextPage, { fromPopState: true });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) setDrawerState(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setDrawerState(false);
});

document.addEventListener("DOMContentLoaded", () => {
  scheduleAdCooldownRefresh();
  currentPage = getPageFromUrl();

  const storedVideoId = Number(storage.get("senaHdCurrentVideoId"));
  if (Number.isInteger(storedVideoId) && storedVideoId >= 1 && storedVideoId <= videos.length) {
    playerState.videoId = storedVideoId;
  }

  syncUrl(currentPage, true);
  renderShell();
});
