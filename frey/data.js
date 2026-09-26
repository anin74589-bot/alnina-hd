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
    "title": "Untukmu, yang Diam-Diam Kucintai",
    "category": "",
    "description": "Ada perasaan yang tak banyak bicara, tetapi selalu tahu jalan pulang kepadamu.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_3929832062802743243_32065927994.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 2,
    "title": "Namamu di Antara Doaku",
    "category": "",
    "description": "Di antara banyak harapan, entah kenapa namamu selalu menemukan tempat paling tenang.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_3932799562368548451_73571012491.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 3,
    "title": "Satu Tatap yang Tertinggal",
    "category": "",
    "description": "Tatapanmu mungkin singkat, tetapi jejaknya tinggal lebih lama daripada yang kuduga.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_3937497015402783382_29049349278.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 4,
    "title": "Jika Rindu Punya Suara",
    "category": "",
    "description": "Mungkin malam akan penuh bisikan, karena ada namamu yang terus dipanggil oleh rindu.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_3939736540233517218_20184157797.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 5,
    "title": "Kita dan Langit yang Sama",
    "category": "",
    "description": "Sejauh apa pun langkah kita, masih ada langit yang sama untuk menitipkan perasaan.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_3945842877243005576_8526193738.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 6,
    "title": "Pulang yang Bernama Kamu",
    "category": "",
    "description": "Ada tempat yang bukan rumah, tetapi terasa seperti pulang setiap kali ada kamu.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_3954490849470794343_56728275502.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 7,
    "title": "Cinta yang Tak Banyak Bicara",
    "category": "",
    "description": "Aku tidak selalu pandai mengucapkannya, tetapi hatiku selalu tahu siapa yang ia pilih.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_3963877666104276145_56728275502.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 8,
    "title": "Malam Menyimpan Namamu",
    "category": "",
    "description": "Saat dunia mulai sunyi, pikiranku justru ramai oleh cerita tentangmu.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_3967298434998349875_39227111108.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 9,
    "title": "Seandainya Waktu Memihak",
    "category": "",
    "description": "Aku ingin waktu berhenti sebentar, tepat ketika senyummu bertemu dengan pandanganku.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_3976474671644583218_22032803390.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 10,
    "title": "Kamu, Sederhana Tapi Berarti",
    "category": "",
    "description": "Tidak perlu banyak hal untuk membuat hari terasa indah. Terkadang, cukup kamu.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_3976626930774311111_59250746868.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 11,
    "title": "Rindu yang Pulang Perlahan",
    "category": "",
    "description": "Rindu datang tanpa mengetuk, lalu menetap seperti ia memang tahu tempatnya.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DY84nXzTgia.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 12,
    "title": "Surat yang Tak Pernah Terkirim",
    "category": "",
    "description": "Ada kata-kata yang kutulis dalam hati, tetapi tak pernah sampai kepadamu.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DZNw8AkTdxw.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 13,
    "title": "Di Ujung Senja, Ada Kamu",
    "category": "",
    "description": "Senja mengajarkan bahwa sesuatu bisa indah walau sebentar, seperti pertemuan kita.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DZVb9IGypqO.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 14,
    "title": "Jika Kita Bertemu Lagi",
    "category": "",
    "description": "Semoga nanti kita bertemu tanpa canggung, lalu tersenyum seolah waktu tak pernah pergi.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DZvLKGIzvf4.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 15,
    "title": "Cahaya Kecil di Hariku",
    "category": "",
    "description": "Kehadiranmu tidak selalu besar, tetapi cukup untuk membuat hari yang biasa menjadi berarti.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_Da3TFJtu9w6.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 16,
    "title": "Aku Menyimpanmu Baik-Baik",
    "category": "",
    "description": "Bukan untuk memiliki, hanya untuk menjaga kenangan agar tidak hilang ditelan waktu.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_Db-fj1Mt-a0.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 17,
    "title": "Tentang Kita yang Belum Selesai",
    "category": "",
    "description": "Mungkin cerita ini belum selesai, hanya sedang mengambil jeda dari halaman berikutnya.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_Dbdb5zSST3e.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 18,
    "title": "Namamu Seperti Rumah",
    "category": "",
    "description": "Ada ketenangan aneh setiap kali namamu lewat di dalam pikiranku.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DbhgN8Bvoty.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 19,
    "title": "Hujan dan Kenangan",
    "category": "",
    "description": "Setiap tetes hujan seperti mengembalikan potongan kecil tentang kita.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_Dc08rn1hjWF.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 20,
    "title": "Kamu di Dalam Ingatanku",
    "category": "",
    "description": "Waktu boleh berjalan jauh, tetapi beberapa nama memilih tinggal lebih lama.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DcCC7ilMd6i.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 21,
    "title": "Rasa yang Datang Diam-Diam",
    "category": "",
    "description": "Tanpa kusadari, rasa itu tumbuh pelan dan akhirnya memenuhi ruang yang kosong.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DcK4U1ES5ul.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 22,
    "title": "Satu Senyum, Seribu Cerita",
    "category": "",
    "description": "Senyummu singkat, tetapi pikiranku bisa membuat seribu cerita darinya.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DcOmfHDJtqu.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 23,
    "title": "Bila Rindu Menjadi Jalan",
    "category": "",
    "description": "Mungkin setiap langkah yang kulalui diam-diam sedang membawaku lebih dekat kepadamu.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DcuIgFoMkVI.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 24,
    "title": "Di Antara Jarak dan Waktu",
    "category": "",
    "description": "Jarak hanya memisahkan tempat, sedangkan waktu hanya menguji seberapa lama rasa bertahan.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DcbLvMSgQ4u.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 25,
    "title": "Kau yang Tak Sengaja Menetap",
    "category": "",
    "description": "Awalnya hanya sebuah pertemuan, lalu perlahan menjadi bagian dari pikiranku setiap hari.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_Dclr40eTvyJ.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 26,
    "title": "Mungkin Ini Namanya Cinta",
    "category": "",
    "description": "Ketika bahagiamu mulai terasa penting bagiku, aku tahu ada sesuatu yang berubah.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DcodVBazfip.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 27,
    "title": "Malam, Kopi, dan Rindu",
    "category": "",
    "description": "Dalam sunyi malam, secangkir kopi terasa seperti teman yang mengerti siapa yang sedang kurindukan.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_Dcq0wiwpGHL.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 28,
    "title": "Andai Bisa Kutitipkan Rindu",
    "category": "",
    "description": "Akan kutitipkan seluruh rinduku pada angin, supaya sampai kepadamu tanpa membuatmu terbebani.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DctoYS-hDUT.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 29,
    "title": "Kamu yang Selalu Kembali",
    "category": "",
    "description": "Berkali-kali mencoba lupa, tetapi kenangan tentangmu selalu menemukan jalan kembali.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DcwDUcuJW3i.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 30,
    "title": "Sebuah Perasaan Bernama Kamu",
    "category": "",
    "description": "Dari sekian banyak hal yang sulit dijelaskan, kamu adalah perasaan yang paling mudah kurasakan.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DdmJbvltN18.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 31,
    "title": "Di Balik Diamku",
    "category": "",
    "description": "Mungkin aku terlihat biasa saja, padahal ada banyak hal tentangmu yang diam-diam kupikirkan.",
    "duration": "",
    "videoUrl": "../assets/snapsave-app_DdrK6oyBxxK.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 32,
    "title": "Jarak Tidak Membuatku Lupa",
    "category": "",
    "description": "Hari berganti, tempat berubah, tetapi namamu masih menjadi bagian dari cerita yang kubawa.",
    "duration": "",
    "videoUrl": "../assets/VID-20260825-WA0007.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 33,
    "title": "Senyummu, Alasan Sederhana",
    "category": "",
    "description": "Kadang sebuah senyum kecil cukup untuk menyelamatkan seseorang dari hari yang berat.",
    "duration": "",
    "videoUrl": "../assets/VID-20260825-WA0008.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 34,
    "title": "Saat Dunia Terasa Sunyi",
    "category": "",
    "description": "Aku menemukan kehangatan dalam kenangan tentang caramu membuat hari terasa lebih hidup.",
    "duration": "",
    "videoUrl": "../assets/VID-20260825-WA0009.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 35,
    "title": "Untuk Cinta yang Belum Terucap",
    "category": "",
    "description": "Beberapa rasa memilih tumbuh dalam diam, menunggu keberanian yang mungkin belum datang.",
    "duration": "",
    "videoUrl": "../assets/VID-20260826-WA0001.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 36,
    "title": "Kita Dalam Satu Cerita",
    "category": "",
    "description": "Entah sebagai awal, akhir, atau sekadar halaman, aku bersyukur pernah menuliskanmu dalam ceritaku.",
    "duration": "",
    "videoUrl": "../assets/VID-20260826-WA0002~2.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 37,
    "title": "Bersamamu, Waktu Berbeda",
    "category": "",
    "description": "Ada saat-saat ketika waktu terasa cepat hanya karena aku terlalu menikmati keberadaanmu.",
    "duration": "",
    "videoUrl": "../assets/VID-20260907-WA0017.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 38,
    "title": "Rindu yang Tidak Meminta",
    "category": "",
    "description": "Aku tidak meminta kamu kembali, hanya berharap kenangan ini tetap menjadi sesuatu yang indah.",
    "duration": "",
    "videoUrl": "../assets/VID-20260907-WA0019.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 39,
    "title": "Namamu di Balik Senyumku",
    "category": "",
    "description": "Ada alasan mengapa aku tersenyum sendiri, dan sering kali jawabannya adalah kamu.",
    "duration": "",
    "videoUrl": "../assets/VID-20260907-WA0022.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 40,
    "title": "Jika Hati Bisa Memilih",
    "category": "",
    "description": "Mungkin sejak awal hatiku sudah tahu ke mana ia ingin singgah.",
    "duration": "",
    "videoUrl": "../assets/VID-20260907-WA0025.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 41,
    "title": "Kamu dan Ribuan Kemungkinan",
    "category": "",
    "description": "Di antara semua kemungkinan yang bisa terjadi, bertemu denganmu tetap menjadi salah satu yang paling indah.",
    "duration": "",
    "videoUrl": "../assets/VID-20260907-WA0026.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 42,
    "title": "Sebuah Doa Tentangmu",
    "category": "",
    "description": "Semoga hidup selalu memperlakukanmu dengan lembut, bahkan ketika aku tidak lagi berada di dekatmu.",
    "duration": "",
    "videoUrl": "../assets/VID-20260907-WA0029.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 43,
    "title": "Kenangan yang Tak Pernah Usang",
    "category": "",
    "description": "Ada kenangan yang tidak pudar karena waktu, justru semakin jelas setiap kali diingat.",
    "duration": "",
    "videoUrl": "../assets/VID-20260907-WA0030.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 44,
    "title": "Ketika Senja Menyebut Namamu",
    "category": "",
    "description": "Warna langit sore selalu mengingatkanku bahwa keindahan sering datang tanpa banyak suara.",
    "duration": "",
    "videoUrl": "../assets/VID-20260908-WA0001.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 45,
    "title": "Cinta Dalam Jeda",
    "category": "",
    "description": "Tidak semua rasa harus terburu-buru. Ada cinta yang justru tumbuh paling indah dalam jeda.",
    "duration": "",
    "videoUrl": "../assets/VID-20260908-WA0002.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 46,
    "title": "Kau di Antara Ribuan Wajah",
    "category": "",
    "description": "Dari begitu banyak orang yang kutemui, entah bagaimana mataku selalu mengingatmu.",
    "duration": "",
    "videoUrl": "../assets/VID-20260908-WA0003.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 47,
    "title": "Hari yang Menjadi Indah",
    "category": "",
    "description": "Hari biasa bisa berubah menjadi istimewa ketika ada sedikit cerita tentangmu di dalamnya.",
    "duration": "",
    "videoUrl": "../assets/VID-20260908-WA0004.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 48,
    "title": "Rindu yang Menunggu Pulang",
    "category": "",
    "description": "Ada rindu yang tidak berlari mengejar, hanya duduk tenang sambil menunggu waktu yang tepat.",
    "duration": "",
    "videoUrl": "../assets/VID-20260908-WA0005.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 49,
    "title": "Satu Nama, Banyak Kenangan",
    "category": "",
    "description": "Satu nama bisa membawa kembali begitu banyak tempat, percakapan, dan perasaan.",
    "duration": "",
    "videoUrl": "../assets/VID-20260908-WA0006.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 50,
    "title": "Untuk Hari yang Pernah Kita Punya",
    "category": "",
    "description": "Meski singkat, ada hari-hari yang pantas dikenang seumur hidup karena pernah membuat kita bahagia.",
    "duration": "",
    "videoUrl": "../assets/VID-20260908-WA0034.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 51,
    "title": "Aku, Kamu, dan Waktu",
    "category": "",
    "description": "Waktu mengubah banyak hal, tetapi tidak selalu mampu menghapus seseorang dari ingatan.",
    "duration": "",
    "videoUrl": "../assets/VID-20260908-WA0035.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 52,
    "title": "Cinta yang Belajar Ikhlas",
    "category": "",
    "description": "Mencintai kadang berarti bertahan, dan kadang berarti merelakan tanpa membenci.",
    "duration": "",
    "videoUrl": "../assets/VID-20260908-WA0036.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 53,
    "title": "Bila Nanti Kita Berpapasan",
    "category": "",
    "description": "Semoga saat jalan kita bertemu lagi, tidak ada luka, hanya senyum kecil yang pernah kita kenal.",
    "duration": "",
    "videoUrl": "../assets/VID-20260908-WA0037.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 54,
    "title": "Tenang, Ada Aku Dalam Doa",
    "category": "",
    "description": "Mungkin aku tidak selalu hadir di sisimu, tetapi semoga doaku tetap menemukan jalan kepadamu.",
    "duration": "",
    "videoUrl": "../assets/VID-20260908-WA0038.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 55,
    "title": "Kamu Adalah Cerita Kecilku",
    "category": "",
    "description": "Di antara banyak bab kehidupan, kamu adalah cerita kecil yang meninggalkan makna besar.",
    "duration": "",
    "videoUrl": "../assets/VID-20260919-WA0042.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 56,
    "title": "Rasa yang Memilih Bertahan",
    "category": "",
    "description": "Bukan karena tidak ada pilihan lain, hanya karena hatiku masih nyaman menyebut namamu.",
    "duration": "",
    "videoUrl": "../assets/VID-20260919-WA0043.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 57,
    "title": "Sampai Rindu Berhenti",
    "category": "",
    "description": "Aku akan membiarkan waktu bekerja, sampai rindu tidak lagi terasa seperti beban.",
    "duration": "",
    "videoUrl": "../assets/VID-20260919-WA0044.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 58,
    "title": "Untukmu di Masa Depan",
    "category": "",
    "description": "Semoga suatu hari nanti, semua yang pernah kita harapkan menemukan bentuk terbaiknya.",
    "duration": "",
    "videoUrl": "../assets/VID-20260919-WA0045.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 59,
    "title": "Cinta yang Tidak Harus Memiliki",
    "category": "",
    "description": "Ada rasa yang cukup disyukuri karena pernah hadir, tanpa harus dipaksa menjadi milik.",
    "duration": "",
    "videoUrl": "../assets/VID-20260919-WA0046.mp4",
    "thumbnail": "",
    "externalUrl": ""
  },
  {
    "id": 60,
    "title": "Di Akhir Semua Cerita",
    "category": "",
    "description": "Apa pun akhirnya, semoga bagian tentangmu selalu menjadi halaman yang ingin kubaca kembali.",
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
