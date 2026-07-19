/**
 * Data lokal Visit Jogja.
 * Berisi daftar wisata, hotel, kuliner, kategori anggaran, serta panduan kota.
 */
const IMAGES = {
  "hero1": "assets/hero-prambanan.jpg",
  "hero2": "assets/hero-malioboro.jpg",
  "hero3": "assets/hero-parangtritis.jpg",
  "taman": "assets/wisata-taman-sari.jpg",
  "hotel1": "assets/hotel-jogja-1.jpg",
  "hotel2": "assets/hotel-jogja-2.jpg",
  "hotel3": "assets/hotel-jogja-3.jpg",
  "gudeg": "assets/kuliner-gudeg.jpg",
  "sate": "assets/kuliner-sate-klathak.jpg",
  "kopi": "assets/kuliner-kopi-klotok.jpg"
};

const DATA={
 destinations:[
  {name:"Candi Prambanan",location:"Sleman",rating:4.8,price:"Estimasi mulai Rp50.000",image:IMAGES.hero1,description:"Kompleks candi Hindu dengan arsitektur monumental dan area luas untuk menikmati suasana pagi.",tags:["budaya","sejarah","fotografi"]},
  {name:"Jalan Malioboro",location:"Kota Yogyakarta",rating:4.7,price:"Akses area gratis",image:IMAGES.hero2,description:"Koridor ikonik untuk berjalan santai, berbelanja, menikmati kuliner, dan suasana malam.",tags:["malam","belanja","kota"]},
  {name:"Pantai Parangtritis",location:"Bantul",rating:4.6,price:"Estimasi mulai Rp15.000",image:IMAGES.hero3,description:"Pantai selatan dengan langit senja, garis pantai luas, dan panorama refleksi cahaya.",tags:["pantai","sunset","alam"]},
  {name:"Taman Sari",location:"Kraton",rating:4.7,price:"Estimasi mulai Rp15.000",image:IMAGES.taman,description:"Kompleks pemandian bersejarah dengan lorong, kolam, dan detail arsitektur khas.",tags:["heritage","arsitektur","sejarah"]}
 ],
 hotels:[
  {name:"Novotel Suites Yogyakarta Malioboro",location:"Malioboro",rating:4.7,price:"Estimasi mulai Rp900.000",image:IMAGES.hotel1,description:"Kamar modern dengan akses mudah ke kawasan pusat kota.",tags:["modern","pusat kota","keluarga"]},
  {name:"The Phoenix Hotel Yogyakarta",location:"Jetis",rating:4.8,price:"Estimasi mulai Rp1.200.000",image:IMAGES.hotel2,description:"Nuansa heritage dengan area courtyard yang khas dan atmosfer klasik.",tags:["heritage","pasangan","premium"]},
  {name:"Cavinton Hotel Yogyakarta",location:"Ngampilan",rating:4.5,price:"Estimasi mulai Rp600.000",image:IMAGES.hotel3,description:"Pilihan hotel kota dengan lobby luas dan akses menuju pusat Yogyakarta.",tags:["kota","praktis","keluarga"]}
 ],
 foods:[
  {name:"Gudeg Wijilan",location:"Wijilan",rating:4.7,price:"Estimasi mulai Rp25.000",image:IMAGES.gudeg,description:"Gudeg nangka dengan telur, krecek, nasi, dan rasa manis gurih khas Yogyakarta.",tags:["gudeg","lokal","tradisional"]},
  {name:"Sate Klathak Bantul",location:"Bantul",rating:4.6,price:"Estimasi mulai Rp35.000",image:IMAGES.sate,description:"Sate kambing khas Bantul yang dibakar dengan tusuk besi dan bumbu sederhana.",tags:["sate","kambing","malam"]},
  {name:"Warung Kopi Klotok",location:"Kaliurang",rating:4.8,price:"Estimasi mulai Rp20.000",image:IMAGES.kopi,description:"Menu rumahan, telur dadar, sayur, gorengan, dan kopi tradisional dalam suasana santai.",tags:["kopi","rumahan","pagi"]}
 ]
};

const BUDGET_LEVELS={
 hemat:{label:'Hemat',min:250000,max:400000,stay:'hostel, homestay, atau hotel sederhana',transport:'Trans Jogja dan transportasi daring seperlunya',style:'fokus atraksi gratis atau bertiket rendah'},
 sedang:{label:'Sedang',min:450000,max:700000,stay:'hotel bintang 2–3 atau boutique stay',transport:'transportasi daring dan sewa kendaraan selektif',style:'kombinasi destinasi populer, kuliner, dan waktu santai'},
 nyaman:{label:'Nyaman',min:800000,max:1200000,stay:'hotel bintang 4 atau resort nyaman',transport:'mobil sewaan dengan pembagian rute yang efisien',style:'lebih fleksibel, antrean lebih minim, dan pilihan makan lebih luas'},
 premium:{label:'Premium',min:1400000,max:2200000,stay:'hotel premium, resort, atau vila',transport:'kendaraan privat dan jadwal yang sangat fleksibel',style:'pengalaman khusus, restoran pilihan, dan ruang istirahat lebih banyak'}
};
const TRAVELER_SIZE={keluarga:4,pasangan:2,teman:4,sendiri:1};
const SHARING_FACTOR={keluarga:.86,pasangan:.91,teman:.88,sendiri:1};
const RATING_SCALE={1:'Sangat terbatas. Hanya dipilih jika ada kebutuhan khusus.',2:'Di bawah rata-rata. Perlu membaca catatan dan ulasan dengan teliti.',3:'Cukup. Layak untuk kebutuhan dasar, tetapi bukan pilihan utama.',4:'Baik. Umumnya aman direkomendasikan dengan beberapa catatan kecil.',5:'Istimewa. Menjadi pilihan unggulan untuk pengalaman yang kuat dan konsisten.'};
const CITY_GUIDE={
 overview:'Yogyakarta cocok dibaca sebagai beberapa zona. Pusat kota berisi Malioboro, Keraton, Taman Sari, dan Kotabaru. Timur berisi Prambanan, Ratu Boko, serta koridor menuju bandara lama. Utara mengarah ke Kaliurang dan lereng Merapi. Selatan mencakup Bantul, sentra kerajinan, serta Pantai Parangtritis. Gunungkidul berada lebih jauh di tenggara dan membutuhkan satu hari khusus untuk pantai atau gua. Jangan mencampur terlalu banyak zona dalam satu hari karena waktu habis di jalan.',
 area:'Untuk kunjungan pertama, Malioboro praktis karena dekat Stasiun Tugu dan pusat kota, tetapi lebih ramai. Prawirotaman cocok untuk kafe, penginapan butik, dan suasana santai. Kotagede kuat untuk heritage, perak, dan jalan kaki pada pagi hari. Kaliurang lebih sejuk dan cocok untuk alam. Bantul cocok untuk kuliner, desa wisata, dan jalur selatan. Gunungkidul paling tepat dijadikan perjalanan sehari penuh.',
 route:'Rute paling efisien memakai sistem zona. Zona pusat: Keraton, Taman Sari, Wijilan, Malioboro. Zona timur: Prambanan dan Ratu Boko. Zona utara: Kaliurang, museum atau panorama Merapi, serta Kopi Klotok. Zona selatan: Kotagede, Bantul, Parangtritis, dan Mangunan. Gunungkidul sebaiknya berdiri sendiri karena jaraknya lebih jauh.',
 transport:'Trans Jogja cocok untuk koridor utama dengan biaya rendah, tetapi tidak menjangkau semua destinasi alam. Transportasi daring praktis di kota. Sewa motor cocok bagi pengendara berpengalaman, sedangkan mobil dengan pengemudi lebih nyaman untuk keluarga, rombongan, Kaliurang, Bantul, dan Gunungkidul. Sisakan waktu ekstra pada jam berangkat kerja, sore, akhir pekan, dan musim liburan.',
 arrival:'Stasiun Tugu paling dekat dengan Malioboro. Stasiun Lempuyangan berada di sisi timur pusat kota. Bandara YIA berada di Kulon Progo, cukup jauh dari pusat Yogyakarta, sehingga waktu transfer harus masuk ke itinerary. Untuk kedatangan malam, utamakan transfer langsung dan jangan menempatkan agenda wisata yang padat pada hari yang sama.',
 culture:'Gunakan pakaian sopan saat memasuki kompleks Keraton, tempat ibadah, dan kawasan candi. Ikuti arahan petugas, jangan memanjat struktur yang dilarang, dan minta izin sebelum memotret warga atau aktivitas budaya. Di ruang tradisional, suara pelan dan sikap tertib lebih dihargai daripada mengejar foto.',
 history:'Yogyakarta berkembang sebagai pusat Kesultanan, pendidikan, seni, dan perjuangan nasional. Status Daerah Istimewa berkaitan dengan peran historis Kesultanan Yogyakarta dan Kadipaten Pakualaman. Jejak sejarahnya terlihat pada sumbu filosofis, Keraton, Tugu, kawasan Kotagede, bangunan kolonial, serta tradisi yang tetap hidup.',
 weather:'Secara umum, musim yang lebih kering memberi peluang lebih baik untuk pantai, sunrise, dan perjalanan alam. Musim hujan membuat lanskap hijau, tetapi meningkatkan risiko hujan sore, jalan licin, dan perubahan agenda. Chatbot offline ini tidak membaca cuaca langsung. Untuk keputusan hari keberangkatan, cek prakiraan resmi dan kondisi destinasi.',
 beach:'Pantai selatan memiliki ombak dan arus yang kuat. Patuhi batas aman, bendera, dan instruksi penjaga. Jangan menganggap garis air yang tampak tenang selalu aman. Parangtritis cocok untuk suasana senja, sedangkan pantai Gunungkidul membutuhkan waktu perjalanan lebih panjang dan perencanaan parkir.',
 merapi:'Kawasan Merapi paling menarik pada pagi hari ketika peluang langit cerah lebih besar. Aktivitas alam harus mengikuti status gunung, cuaca, dan arahan resmi. Jangan memasuki zona terlarang. Untuk keluarga, pilih titik pandang dan museum yang mudah diakses daripada rute fisik yang berat.',
 food:'Kuliner inti Jogja meliputi gudeg, sate klathak, bakmi Jawa, brongkos, oseng mercon, jadah tempe, mangut lele, kopi tradisional, dan jajanan pasar. Gudeg cenderung manis, sedangkan sate klathak lebih sederhana dan gurih. Untuk pengalaman yang seimbang, gabungkan satu kuliner ikonik dengan warung lokal di zona perjalanan yang sama.',
 souvenir:'Oleh-oleh yang mudah dibawa meliputi bakpia, produk batik, kerajinan perak Kotagede, kulit Manding, dan makanan kemasan. Periksa masa simpan makanan. Untuk batik, tanyakan jenis bahan dan proses pembuatannya agar tidak menyamakan batik tulis, cap, dan tekstil bermotif batik.',
 family:'Keluarga sebaiknya memakai maksimal dua destinasi utama per hari, menyediakan jeda makan dan toilet, serta menghindari perpindahan zona yang berlebihan. Keraton, Taman Sari, Prambanan, museum, desa wisata, dan kawasan Kaliurang relatif mudah disusun menjadi rute keluarga.',
 couple:'Pasangan biasanya cocok dengan kombinasi heritage, kafe, sunset, dan penginapan dengan atmosfer kuat. Contoh: pagi di Taman Sari, siang di Prawirotaman, sore di Ratu Boko atau Parangtritis, lalu makan malam di pusat kota. Perhatikan jarak agar suasana romantis tidak berubah menjadi perjalanan terburu-buru.',
 solo:'Solo traveler sebaiknya tinggal dekat simpul transportasi, menyimpan rute offline, memberi tahu penginapan saat pergi ke daerah jauh, dan menghindari jalan sepi pada malam hari. Pusat kota, Kotagede, museum, dan tur kelompok cocok untuk perjalanan sendiri.',
 accessibility:'Aksesibilitas berbeda pada setiap destinasi. Area candi, bangunan heritage, pantai, dan bukit dapat memiliki tangga, permukaan tidak rata, atau jarak berjalan panjang. Tanyakan akses kursi roda, toilet, area penurunan penumpang, dan kendaraan internal langsung kepada pengelola sebelum berangkat.',
 night:'Malioboro, Titik Nol, Alun-Alun, Prawirotaman, dan beberapa kawasan kuliner hidup pada malam hari. Pilih area ramai, jaga barang pribadi, dan tentukan titik jemput yang jelas karena beberapa ruas mengalami pengaturan lalu lintas atau kepadatan.',
 language:'Bahasa Indonesia dipahami luas. Ungkapan sederhana yang ramah: “monggo” untuk mempersilakan, “matur nuwun” untuk terima kasih, dan “nuwun sewu” untuk permisi. Gunakan secara wajar dan tetap utamakan kesopanan.',
 photography:'Waktu pagi memberi cahaya lembut dan keramaian yang lebih rendah. Prambanan, Tugu, Kotagede, Taman Sari, Malioboro malam, perbukitan Bantul, dan pantai selatan memiliki karakter visual berbeda. Cek aturan tripod, drone, dan pemotretan komersial karena setiap lokasi dapat memiliki kebijakan sendiri.',
 safety:'Simpan salinan identitas, gunakan titik jemput yang terang, waspadai barang pribadi di keramaian, dan hindari memaksakan perjalanan alam saat cuaca buruk. Untuk keadaan darurat, hubungi pengelola destinasi, penginapan, atau layanan darurat setempat. Chatbot offline ini tidak menggantikan informasi keselamatan resmi.'
};
