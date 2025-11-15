// Konfigurasi URL data - menggunakan path relatif
const CONFIG = {
  LAYANAN_DATA_URL: "./data/layanan.json",
  UMKM_DATA_URL: "./data/umkm.json",
};

// Data contoh sebagai fallback
const SAMPLE_LAYANAN_DATA = [
  {
    id: 1,
    nama: "Puskesmas Sehat Sentosa",
    deskripsi:
      "Memberikan pelayanan kesehatan dasar dan rujukan untuk masyarakat. Tersedia layanan rawat jalan, imunisasi, dan pemeriksaan kesehatan gratis.",
    kategori: "Kesehatan",
    telepon: "(021) 555-1234",
    instagram: "@puskesmas_sehat",
  },
  {
    id: 2,
    nama: "Kantor Kelurahan Harmoni",
    deskripsi:
      "Melayani administrasi kependudukan seperti pembuatan KTP, KK, akta kelahiran, dan surat keterangan lainnya.",
    kategori: "Administrasi",
    telepon: "(021) 555-5678",
    instagram: "@kelurahan_harmoni",
  },
  {
    id: 3,
    nama: "Perpustakaan Daerah",
    deskripsi:
      "Menyediakan koleksi buku untuk semua usia. Juga mengadakan kegiatan literasi dan bimbingan belajar gratis untuk pelajar.",
    kategori: "Pendidikan",
    telepon: "(021) 555-9012",
    instagram: "@perpustakaan_daerah",
  },
  {
    id: 4,
    nama: "Posyandu Mawar",
    deskripsi:
      "Layanan kesehatan ibu dan anak, termasuk penimbangan balita, imunisasi, dan konsultasi gizi.",
    kategori: "Kesehatan",
    telepon: "(021) 555-3456",
    instagram: "@posyandu_mawar",
  },
];

const SAMPLE_UMKM_DATA = [
  {
    id: 1,
    nama: "Kerajinan Tangan Bu Rini",
    deskripsi:
      "Menjual berbagai kerajinan tangan seperti tas anyaman, hiasan dinding, dan aksesoris dari bahan alami dengan kualitas terbaik.",
    kategori: "Kerajinan",
    telepon: "0812-3456-7890",
    instagram: "@kerajinan_burini",
  },
  {
    id: 2,
    nama: "Warung Makan Sederhana",
    deskripsi:
      "Menyajikan masakan rumahan dengan cita rasa autentik. Menu andalan: nasi campur, soto ayam, dan gado-gado.",
    kategori: "Kuliner",
    telepon: "0813-4567-8901",
    instagram: "@warung_sederhana",
  },
  {
    id: 3,
    nama: "Toko Baju Ananda",
    deskripsi:
      "Menjual pakaian berkualitas dengan harga terjangkau. Tersedia berbagai model baju muslim, casual, dan aksesoris.",
    kategori: "Fashion",
    telepon: "0814-5678-9012",
    instagram: "@toko_bajuananda",
  },
  {
    id: 4,
    nama: "Kafe Buku Santai",
    deskripsi:
      "Tempat nyaman untuk membaca buku sambil menikmati kopi dan camilan. Juga menjual buku-buku bekas berkualitas.",
    kategori: "Kuliner & Hiburan",
    telepon: "0815-6789-0123",
    instagram: "@kafebuku_santai",
  },
];

// Inisialisasi aplikasi
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

async function initializeApp() {
  try {
    await loadData();
    setupNavigation();
    setupSearch();
    console.log("Aplikasi berhasil diinisialisasi");
  } catch (error) {
    console.error("Error initializing app:", error);
    showError("Gagal memuat aplikasi. Menggunakan data contoh...");
    // Load sample data sebagai fallback
    loadSampleData();
  }
}

// Fungsi untuk mengambil data dari JSON
async function fetchData(url) {
  try {
    console.log("Mengambil data dari:", url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data berhasil diambil:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data from", url, ":", error);
    throw error;
  }
}

// Fungsi untuk memuat semua data
async function loadData() {
  console.log("Memulai proses load data...");

  const layananContainer = document.getElementById("layanan-cards");
  const umkmContainer = document.getElementById("umkm-cards");
  const layananLoading = document.getElementById("layanan-loading");
  const umkmLoading = document.getElementById("umkm-loading");
  const layananError = document.getElementById("layanan-error");
  const umkmError = document.getElementById("umkm-error");

  // Reset state
  resetContainers(layananContainer, umkmContainer, layananError, umkmError);

  try {
    // Load layanan data
    await loadLayananData(layananContainer, layananLoading, layananError);

    // Load UMKM data
    await loadUmkmData(umkmContainer, umkmLoading, umkmError);

    console.log("Semua data berhasil dimuat");
  } catch (error) {
    console.error("Error dalam loadData:", error);
    throw error;
  }
}

function resetContainers(
  layananContainer,
  umkmContainer,
  layananError,
  umkmError
) {
  layananContainer.innerHTML = "";
  umkmContainer.innerHTML = "";
  layananError.style.display = "none";
  umkmError.style.display = "none";
}

async function loadLayananData(container, loading, error) {
  loading.style.display = "block";
  try {
    const data = await fetchData(CONFIG.LAYANAN_DATA_URL);
    loading.style.display = "none";
    renderCards(container, data, "layanan");
  } catch (err) {
    loading.style.display = "none";
    error.textContent = `Gagal memuat data layanan: ${err.message}. Menggunakan data contoh...`;
    error.style.display = "block";
    // Load sample data sebagai fallback
    renderCards(container, SAMPLE_LAYANAN_DATA, "layanan");
    throw err;
  }
}

async function loadUmkmData(container, loading, error) {
  loading.style.display = "block";
  try {
    const data = await fetchData(CONFIG.UMKM_DATA_URL);
    loading.style.display = "none";
    renderCards(container, data, "umkm");
  } catch (err) {
    loading.style.display = "none";
    error.textContent = `Gagal memuat data UMKM: ${err.message}. Menggunakan data contoh...`;
    error.style.display = "block";
    // Load sample data sebagai fallback
    renderCards(container, SAMPLE_UMKM_DATA, "umkm");
    throw err;
  }
}

function renderCards(container, data, type) {
  if (!data || data.length === 0) {
    container.innerHTML =
      '<p class="no-data">Tidak ada data yang tersedia.</p>';
    return;
  }

  container.innerHTML = data.map((item) => createCard(item, type)).join("");
}

// Fungsi untuk membuat kartu
function createCard(item, type) {
  return `
        <div class="card" data-id="${item.id}" data-type="${type}">
            <div class="card-header">
                <h3>${item.nama}</h3>
                <span class="category">${item.kategori}</span>
            </div>
            <div class="card-body">
                <p>${item.deskripsi}</p>
                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <span>${item.telepon}</span>
                    </div>
                    <div class="contact-item">
                        <i class="fab fa-instagram"></i>
                        <span>${item.instagram}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Fungsi untuk memuat data contoh
function loadSampleData() {
  console.log("Menggunakan data contoh...");
  const layananContainer = document.getElementById("layanan-cards");
  const umkmContainer = document.getElementById("umkm-cards");

  renderCards(layananContainer, SAMPLE_LAYANAN_DATA, "layanan");
  renderCards(umkmContainer, SAMPLE_UMKM_DATA, "umkm");
}

// Fungsi untuk navigasi halaman
function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".page-content");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      switchPage(this, navLinks, pages);
    });
  });
}

function switchPage(clickedLink, allLinks, allPages) {
  // Hapus kelas aktif dari semua link dan halaman
  allLinks.forEach((link) => link.classList.remove("active"));
  allPages.forEach((page) => page.classList.remove("active"));

  // Tambah kelas aktif ke link yang diklik
  clickedLink.classList.add("active");

  // Tampilkan halaman yang sesuai
  const pageId = clickedLink.getAttribute("data-page");
  const targetPage = document.getElementById(`${pageId}-page`);
  if (targetPage) {
    targetPage.classList.add("active");
  }
}

// Fungsi untuk pencarian
function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    const allCards = document.querySelectorAll(".card");

    allCards.forEach((card) => {
      const isVisible = isCardMatchingQuery(card, query);
      card.style.display = isVisible ? "block" : "none";
    });
  }

  function isCardMatchingQuery(card, query) {
    if (!query) return true;

    const nama = card.querySelector("h3").textContent.toLowerCase();
    const deskripsi = card.querySelector("p").textContent.toLowerCase();
    const kategori = card.querySelector(".category").textContent.toLowerCase();

    return (
      nama.includes(query) ||
      deskripsi.includes(query) ||
      kategori.includes(query)
    );
  }

  searchButton.addEventListener("click", performSearch);
  searchInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      performSearch();
    }
  });
}

function showError(message) {
  console.error(message);
  // Bisa ditambahkan notifikasi ke user di sini
}
