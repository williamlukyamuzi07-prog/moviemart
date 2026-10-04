 const movies = [
  {
    title: "American Primeval",
    year: "2025",
    genre: "Western / Drama",
    description: "A rugged frontier story set in the American West. This is the first sample title in the MOVIEMART library.",
    watchUrl: "https://www.patreon.com/MOVIEMART/posts/american-s1-e01-171314039?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=postshare_creator&utm_content=join_link"
  https://www.patreon.com/MOVIEMART/posts/american-s1-e2-171301787?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=postshare_creator&utm_content=join_link }
];

const movieGrid = document.getElementById("movieGrid");
const categoryGrid = document.getElementById("categoryGrid");
const search = document.getElementById("search");
const emptyState = document.getElementById("emptyState");
const resultCount = document.getElementById("resultCount");
const modal = document.getElementById("movieModal");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalDescription = document.getElementById("modalDescription");
const modalPoster = document.getElementById("modalPoster");
const watchButton = document.getElementById("watchButton");

function renderMovies(list) {
  movieGrid.innerHTML = "";
  if(resultCount) resultCount.textContent = `${list.length} title${list.length === 1 ? "" : "s"}`;

  list.forEach((movie) => {
    const card = document.createElement("article");
    card.className = "movie-card";
    card.innerHTML = `
      <div class="poster"><span class="poster-title">${movie.title}</span></div>
      <div class="card-body">
        <p class="card-title">${movie.title}</p>
        <p class="card-meta">${movie.year} · ${movie.genre}</p>
      </div>`;
    card.addEventListener("click", () => openMovie(movie));
    if(movieGrid) movieGrid.appendChild(card);
  });

  if(emptyState) emptyState.classList.toggle("hidden", list.length !== 0);
}

function renderCategories() {
  const categories = [...new Set(movies.flatMap(m => m.genre.split("/").map(g => g.trim())))];
  if(categoryGrid) {
    categoryGrid.innerHTML = categories.map(category =>
      `<button class="category" type="button">${category}</button>`
    ).join("");

    categoryGrid.querySelectorAll(".category").forEach(button => {
      button.addEventListener("click", () => {
        if(search) search.value = button.textContent;
        filterMovies();
        const moviesSection = document.getElementById("movies");
        if(moviesSection) moviesSection.scrollIntoView({behavior: "smooth"});
      });
    });
  }
}

function filterMovies() {
  const term = search ? search.value.toLowerCase().trim() : "";
  const filtered = movies.filter(m =>
    `${m.title} ${m.genre} ${m.year}`.toLowerCase().includes(term)
  );
  renderMovies(filtered);
}

function openMovie(movie) {
  if(modalTitle) modalTitle.textContent = movie.title;
  if(modalMeta) modalMeta.textContent = `${movie.year} · ${movie.genre}`;
  if(modalDescription) modalDescription.textContent = movie.description;
  if(modalPoster) modalPoster.innerHTML = `<div class="poster-title" style="padding:25px">${movie.title}</div>`;
  if(watchButton) watchButton.href = movie.watchUrl || "#";
  if(modal) modal.classList.remove("hidden");
}

function closeModal() {
  if(modal) modal.classList.add("hidden");
}

if(search) search.addEventListener("input", filterMovies);
const closeModalBtn = document.getElementById("closeModal");
if(closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
const closeBtn = document.getElementById("closeButton");
if(closeBtn) closeBtn.addEventListener("click", closeModal);
if(modal) modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
const yearEl = document.getElementById("year");
if(yearEl) yearEl.textContent = new Date().getFullYear();

renderMovies(movies);
renderCategories();
