const movies = [https://www.patreon.com/MOVIEMART/posts/american-s1-e01-171314039?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=postshare_creator&utm_content=join_link
  {
    title: "American Primeval",
    year: "2025",
    genre: "Western / Drama",
    description: "A rugged frontier story set in the American West. This is the first sample title in the MOVIEMART library.",
    watchUrl: "#"
  }
  // Add more movies below. Example:
  // ,{
  //   title: "Your Movie",
  //   year: "2026",
  //   genre: "Action",
  //   description: "Your description here.",
  //   watchUrl: "https://your-video-host.example/video"
  // }
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
  resultCount.textContent = `${list.length} title${list.length === 1 ? "" : "s"}`;

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
    movieGrid.appendChild(card);
  });

  emptyState.classList.toggle("hidden", list.length !== 0);
}

function renderCategories() {
  const categories = [...new Set(movies.flatMap(m => m.genre.split("/").map(g => g.trim())))];
  categoryGrid.innerHTML = categories.map(category =>
    `<button class="category" type="button">${category}</button>`
  ).join("");

  categoryGrid.querySelectorAll(".category").forEach(button => {
    button.addEventListener("click", () => {
      search.value = button.textContent;
      filterMovies();
      document.getElementById("movies").scrollIntoView({behavior: "smooth"});
    });
  });
}

function filterMovies() {
  const term = search.value.toLowerCase().trim();
  const filtered = movies.filter(m =>
    `${m.title} ${m.genre} ${m.year}`.toLowerCase().includes(term)
  );
  renderMovies(filtered);
}

function openMovie(movie) {
  modalTitle.textContent = movie.title;
  modalMeta.textContent = `${movie.year} · ${movie.genre}`;
  modalDescription.textContent = movie.description;
  modalPoster.innerHTML = `<div class="poster-title" style="padding:25px">${movie.title}</div>`;
  watchButton.href = movie.watchUrl || "#";
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

search.addEventListener("input", filterMovies);
document.getElementById("closeModal").addEventListener("click", closeModal);
document.getElementById("closeButton").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
document.getElementById("year").textContent = new Date().getFullYear();

renderMovies(movies);
renderCategories();
