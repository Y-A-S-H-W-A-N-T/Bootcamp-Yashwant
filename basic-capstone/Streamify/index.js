import JSZip from "jszip";
import { saveAs } from "file-saver";

document.addEventListener("DOMContentLoaded", () => {
  const songList = document.getElementById("song-list");
  const artistSearchInput = document.getElementById("artist-search");
  const songSearchInput = document.getElementById("song-search");
  const genreFilter = document.getElementById("genre-filter");
  const popularityFilter = document.getElementById("popularity-filter");
  const exportButton = document.getElementById("export");
  const paginationContainer = document.getElementById("pagination");

  let songs = [];
  let currentPage = 1;
  const itemsPerPage = 20;

  function formatDuration(durationMs) {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  async function loadSongs() {
    try {
      const response = await fetch("/spotify_songs.json");
      songs = await response.json();
      renderSongs(filterSongs());
      renderPagination(filterSongs());
    } catch (error) {
      console.error("Failed to load songs:", error);
    }
  }

  function renderSongs(filteredSongs) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedSongs = filteredSongs.slice(startIndex, endIndex);
  
    songList.innerHTML = paginatedSongs
      .map((song) => {
        const popularityCategory =
          song.track_popularity <= 25
            ? { label: "Low", color: "red" }
            : song.track_popularity <= 50
            ? { label: "Average", color: "orange" }
            : song.track_popularity <= 75
            ? { label: "Medium", color: "yellowgreen" }
            : { label: "High", color: "green" };
  
        return `
        <div class="song-card">
          <h3>${song.track_name}</h3>
          <p><strong>Artist:</strong> ${song.track_artist}</p>
          <p><strong>Duration:</strong> ${formatDuration(song.duration_ms)}</p>
          <p><strong>Popularity:</strong> 
            <span style="color: ${popularityCategory.color}; font-weight: bold;">
              ${popularityCategory.label}
            </span>
          </p>
          <p><strong>Album:</strong> ${song.track_album_name}</p>
          <p><strong>Genre:</strong> ${song.playlist_genre}</p>
          <a href="https://open.spotify.com/track/${song.track_id}" target="_blank" class="listen-link">
            Listen on Spotify
          </a>
        </div>`;
      })
      .join("");
  }  

  function renderPagination(filteredSongs) {
    const totalPages = Math.ceil(filteredSongs.length / itemsPerPage);
    paginationContainer.innerHTML = "";

    const prevButton = document.createElement("button");
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.disabled = currentPage === 1;
    prevButton.className = "page-btn";
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderSongs(filteredSongs);
        renderPagination(filteredSongs);
      }
    });

    const nextButton = document.createElement("button");
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.disabled = currentPage === totalPages;
    nextButton.className = "page-btn";
    nextButton.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderSongs(filteredSongs);
        renderPagination(filteredSongs);
      }
    });

    const currentPageLabel = document.createElement("span");
    currentPageLabel.textContent = `Page ${currentPage} of ${totalPages}`;
    currentPageLabel.className = "current-page-label";

    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(currentPageLabel);
    paginationContainer.appendChild(nextButton);
  }

  function filterSongs() {
    const artistTerm = artistSearchInput.value.toLowerCase();
    const songTerm = songSearchInput.value.toLowerCase();
    const genre = genreFilter.value;
    const popularity = popularityFilter.value;

    return songs.filter((song) => {
      const popularityCategory =
        song.track_popularity <= 25
          ? "low"
          : song.track_popularity <= 50
          ? "average"
          : song.track_popularity <= 75
          ? "medium"
          : "high";

      return (
        (!artistTerm || song.track_artist.toLowerCase().includes(artistTerm)) &&
        (!songTerm || song.track_name.toLowerCase().includes(songTerm)) &&
        (!genre || song.playlist_genre === genre) &&
        (!popularity || popularityCategory === popularity)
      );
    });
  }

  artistSearchInput.addEventListener("input", () => {
    const filtered = filterSongs();
    currentPage = 1;
    renderSongs(filtered);
    renderPagination(filtered);
  });

  songSearchInput.addEventListener("input", () => {
    const filtered = filterSongs();
    currentPage = 1;
    renderSongs(filtered);
    renderPagination(filtered);
  });

  genreFilter.addEventListener("change", () => {
    const filtered = filterSongs();
    currentPage = 1;
    renderSongs(filtered);
    renderPagination(filtered);
  });

  popularityFilter.addEventListener("change", () => {
    const filtered = filterSongs();
    currentPage = 1;
    renderSongs(filtered);
    renderPagination(filtered);
  });

  exportButton.addEventListener("click", () => {
    const filteredSongs = filterSongs();
    const zip = new JSZip();
    zip.file("filtered_songs.json", JSON.stringify(filteredSongs, null, 2));
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "filtered_songs.zip");
    });
  });

  loadSongs();
});