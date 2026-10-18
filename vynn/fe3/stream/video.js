/* screamu.HD: master video data + website logic + SmartLink settings.
   Edit VIDEO_CONFIG.smartlinkUrl, VIDEO_CONFIG.websiteUrl, and each video's file/thumbnail below. */
const VIDEO_CONFIG = {
  smartlinkUrl: "PASTE_YOUR_SINGLE_SMARTLINK_URL_HERE",
  websiteUrl: "YOUR_WEBSITE_URL_HERE",
  smartlinkCooldownMs: 20000
};

const VIDEOS = [
  { id: 1, title: "Video 01", file: "https://vizzapp.my.id/assets/snapsave-app_DdrK6oyBxxK.mp4", thumbnail: "https://vizzapp.my.id/assets/thumbnile/IMG_20261017_202910.jpg" },
  { id: 2, title: "Video 02", file: "https://vizzapp.my.id/assets/snapsave-app_DdmJbvltN18.mp4", thumbnail: "https://vizzapp.my.id/assets/thumbnile/IMG_20261017_203005.jpg" },
  { id: 3, title: "Video 03", file: "https://vizzapp.my.id/assets/snapsave-app_DcwDUcuJW3i.mp4", thumbnail: "https://vizzapp.my.id/assets/thumbnile/IMG_20261017_203032.jpg" },
  { id: 4, title: "Video 04", file: "https://vizzapp.my.id/assets/snapsave-app_DctoYS-hDUT.mp4", thumbnail: "https://vizzapp.my.id/assets/thumbnile/IMG_20261017_203149.jpg" },
  { id: 5, title: "Video 05", file: "https://vizzapp.my.id/assets/snapsave-app_Dcq0wiwpGHL.mp4", thumbnail: "https://vizzapp.my.id/assets/thumbnile/IMG_20261017_203236.jpg" },
  { id: 6, title: "Video 06", file: "https://vizzapp.my.id/assets/snapsave-app_DcbLvMSgQ4u.mp4", thumbnail: "https://vizzapp.my.id/assets/thumbnile/IMG_20261017_203328.jpg" },
  { id: 7, title: "Video 07", file: "https://vizzapp.my.id/assets/snapsave-app_DcUIgFoMkVI.mp4", thumbnail: "https://vizzapp.my.id/assets/thumbnile/IMG_20261017_203414.jpg" },
  { id: 8, title: "Video 08", file: "https://vizzapp.my.id/assets/snapsave-app_DcOmfHDJtqu.mp4", thumbnail: "https://vizzapp.my.id/assets/thumbnile/IMG_20261017_203530.jpg" },
  { id: 9, title: "Video 09", file: "https://vizzapp.my.id/assets/snapsave-app_DcK4U1ES5uI.mp4", thumbnail: "https://vizzapp.my.id/assets/thumbnile/IMG_20261017_203559.jpg" },
  { id: 10, title: "Video 10", file: "https://vizzapp.my.id/assets/snapsave-app_DcCC7ilMd6i.mp4", thumbnail: "https://vizzapp.my.id/assets/thumbnile/IMG_20261017_203703.jpg" },
  { id: 11, title: "Video 11", file: "https://vizzapp.my.id/assets/VID-20260925-WA0003.mp4", thumbnail: "https://vizzapp.my.id/assets/thumbnile/IMG_20261017_204618.jpg" },
  { id: 12, title: "Video 12", file: "https://vizzapp.my.id/assets/VID-20260925-WA0001.mp4", thumbnail: "https://vizzapp.my.id/assets/thumbnile/IMG_20261017_204407.jpg" },
  { id: 13, title: "Video 13", file: "https://vizzapp.my.id/assets/VID-20260919-WA0046.mp4", thumbnail: "https://vizzapp.my.id/assets/thumbnile/IMG_20261017_204244.jpg" },
  { id: 14, title: "Video 14", file: "https://vizzapp.my.id/assets/VID-20260919-WA0045.mp4", thumbnail: "https://vizzapp.my.id/assets/thumbnile/IMG_20261017_204228.jpg" },
  { id: 15, title: "Video 15", file: "https://vizzapp.my.id/assets/VID-20260919-WA0044.mp4", thumbnail: "https://vizzapp.my.id/assets/thumbnile/IMG_20261017_204216.jpg" },
  { id: 16, title: "Video 16", file: "https://vizzapp.my.id/assets/VID-20260908-WA0036.mp4", thumbnail: "https://vizzapp.my.id/assets/thumbnile/IMG_20261017_204041.jpg" },
  { id: 17, title: "Video 17", file: "https://vizzapp.my.id/assets/VID-20260908-WA0035.mp4", thumbnail: "https://vizzapp.my.id/assets/thumbnile/IMG_20261017_203953.jpg" },
  { id: 18, title: "Video 18", file: "https://vizzapp.my.id/assets/VID-20260908-WA0034.mp4", thumbnail: "https://vizzapp.my.id/assets/thumbnile/IMG_20261017_203923.jpg" },
  { id: 19, title: "Video 19", file: "https://vizzapp.my.id/assets/VID-20260908-WA0006.mp4", thumbnail: "https://vizzapp.my.id/assets/thumbnile/IMG_20261017_203838.jpg" },
  { id: 20, title: "Video 20", file: "https://vizzapp.my.id/assets/VID-20260908-WA0005.mp4", thumbnail: "https://vizzapp.my.id/assets/thumbnile/IMG_20261017_203722.jpg" }
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
