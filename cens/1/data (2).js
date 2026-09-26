/* ==================================================
   Sena.Hd
   Stage 6: Master Video Data
   ================================================== */

/*
  DATA FLOW

  videos
    ↓
  Welcome  →  5 videos/day
  Home     →  5 videos/4-day rotation
  Populer  →  10 selected video IDs
  Urutan   →  all 60 videos
  Special  →  8 selected video IDs
  Player   →  current video from the same master data

  Notes:
  - Keep IDs 1–60 fixed once content is published.
  - videoUrl = actual video source.
  - thumbnail = optional custom thumbnail.
    Leave empty to let the player system use the video's first frame later.
  - externalUrl = destination for the "For more" button.
*/

/* --------------------------------------------------
   Site settings
   -------------------------------------------------- */

const SITE_CONFIG = {
  brand: "Sena.Hd",
  year: 2026,
  videoCount: 60,

  welcomeRotation: {
    videosPerDay: 5,
    rotateEveryDays: 1
  },

  homeRotation: {
    videosPerGroup: 5,
    rotateEveryDays: 4
  }
};

/* --------------------------------------------------
   Smartlink slots
   Global ad system uses this data later.
   -------------------------------------------------- */

const SMARTLINK = {
  primary: "https://ignoringexcepting.com/tirmtkpyi?key=f05059565202e05f940b6a84b893c584",
  secondary: ""
};

/* --------------------------------------------------
   Collection slots
   Fill these IDs when the final content selection is ready.
   -------------------------------------------------- */

const COLLECTIONS = {
  popularIds: [],
  specialIds: []
};

/* --------------------------------------------------
   Master video catalog
   Exactly 60 video slots.
   -------------------------------------------------- */

const videos = [
  {
    "id": 1,
    "title": "Video 01",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_3929832062802743243_32065927994.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 2,
    "title": "Video 02",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_3932799562368548451_73571012491.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 3,
    "title": "Video 03",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_3937497015402783382_29049349278.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 4,
    "title": "Video 04",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_3939736540233517218_20184157797.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 5,
    "title": "Video 05",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_3945842877243005576_8526193738.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 6,
    "title": "Video 06",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_3954490849470794343_56728275502.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 7,
    "title": "Video 07",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_3963877666104276145_56728275502.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 8,
    "title": "Video 08",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_3967298434998349875_39227111108.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 9,
    "title": "Video 09",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_3976474671644583218_22032803390.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 10,
    "title": "Video 10",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_3976626930774311111_59250746868.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 11,
    "title": "Video 11",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DY84nXzTgia.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 12,
    "title": "Video 12",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DZNw8AkTdxw.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 13,
    "title": "Video 13",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DZVb9IGypqO.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 14,
    "title": "Video 14",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DZvLKGIzvf4.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 15,
    "title": "Video 15",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_Da3TFJtu9w6.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 16,
    "title": "Video 16",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_Db-fj1Mt-a0.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 17,
    "title": "Video 17",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_Dbdb5zSST3e.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 18,
    "title": "Video 18",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DbhgN8Bvoty.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 19,
    "title": "Video 19",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_Dc08rn1hjWF.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 20,
    "title": "Video 20",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DcCC7ilMd6i.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 21,
    "title": "Video 21",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DcK4U1ES5ul.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 22,
    "title": "Video 22",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DcOmfHDJtqu.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 23,
    "title": "Video 23",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DcuIgFoMkVI.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 24,
    "title": "Video 24",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DcbLvMSgQ4u.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 25,
    "title": "Video 25",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_Dclr40eTvyJ.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 26,
    "title": "Video 26",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DcodVBazfip.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 27,
    "title": "Video 27",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_Dcq0wiwpGHL.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 28,
    "title": "Video 28",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DctoYS-hDUT.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 29,
    "title": "Video 29",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DcwDUcuJW3i.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 30,
    "title": "Video 30",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DdmJbvltN18.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 31,
    "title": "Video 31",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DdrK6oyBxxK.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 32,
    "title": "Video 32",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260825-WA0007.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 33,
    "title": "Video 33",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260825-WA0008.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 34,
    "title": "Video 34",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260825-WA0009.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 35,
    "title": "Video 35",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260826-WA0001.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 36,
    "title": "Video 36",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260826-WA0002~2.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 37,
    "title": "Video 37",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260907-WA0017.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 38,
    "title": "Video 38",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260907-WA0019.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 39,
    "title": "Video 39",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260907-WA0022.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 40,
    "title": "Video 40",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260907-WA0025.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 41,
    "title": "Video 41",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260907-WA0026.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 42,
    "title": "Video 42",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260907-WA0029.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 43,
    "title": "Video 43",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260907-WA0030.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 44,
    "title": "Video 44",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260908-WA0001.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 45,
    "title": "Video 45",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260908-WA0002.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 46,
    "title": "Video 46",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260908-WA0003.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 47,
    "title": "Video 47",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260908-WA0004.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 48,
    "title": "Video 48",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260908-WA0005.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 49,
    "title": "Video 49",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260908-WA0006.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 50,
    "title": "Video 50",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260908-WA0034.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 51,
    "title": "Video 51",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260908-WA0035.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 52,
    "title": "Video 52",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260908-WA0036.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 53,
    "title": "Video 53",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260908-WA0037.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 54,
    "title": "Video 54",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260908-WA0038.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 55,
    "title": "Video 55",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260919-WA0042.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 56,
    "title": "Video 56",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260919-WA0043.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 57,
    "title": "Video 57",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260919-WA0044.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 58,
    "title": "Video 58",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260919-WA0045.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 59,
    "title": "Video 59",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260919-WA0046.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 60,
    "title": "Video 60",
    "category": "",
    "description": "",
    "duration": "",
    "videoUrl": "../assets/VID-20260925-WA0001.mp4",
    "thumbnail": "",
    "externalUrl": ""
  }
];

/* --------------------------------------------------
   Optional data validation
   Keeps mistakes visible during development.
   -------------------------------------------------- */

(() => {
  const ids = videos.map((video) => video.id);
  const uniqueIds = new Set(ids);

  if (videos.length !== SITE_CONFIG.videoCount) {
    console.warn(
      `Sena.Hd: expected ${SITE_CONFIG.videoCount} videos, found ${videos.length}.`
    );
  }

  if (uniqueIds.size !== ids.length) {
    console.warn("Sena.Hd: duplicate video IDs detected.");
  }

  for (let id = 1; id <= SITE_CONFIG.videoCount; id++) {
    if (!uniqueIds.has(id)) {
      console.warn(`Sena.Hd: missing video ID ${id}.`);
    }
  }

  for (const id of COLLECTIONS.popularIds) {
    if (!uniqueIds.has(id)) {
      console.warn(`Sena.Hd: popularIds contains unknown video ID ${id}.`);
    }
  }

  for (const id of COLLECTIONS.specialIds) {
    if (!uniqueIds.has(id)) {
      console.warn(`Sena.Hd: specialIds contains unknown video ID ${id}.`);
    }
  }
})();
