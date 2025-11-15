// Fungsi untuk mengambil data dari JSON
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Fungsi untuk memuat semua data
async function loadData() {
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
  } catch (error) {
    handleDataLoadError(
      error,
      layananLoading,
      umkmLoading,
      layananError,
      umkmError
    );
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
    error.textContent = `Gagal memuat data layanan: ${err.message}`;
    error.style.display = "block";
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
    error.textContent = `Gagal memuat data UMKM: ${err.message}`;
    error.style.display = "block";
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

function handleDataLoadError(
  error,
  layananLoading,
  umkmLoading,
  layananError,
  umkmError
) {
  console.error("Data load error:", error);
  layananLoading.style.display = "none";
  umkmLoading.style.display = "none";

  // Fallback ke data sample
  loadSampleData();
}
