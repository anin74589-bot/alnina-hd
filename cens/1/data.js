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
  welcomeVisitUrl: "https://vizzapp.my.id/frey",
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
  primary: "https://ignoringexcepting.com/evemiruzr?key=46fa4b98de86a775a139602d4ecef444",
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
    "title": "Kau, Rumah yang Tak Bernama",
    "category": "",
    "description": "Aku tidak tahu kapan kamu menjadi tempat ternyaman, yang kutahu hatiku selalu mengarah kepadamu.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_3929832062802743243_32065927994.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 2,
    "title": "Satu Detik Sebelum Memelukmu",
    "category": "",
    "description": "Ada pelukan yang belum pernah terjadi, tetapi sudah lama dibayangkan oleh hati.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_3932799562368548451_73571012491.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 3,
    "title": "Rahasia Kecil Bernama Rindu",
    "category": "",
    "description": "Rindu terkadang menjadi rahasia paling indah yang hanya diketahui hati.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_3937497015402783382_29049349278.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 4,
    "title": "Jika Waktu Mengizinkan Kita",
    "category": "",
    "description": "Ada harapan sederhana yang kusimpan: semoga waktu memberi kita kesempatan untuk saling memilih.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_3939736540233517218_20184157797.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 5,
    "title": "Kau Datang Seperti Musim",
    "category": "",
    "description": "Kamu datang tanpa banyak janji, tetapi kehadiranmu membuat hidup terasa seperti musim yang lebih hangat.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_3945842877243005576_8526193738.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 6,
    "title": "Saat Matamu Menemukan Mataku",
    "category": "",
    "description": "Saat matamu bertemu mataku, untuk sesaat dunia terasa kehilangan alasan untuk bergerak.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_3954490849470794343_56728275502.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 7,
    "title": "Aku Memilihmu Lagi",
    "category": "",
    "description": "Setiap kali diberi kesempatan memilih, anehnya hatiku selalu kembali memilihmu.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_3963877666104276145_56728275502.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 8,
    "title": "Menyayangimu Dalam Diam",
    "category": "",
    "description": "Menyayangimu dalam diam bukan berarti rasa ini kecil, justru kadang ia terlalu besar untuk dijelaskan.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_3967298434998349875_39227111108.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 9,
    "title": "Satu Hati, Banyak Cerita",
    "category": "",
    "description": "Satu hati bisa menyimpan begitu banyak cerita, apalagi jika sebagian besarnya tentangmu.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_3976474671644583218_22032803390.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 10,
    "title": "Seindah Senja Bersamamu",
    "category": "",
    "description": "Seperti senja yang tak pernah tergesa, bersamamu aku ingin menikmati setiap warna yang ada.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_3976626930774311111_59250746868.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 11,
    "title": "Cinta dalam Hal-Hal Sederhana",
    "category": "",
    "description": "Cinta kadang hadir lewat perhatian kecil, percakapan singkat, dan kehadiran yang terasa menenangkan.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_DY84nXzTgia.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 12,
    "title": "Sebelum Malam Menjadi Sunyi",
    "category": "",
    "description": "Sebelum malam benar-benar sunyi, aku ingin menitipkan satu hal: aku masih memikirkanmu.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_DZNw8AkTdxw.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 13,
    "title": "Malam yang Menyimpan Namamu",
    "category": "",
    "description": "Malam menyimpan banyak rahasia, salah satunya adalah betapa seringnya namamu datang ke pikiranku.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_DZVb9IGypqO.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 14,
    "title": "Kita di Antara Jarak",
    "category": "",
    "description": "Jarak boleh memisahkan langkah, tetapi tidak selalu mampu membuat hati berhenti mengingat.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_DZvLKGIzvf4.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 15,
    "title": "Kita yang Hampir Tak Sengaja",
    "category": "",
    "description": "Kita mungkin bertemu tanpa rencana, tetapi perasaanku kepadamu terasa terlalu nyata untuk disebut kebetulan.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_Da3TFJtu9w6.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 16,
    "title": "Hati yang Menyimpanmu",
    "category": "",
    "description": "Ada nama yang tidak pernah benar-benar pergi, karena ia sudah menemukan tempatnya di dalam hati.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_Db-fj1Mt-a0.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 17,
    "title": "Di Antara Jutaan Tatapan",
    "category": "",
    "description": "Dari begitu banyak mata yang singgah, hanya tatapanmu yang membuat hati ingin tinggal.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_Dbdb5zSST3e.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 18,
    "title": "Nama yang Tak Pernah Hilang",
    "category": "",
    "description": "Ada nama yang tak pernah hilang dari ingatan, meski banyak hal telah berubah.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_DbhgN8Bvoty.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 19,
    "title": "Namamu di Ujung Langit",
    "category": "",
    "description": "Namamu selalu tampak indah, bahkan ketika hanya kutulis diam-diam di dalam hati.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_Dc08rn1hjWF.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 20,
    "title": "Kau yang Selalu Pulang",
    "category": "",
    "description": "Entah sejauh apa aku pergi, ada bagian dari diriku yang selalu ingin kembali kepadamu.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_DcCC7ilMd6i.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 21,
    "title": "Saat Dunia Terasa Lebih Indah",
    "category": "",
    "description": "Dunia mungkin tetap sama, tetapi ketika kamu hadir, semuanya terasa sedikit lebih indah.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_DcK4U1ES5ul.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 22,
    "title": "Perjalanan Kecil Menuju Hatimu",
    "category": "",
    "description": "Barangkali cinta bukan perjalanan besar, melainkan langkah-langkah kecil yang membawaku semakin dekat kepadamu.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_DcOmfHDJtqu.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 23,
    "title": "Tempat Hatiku Beristirahat",
    "category": "",
    "description": "Ada seseorang yang membuat lelah terasa ringan, dan anehnya, orang itu adalah kamu.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_DcuIgFoMkVI.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 24,
    "title": "Kita yang Dipertemukan Waktu",
    "category": "",
    "description": "Waktu mungkin punya jalannya sendiri, dan mungkin kita dipertemukan tepat ketika hati siap mengenal cinta.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_DcbLvMSgQ4u.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 25,
    "title": "Kau dan Tenangnya Pulang",
    "category": "",
    "description": "Bersamamu, pulang bukan lagi soal tempat, melainkan tentang siapa yang membuat hati merasa aman.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_Dclr40eTvyJ.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 26,
    "title": "Sampai Rindu Ini Tenang",
    "category": "",
    "description": "Semoga suatu hari nanti rindu tidak lagi perlu menunggu, karena kita sudah berada di tempat yang sama.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_DcodVBazfip.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 27,
    "title": "Tak Ada yang Seperti Kamu",
    "category": "",
    "description": "Banyak orang mungkin datang dan pergi, tetapi selalu ada satu sosok yang sulit dibandingkan dengan siapa pun.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_Dcq0wiwpGHL.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 28,
    "title": "Rasa yang Menolak Pergi",
    "category": "",
    "description": "Ada rasa yang menolak pergi, bahkan setelah banyak alasan menyuruhnya berhenti tinggal.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_DctoYS-hDUT.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 29,
    "title": "Jatuh Cinta Tanpa Suara",
    "category": "",
    "description": "Aku jatuh cinta tanpa suara, tetapi hatiku tahu persis kepada siapa ia menjatuhkan diri.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_DcwDUcuJW3i.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 30,
    "title": "Rindu dalam Cahaya Kota",
    "category": "",
    "description": "Lampu kota boleh gemerlap, tetapi pikiranku tetap mencari satu cahaya yang bernama kamu.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_DdmJbvltN18.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 31,
    "title": "Ada Kamu di Setiap Lagu",
    "category": "",
    "description": "Kadang sebuah lagu terasa berbeda karena di dalamnya ada bagian kecil tentang seseorang yang kita sayang.",
    "duration": "",
    "videoUrl": "../../assets/snapsave-app_DdrK6oyBxxK.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 32,
    "title": "Kisah yang Ingin Kuulang",
    "category": "",
    "description": "Beberapa kisah begitu indah sampai hati ingin mengulangnya, meski hanya dalam ingatan.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260825-WA0007.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 33,
    "title": "Cinta yang Tak Banyak Bicara",
    "category": "",
    "description": "Tak semua cinta harus ramai. Ada yang cukup tumbuh pelan, lalu menetap dengan tenang.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260825-WA0008.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 34,
    "title": "Aku dan Cerita Tentang Kita",
    "category": "",
    "description": "Mungkin kita hanyalah dua manusia biasa, tetapi bersamamu setiap cerita terasa layak dikenang.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260825-WA0009.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 35,
    "title": "Aku Ingin Menjadi Rumahmu",
    "category": "",
    "description": "Aku tidak ingin menjadi sekadar singgah. Aku ingin menjadi tempat yang selalu bisa kamu sebut rumah.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260826-WA0001.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 36,
    "title": "Jika Cinta Punya Suara",
    "category": "",
    "description": "Kalau cinta bisa bicara, mungkin ia akan menyebut namamu dengan suara paling lembut.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260826-WA0002~2.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 37,
    "title": "Cinta yang Menunggu Pagi",
    "category": "",
    "description": "Aku ingin melihat cinta tumbuh seperti pagi, perlahan tetapi pasti membawa cahaya.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260907-WA0017.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 38,
    "title": "Peluk yang Belum Selesai",
    "category": "",
    "description": "Pelukan kadang berakhir cepat, tetapi rasa nyaman yang ditinggalkannya bisa bertahan sangat lama.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260907-WA0019.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 39,
    "title": "Senyap, Tapi Penuh Cinta",
    "category": "",
    "description": "Ada cinta yang tidak gaduh, tidak menuntut, hanya hadir dan membuat hati merasa cukup.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260907-WA0022.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 40,
    "title": "Senyummu dan Ribuan Alasan",
    "category": "",
    "description": "Senyummu mungkin hanya sebentar, tetapi ia sanggup meninggalkan ribuan alasan untukku mengingatmu.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260907-WA0025.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 41,
    "title": "Biar Langit Menjadi Saksi",
    "category": "",
    "description": "Biarlah langit menyimpan cerita kita, bersama semua rasa yang belum sempat kita ucapkan.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260907-WA0026.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 42,
    "title": "Rindu yang Tumbuh Diam-Diam",
    "category": "",
    "description": "Rindu itu aneh, ia tumbuh diam-diam sampai akhirnya memenuhi seluruh ruang di dalam dada.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260907-WA0029.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 43,
    "title": "Langit Malam dan Kita",
    "category": "",
    "description": "Di bawah langit malam, aku sering membayangkan satu hal sederhana: kita duduk berdua tanpa harus terburu pulang.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260907-WA0030.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 44,
    "title": "Pesan yang Tak Pernah Terkirim",
    "category": "",
    "description": "Ada pesan yang tidak pernah terkirim karena beberapa perasaan terlalu dalam untuk dirangkum dalam kata-kata.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260908-WA0001.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 45,
    "title": "Bukan Kebetulan, Kataku",
    "category": "",
    "description": "Mungkin semuanya bukan kebetulan. Mungkin semesta memang sedang memperkenalkan dua hati yang saling mencari.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260908-WA0002.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 46,
    "title": "Kamu dalam Setiap Rencana",
    "category": "",
    "description": "Dalam setiap rencana masa depan yang kubayangkan, entah bagaimana kamu selalu menemukan jalan untuk masuk.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260908-WA0003.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 47,
    "title": "Untukmu, yang Tak Pernah Biasa",
    "category": "",
    "description": "Untukmu yang tak pernah terasa biasa, semoga suatu hari kamu tahu betapa berarti hadirnya dirimu.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260908-WA0004.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 48,
    "title": "Secangkir Rindu untukmu",
    "category": "",
    "description": "Kalau rindu bisa diseduh, mungkin malam ini rasanya seperti secangkir hangat yang kubuat untukmu.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260908-WA0005.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 49,
    "title": "Tatapan yang Tinggal Terlalu Lama",
    "category": "",
    "description": "Ada tatapan yang hanya berlangsung beberapa detik, tetapi kenangannya tinggal jauh lebih lama.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260908-WA0006.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 50,
    "title": "Selamanya Terasa Sebentar",
    "category": "",
    "description": "Bersamamu, bahkan selamanya terasa seperti waktu yang terlalu singkat.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260908-WA0034.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 51,
    "title": "Cinta yang Tumbuh Perlahan",
    "category": "",
    "description": "Cinta yang tumbuh perlahan sering kali punya akar yang paling dalam.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260908-WA0035.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 52,
    "title": "Untuk Senyum yang Kurindukan",
    "category": "",
    "description": "Senyummu sederhana, tetapi entah bagaimana selalu berhasil menjadi sesuatu yang ingin kurindukan.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260908-WA0036.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 53,
    "title": "Kita, di Waktu yang Tepat",
    "category": "",
    "description": "Mungkin bukan waktunya yang salah, mungkin kita hanya sedang menunggu waktu yang benar.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260908-WA0037.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 54,
    "title": "Untuk Hari-Hari Bersamamu",
    "category": "",
    "description": "Aku ingin menghabiskan hari-hari biasa bersamamu, karena bersamamu hal sederhana pun terasa istimewa.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260908-WA0038.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 55,
    "title": "Kau adalah Bagian Favoritku",
    "category": "",
    "description": "Dari sekian banyak hal yang kusukai dalam hidup, entah mengapa kamu selalu menjadi salah satu yang paling kusyukuri.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260919-WA0042.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 56,
    "title": "Seandainya Kita Bertemu Lagi",
    "category": "",
    "description": "Kalau takdir mempertemukan kita lagi, semoga kali itu kita datang tanpa rasa takut untuk saling menetap.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260919-WA0043.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 57,
    "title": "Satu Nama di Dalam Doa",
    "category": "",
    "description": "Di antara banyak doa yang kupanjatkan, namamu sering menjadi kalimat yang paling lama tinggal.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260919-WA0044.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 58,
    "title": "Bersamamu, Bahkan Sunyi Berarti",
    "category": "",
    "description": "Bahkan dalam sunyi, keberadaanmu terasa seperti percakapan yang tidak pernah benar-benar selesai.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260919-WA0045.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 59,
    "title": "Di Sampingmu, Waktu Melambat",
    "category": "",
    "description": "Di dekatmu, waktu seperti sengaja memperlambat langkah agar aku bisa lebih lama bersamamu.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260919-WA0046.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
  },
  {
    "id": 60,
    "title": "Ketika Rindu Menyebut Namamu",
    "category": "",
    "description": "Kadang rindu tidak datang dengan suara, ia hanya diam-diam menyebut namamu.",
    "duration": "",
    "videoUrl": "../../assets/VID-20260925-WA0001.mp4",
    "thumbnail": "",
    "externalUrl": "https://vizzapp.my.id/frey"
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
