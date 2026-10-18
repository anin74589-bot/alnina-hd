/* screamu.HD: master video data + website logic + SmartLink settings.
   Edit VIDEO_CONFIG.smartlinkUrl, VIDEO_CONFIG.websiteUrl, and each video's file/thumbnail below. */
const VIDEO_CONFIG = {
  smartlinkUrl: "PASTE_YOUR_SINGLE_SMARTLINK_URL_HERE",
  websiteUrl: "YOUR_WEBSITE_URL_HERE",
  smartlinkCooldownMs: 20000
};

const VIDEOS = [
  { id: 1, title: "Video 01", file: "GITHUB_VIDEO_URL_01", thumbnail: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80" },
  { id: 2, title: "Video 02", file: "GITHUB_VIDEO_URL_02", thumbnail: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80" },
  { id: 3, title: "Video 03", file: "GITHUB_VIDEO_URL_03", thumbnail: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80" },
  { id: 4, title: "Video 04", file: "GITHUB_VIDEO_URL_04", thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80" },
  { id: 5, title: "Video 05", file: "GITHUB_VIDEO_URL_05", thumbnail: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=80" },
  { id: 6, title: "Video 06", file: "GITHUB_VIDEO_URL_06", thumbnail: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=900&q=80" },
  { id: 7, title: "Video 07", file: "GITHUB_VIDEO_URL_07", thumbnail: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=900&q=80" },
  { id: 8, title: "Video 08", file: "GITHUB_VIDEO_URL_08", thumbnail: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80" },
  { id: 9, title: "Video 09", file: "GITHUB_VIDEO_URL_09", thumbnail: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80" },
  { id: 10, title: "Video 10", file: "GITHUB_VIDEO_URL_10", thumbnail: "https://images.unsplash.com/photo-1500534623283-312a5e9b0b15?auto=format&fit=crop&w=900&q=80" },
  { id: 11, title: "Video 11", file: "GITHUB_VIDEO_URL_11", thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80" },
  { id: 12, title: "Video 12", file: "GITHUB_VIDEO_URL_12", thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80" },
  { id: 13, title: "Video 13", file: "GITHUB_VIDEO_URL_13", thumbnail: "https://images.unsplash.com/photo-1475924985062-1ee750f8e3c8?auto=format&fit=crop&w=900&q=80" },
  { id: 14, title: "Video 14", file: "GITHUB_VIDEO_URL_14", thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80" },
  { id: 15, title: "Video 15", file: "GITHUB_VIDEO_URL_15", thumbnail: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80" },
  { id: 16, title: "Video 16", file: "GITHUB_VIDEO_URL_16", thumbnail: "https://images.unsplash.com/photo-1500534314209-a25dobd2e4a3?auto=format&fit=crop&w=900&q=80" },
  { id: 17, title: "Video 17", file: "GITHUB_VIDEO_URL_17", thumbnail: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=900&q=80" },
  { id: 18, title: "Video 18", file: "GITHUB_VIDEO_URL_18", thumbnail: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80" },
  { id: 19, title: "Video 19", file: "GITHUB_VIDEO_URL_19", thumbnail: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80" },
  { id: 20, title: "Video 20", file: "GITHUB_VIDEO_URL_20", thumbnail: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80" }
];

(() => {
  "use strict";
  const ROTATION_START_DATE = "2026-09-17";
  const TRAILER_PREVIEW_SECONDS = 30;
  const POPULAR_IDS = [1, 3, 5, 8, 12];
  const SPECIAL_IDS = [2, 4, 7];
  const storageKey = "cmine_flex_smartlink_last_opened";
  const views = [...document.querySelectorAll("[data-section]")];
  const mainHeader = document.getElementById("mainHeader");
  const playerHeader = document.getElementById("playerHeader");
  const catalogApp = document.getElementById("catalogApp");
  const playerApp = document.getElementById("playerApp");
  const homePlayer = document.getElementById("homePlayer");
  const homePlayerSource = document.getElementById("homePlayerSource");
  const mainPlayer = document.getElementById("mainPlayer");
  const mainPlayerSource = document.getElementById("mainPlayerSource");
  const playerTitle = document.getElementById("playerTitle");
  const playerSubtitle = document.getElementById("playerSubtitle");
  const playerNumber = document.getElementById("playerNumber");
  const playerEmpty = document.getElementById("playerEmpty");
  const numberScroll = document.getElementById("numberScroll");
  let trailerPreviewStopped = false;
  let currentId = 1;
  let shuffledIds = [];

  function getDayIndex() {
    const start = new Date(`${ROTATION_START_DATE}T00:00:00Z`);
    const now = new Date();
    const utcToday = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    return Math.max(0, Math.floor((utcToday - start.getTime()) / 86400000));
  }
  function hasVideoUrl(video) {
    return Boolean(video && video.file && !/^GITHUB_VIDEO_URL_/i.test(video.file) && !/^PASTE_/i.test(video.file));
  }
  function validSmartLink() {
    const url = VIDEO_CONFIG.smartlinkUrl;
    return Boolean(url && /^https?:\/\//i.test(url) && !url.includes("PASTE_YOUR_SINGLE"));
  }

  /* Tries SmartLink in a new tab when the site first opens and on eligible buttons.
     Browsers may block a popup that was not directly caused by a user gesture. If blocked,
     cooldown is not consumed, so the next real button click can try again. */
  function runSmartLinkGate() {
    if (!validSmartLink()) return false;
    const now = Date.now();
    let last = 0;
    try { last = Number(localStorage.getItem(storageKey) || 0); } catch (_) {}
    if (now - last < VIDEO_CONFIG.smartlinkCooldownMs) return false;
    let popup = null;
    try { popup = window.open(VIDEO_CONFIG.smartlinkUrl, "_blank"); } catch (_) {}
    if (!popup) {
      console.info("SmartLink popup was blocked by the browser; the website action will continue.");
      return false;
    }
    try { popup.opener = null; } catch (_) {}
    try { localStorage.setItem(storageKey, String(now)); } catch (_) {}
    return true;
  }

  function escapeHtml(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  }
  function renderCard(video) {
    return `<article class="video-card">
      <img class="video-card__thumb" src="${escapeHtml(video.thumbnail || "")}" alt="Thumbnail ${escapeHtml(video.title)}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=80'">
      <div class="video-card__content">
        <span class="video-card__meta">VIDEO ${String(video.id).padStart(2, "0")}</span>
        <h3 class="video-card__title">${escapeHtml(video.title)}</h3>
        <div class="video-card__sub">screamu.HD collection</div>
        <button class="video-card__button js-watch" type="button" data-video-id="${video.id}"><span>Tonton</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg></button>
      </div>
    </article>`;
  }
  function getHomeVideos() {
    const groups = Math.ceil(VIDEOS.length / 5);
    const group = Math.floor(getDayIndex() / 4) % groups;
    return VIDEOS.slice(group * 5, group * 5 + 5);
  }
  function renderLists() {
    document.getElementById("homeRecommendationList").innerHTML = getHomeVideos().map(renderCard).join("");
    document.getElementById("popularList").innerHTML = POPULAR_IDS.map(id => VIDEOS.find(v => v.id === id)).filter(Boolean).map(renderCard).join("");
    document.getElementById("orderList").innerHTML = VIDEOS.map(renderCard).join("");
    document.getElementById("specialList").innerHTML = SPECIAL_IDS.map(id => VIDEOS.find(v => v.id === id)).filter(Boolean).map(renderCard).join("");
  }
  function showSection(name) {
    const target = ["home", "populer", "urutan", "special"].includes(name) ? name : "home";
    views.forEach(section => {
      const active = section.dataset.section === target;
      section.hidden = !active;
      section.classList.toggle("is-active", active);
    });
    document.querySelectorAll(".nav__item").forEach(button => button.classList.toggle("is-active", button.dataset.view === target));
    history.replaceState(null, "", `#${target}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function loadDailyTrailer() {
    if (!VIDEOS.length || !homePlayer) return;
    const dailyVideo = VIDEOS[getDayIndex() % VIDEOS.length];
    homePlayer.pause();
    homePlayer.currentTime = 0;
    trailerPreviewStopped = false;
    homePlayer.poster = dailyVideo.thumbnail || "";
    if (!hasVideoUrl(dailyVideo)) {
      homePlayerSource.removeAttribute("src");
      homePlayer.removeAttribute("src");
      homePlayer.load();
      return;
    }
    homePlayerSource.src = dailyVideo.file;
    homePlayer.load();
  }

  function seededRandom(seed) {
    let state = seed >>> 0;
    return function () {
      state += 0x6D2B79F5;
      let value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }
  function createDailyOrder() {
    const ids = VIDEOS.map(video => video.id);
    const random = seededRandom(0xC0F1E + getDayIndex());
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    return ids;
  }
  function getRequestedId() {
    const id = Number(new URLSearchParams(location.search).get("id"));
    return Number.isInteger(id) && id >= 1 && id <= VIDEOS.length ? id : 1;
  }
  function updateActiveNumber() {
    numberScroll.querySelectorAll(".number-button").forEach(button => {
      const active = Number(button.dataset.id) === currentId;
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
  }
  function renderNumbers() {
    numberScroll.innerHTML = "";
    shuffledIds.forEach(id => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "number-button";
      button.dataset.id = String(id);
      button.textContent = String(id);
      button.setAttribute("aria-label", `Putar video nomor ${id}`);
      button.addEventListener("click", () => loadVideo(id));
      numberScroll.appendChild(button);
    });
    updateActiveNumber();
  }
  function loadVideo(id, updateUrl = true) {
    const video = VIDEOS.find(item => item.id === id) || VIDEOS[0];
    if (!video) return;
    currentId = video.id;
    playerTitle.textContent = video.title;
    playerNumber.textContent = `#${String(video.id).padStart(2, "0")}`;
    playerSubtitle.textContent = `Video ${video.id} dari ${VIDEOS.length} · urutan navigasi diacak harian`;
    mainPlayer.pause();
    mainPlayer.poster = video.thumbnail || "";
    if (hasVideoUrl(video)) {
      mainPlayerSource.src = video.file;
      mainPlayerSource.hidden = false;
      mainPlayer.load();
      playerEmpty.classList.remove("is-hidden");
      playerEmpty.querySelector("strong").textContent = "Memuat video...";
      playerEmpty.querySelector("span").textContent = "Video sedang disiapkan.";
    } else {
      mainPlayerSource.removeAttribute("src");
      mainPlayer.removeAttribute("src");
      mainPlayer.load();
      playerEmpty.classList.remove("is-hidden");
      playerEmpty.querySelector("strong").textContent = "Video belum tersedia";
      playerEmpty.querySelector("span").textContent = `Isi URL video ${String(video.id).padStart(2, "0")} di video.js.`;
    }
    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set("id", video.id);
      history.replaceState({ id: video.id }, "", url);
    }
    updateActiveNumber();
    numberScroll.querySelector(`[data-id="${video.id}"]`)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }
  function activatePlayerRoute() {
    mainHeader.hidden = true;
    catalogApp.hidden = true;
    playerHeader.hidden = false;
    playerApp.hidden = false;
    document.title = "screamu.HD · Player";
    shuffledIds = createDailyOrder();
    renderNumbers();
    loadVideo(getRequestedId(), false);
  }
  function activateCatalogRoute() {
    mainHeader.hidden = false;
    catalogApp.hidden = false;
    playerHeader.hidden = true;
    playerApp.hidden = true;
    document.title = "screamu.HD";
    renderLists();
    const hash = location.hash.replace("#", "");
    showSection(hash || "home");
    loadDailyTrailer();
  }

  // Navigation controls are explicitly exempt. Every other HTML button outside a real
  // video-player area attempts SmartLink, while its normal website action continues.
  document.addEventListener("click", event => {
    const navButton = event.target.closest(".nav__item");
    if (navButton) {
      showSection(navButton.dataset.view);
      return;
    }
    const button = event.target.closest("button");
    if (!button) return;
    if (button.closest(".player-area")) return;
    runSmartLinkGate();
    const watch = button.closest(".js-watch");
    if (watch) {
      const id = Number(watch.dataset.videoId);
      window.location.href = `index.html?id=${id}`;
    }
  });

  if (homePlayer) {
    homePlayer.addEventListener("timeupdate", () => {
      if (!trailerPreviewStopped && homePlayer.currentTime >= TRAILER_PREVIEW_SECONDS) {
        trailerPreviewStopped = true;
        homePlayer.pause();
        homePlayer.currentTime = TRAILER_PREVIEW_SECONDS;
      }
    });
  }
  if (mainPlayer) {
    mainPlayer.addEventListener("loadeddata", () => playerEmpty.classList.add("is-hidden"));
    mainPlayer.addEventListener("error", () => {
      playerEmpty.classList.remove("is-hidden");
      playerEmpty.querySelector("strong").textContent = "Video belum bisa diputar";
      playerEmpty.querySelector("span").textContent = "Periksa URL video di video.js.";
    });
    window.addEventListener("keydown", event => {
      if (playerApp.hidden || event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      const index = shuffledIds.indexOf(currentId);
      if (event.key === "ArrowRight") loadVideo(shuffledIds[(index + 1) % shuffledIds.length]);
      if (event.key === "ArrowLeft") loadVideo(shuffledIds[(index - 1 + shuffledIds.length) % shuffledIds.length]);
    });
  }

  // Initial-load attempt. If the browser blocks the popup, the page remains usable,
  // and no cooldown is recorded until a popup is successfully opened from a later action.
  if (new URLSearchParams(location.search).has("id")) activatePlayerRoute();
  else activateCatalogRoute();
  runSmartLinkGate();
})();
