import { products } from './src/flipkart_products.js';
import Fuse from 'fuse.js';

const fuseOptions = {
  keys: ["product_name", "description", "product_category_tree"],
  threshold: 0.4,
  distance: 100,
  includeScore: true,
};

const fuse = new Fuse(products, fuseOptions);
const productsContainer = document.getElementById("products-container");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");
const categoryFilter = document.getElementById("category-filter");
const searchSuggestions = document.getElementById("search-suggestions");
const prevPageBtn = document.getElementById("prev-page");
const nextPageBtn = document.getElementById("next-page");
const currentPageSpan = document.getElementById("current-page");

const PRODUCTS_PER_PAGE = 20;
let currentPage = 1;
let filteredProducts = products;

// Populate category filter
const categories = [...new Set(products.flatMap(product => 
  JSON.parse(product.product_category_tree).flat()
))];

categories.forEach(category => {
  const option = document.createElement('option');
  option.value = category;
  option.textContent = category;
  categoryFilter.appendChild(option);
});

// Function to render product cards
function renderProducts(productList, page = 1) {
  const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const pageProducts = productList.slice(startIndex, endIndex);

  productsContainer.innerHTML = "";
  pageProducts.forEach((product) => {
    const image = JSON.parse(product.image)[0];
    const description = product.description.slice(0, 100) + '...';
    const rating = product.product_rating === "No rating available" ? "" : product.product_rating;
    const productCard = `
      <div class="product-card">
        <div class="product-info">
          <h3>${product.product_name}</h3>
          <p>${description}</p>
          ${rating ? `<p class="rating"><i class="fas fa-star"></i> ${rating}</p>` : ""}
          <p class="category"><i class="fas fa-tag"></i> ${JSON.parse(product.product_category_tree)[0]}</p>
          <s class="retail-price">₹${product.retail_price}</s>
          <p class="price-tag">₹${product.discounted_price}</p>
        </div>
      </div>
    `;
    productsContainer.innerHTML += productCard;
  });

  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card, index) => {
    const product = pageProducts[index];
    card.addEventListener("click", (e) => {
      if (!e.target.classList.contains("add-to-cart-btn")) {
        showQuickView(product);
      }
    });
  });

  updatePagination();
}

// Filter and search products
function filterAndSearchProducts() {
  showLoading();
  setTimeout(() => {
    const searchTerm = searchInput.value;
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
    const selectedCategory = categoryFilter.value;

    filteredProducts = products;

    // Apply price filter
    filteredProducts = filteredProducts.filter(product => {
      const price = parseFloat(product.discounted_price);
      return price >= minPrice && price <= maxPrice;
    });

    // Apply category filter
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(product => 
        JSON.parse(product.product_category_tree).flat().includes(selectedCategory)
      );
    }

    // Apply search filter
    if (searchTerm) {
      const searchResults = fuse.search(searchTerm);
      filteredProducts = searchResults.map(result => result.item);
    }

    currentPage = 1;
    renderProducts(filteredProducts, currentPage);
    hideLoading();
  }, 500); // Simulate a short delay for better UX
}

// Update pagination
function updatePagination() {
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  currentPageSpan.textContent = `Page ${currentPage} of ${totalPages}`;
  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === totalPages;
}

// Handle pagination
prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderProducts(filteredProducts, currentPage);
  }
});

nextPageBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  if (currentPage < totalPages) {
    currentPage++;
    renderProducts(filteredProducts, currentPage);
  }
});

// Search suggestions
function showSearchSuggestions() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  searchSuggestions.innerHTML = "";

  if (searchTerm.length < 2) {
    return;
  }

  const suggestions = fuse.search(searchTerm).slice(0, 5);
  suggestions.forEach(({ item }) => {
    const suggestionElement = document.createElement("div");
    suggestionElement.classList.add("suggestion");
    suggestionElement.textContent = item.product_name;
    suggestionElement.addEventListener("click", () => {
      searchInput.value = item.product_name;
      searchSuggestions.innerHTML = "";
      filterAndSearchProducts();
    });
    searchSuggestions.appendChild(suggestionElement);
  });
}

// Initialize page with all products
renderProducts(products);

// Add event listeners for filters and search
searchInput.addEventListener("input", showSearchSuggestions);
searchBtn.addEventListener("click", filterAndSearchProducts);
minPriceInput.addEventListener("input", filterAndSearchProducts);
maxPriceInput.addEventListener("input", filterAndSearchProducts);
categoryFilter.addEventListener("change", filterAndSearchProducts);

// Close search suggestions when clicking outside
document.addEventListener("click", (e) => {
  if (!searchSuggestions.contains(e.target) && e.target !== searchInput) {
    searchSuggestions.innerHTML = "";
  }
});

// Add smooth scrolling for better UX
function smoothScroll(target, duration) {
  const targetPosition = target.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Smooth scroll to top when changing pages
prevPageBtn.addEventListener("click", () => {
  smoothScroll(document.body, 500);
});

nextPageBtn.addEventListener("click", () => {
  smoothScroll(document.body, 500);
});

// Add a loading indicator
const loadingIndicator = document.createElement("div");
loadingIndicator.classList.add("loading-indicator");
loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
document.body.appendChild(loadingIndicator);

function showLoading() {
  loadingIndicator.style.display = "flex";
}

function hideLoading() {
  loadingIndicator.style.display = "none";
}



// Enhance the product cards with a "Quick View" feature
function createQuickViewModal() {
  const modal = document.createElement("div");
  modal.classList.add("quick-view-modal");
  modal.innerHTML = `
    <div class="quick-view-content">
      <span class="close-modal">&times;</span>
      <div class="quick-view-details"></div>
    </div>
  `;
  document.body.appendChild(modal);

  const closeModal = modal.querySelector(".close-modal");
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  return modal;
}

const quickViewModal = createQuickViewModal();

function showQuickView(product) {
  const details = quickViewModal.querySelector(".quick-view-details");
  const images = JSON.parse(product.image);
  details.innerHTML = `
    <h2>${product.product_name}</h2>
    <div class="quick-view-images">
    </div>
    <p>${product.description}</p>
    <p class="category"><i class="fas fa-tag"></i> ${JSON.parse(product.product_category_tree)[0]}</p>
    <p class="price-card">₹${product.discounted_price}</p>
    <button class="purchase"><a href="${product.product_url}"} target="_blank">Purchase</a></button>
  `;
  quickViewModal.style.display = "flex";
}


// Initialize the page
renderProducts(products);

