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

  searchButton.addEventListener("click", performSearch);
  searchInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      performSearch();
    }
  });

  // Real-time search (opsional)
  searchInput.addEventListener("input", debounce(performSearch, 300));
}

function performSearch() {
  const query = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();
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

// Utility function untuk debounce
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
