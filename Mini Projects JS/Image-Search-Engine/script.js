const API_KEY = "EavEjCre-mQ1GcApLcGQK8Z7b017NONfbtz4PQS7Q_A";

function showElement(element) {
  element.style.display = "block";
}

function hideElement(element) {
  element.style.display = "none";
}

function clearResults() {
  resultsContainer.innerHTML = "";
  hideElement(errorMessage);
  hideElement(noResults);
}

async function searchImages(query) {
  try {
    showElement(loading);
    clearResults();

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=20&client_id=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }

    const data = await response.json();
    hideElement(loading);

    if (data.results.length === 0) {
      showElement(noResults);
      return;
    }

    displayImages(data.results);
  } catch (error) {
    hideElement(loading);
    errorMessage.textContent = "Error fetching images. Please try again later.";
    showElement(errorMessage);
    console.error("Error:", error);
  }
}

function displayImages(images) {
  resultsContainer.innerHTML = "";

  images.forEach((image) => {
    const imageCard = document.createElement("div");
    imageCard.className = "image-card";

    imageCard.innerHTML = `
                    <img src="${image.urls.regular}" alt="${
      image.alt_description || "Image"
    }" loading="lazy">
                    <button class="download-btn" onclick="downloadImage('${
                      image.urls.full
                    }', '${image.id}')">Download</button>
                    <div class="image-info">
                        <div class="image-title">${
                          image.alt_description || "Untitled"
                        }</div>
                        <div class="image-author">by ${image.user.name}</div>
                        <div class="image-description">${
                          image.description || "No description available"
                        }</div>
                    </div>
                `;

    resultsContainer.appendChild(imageCard);
  });
}

function downloadImage(url, filename) {
  const link = document.createElement("a");
  link.href = url;
  link.download = `unsplash-${filename}.jpg`;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Event listeners
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    searchImages(query);
  }
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) {
      searchImages(query);
    }
  }
});

// Demo data for when API key is not available
function loadDemoImages() {
  const demoImages = [
    {
      id: "demo1",
      urls: {
        regular:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
        full: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      },
      alt_description: "Beautiful mountain landscape",
      user: { name: "By Unsplash" },
      description: "A stunning mountain landscape with clear blue skies",
    },
    {
      id: "demo2",
      urls: {
        regular:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
        full: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      },
      alt_description: "Forest path",
      user: { name: "By Unsplash" },
      description: "A peaceful forest path surrounded by tall trees",
    },
    {
      id: "demo3",
      urls: {
        regular:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
        full: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      },
      alt_description: "Ocean waves",
      user: { name: "By Unsplash" },
      description: "Powerful ocean waves crashing against the shore",
    },
  ];

  displayImages(demoImages);
}

// Load demo images on page load
window.addEventListener("load", () => {
  errorMessage.innerHTML = `"Search Beyond the Pixel." `;
  showElement(errorMessage);
  loadDemoImages();
});
