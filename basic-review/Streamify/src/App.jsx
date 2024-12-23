import React, { useEffect, useState } from "react";
import { artistFilter } from "./filters/artistFilter";
import { genreFilter } from "./filters/genreFilter";
import { popularityFilter } from "./filters/popularityFilter";
import { songFilter } from "./filters/songFilter";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Select, SelectItem } from "@/components/select";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { Loader } from "@/components/loader";
import { IoIosPlayCircle } from "react-icons/io";
import { MdDownload, MdTimer } from "react-icons/md";

const App = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    artist: "",
    song: "",
    genre: "",
    popularity: "",
  });
  const itemsPerPage = 20;

  const loadSongs = async () => {
    try {
      const response = await fetch("/spotify_songs.json");
      const data = await response.json();
      setSongs(data);
      setFilteredSongs(data);
    } catch (error) {
      console.error("Error loading songs:", error);
    }
  };

  const applyFilters = () => {
    let result = songs;
    result = artistFilter(result, filters.artist);
    result = songFilter(result, filters.song);
    result = genreFilter(result, filters.genre);
    result = popularityFilter(result, filters.popularity);
    setFilteredSongs(result);
    setCurrentPage(1);
  };

  const exportData = () => {
    const zip = new JSZip();
    zip.file("filtered_songs.json", JSON.stringify(filteredSongs, null, 2));
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "filtered_songs.zip");
    });
  };

  useEffect(() => {
    loadSongs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => prev + direction);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSongs = filteredSongs.slice(startIndex, endIndex);

  const convertTime = (time)=>{
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
  

  return (
    <div className=" mx-auto p-6 bg-gray-900 min-h-screen text-white">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold" style={{color: '#1db954'}}>Streamify</h1>
      </header>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <Input
          className="border border-gray-700 bg-gray-800 text-white placeholder-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-green-500"
          placeholder="Search by artist"
          value={filters.artist}
          onChange={(e) => setFilters({ ...filters, artist: e.target.value })}
        />
        <Input
          className="border border-gray-700 bg-gray-800 text-white placeholder-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-green-500"
          placeholder="Search by song"
          value={filters.song}
          onChange={(e) => setFilters({ ...filters, song: e.target.value })}
        />
        <Select
          className="border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-green-500"
          onValueChange={(value) => setFilters({ ...filters, genre: value })}
          defaultValue=""
        >
          <SelectItem value="">All Genres</SelectItem>
          <SelectItem value="pop">Pop</SelectItem>
          <SelectItem value="rap">Rap</SelectItem>
          <SelectItem value="rock">Rock</SelectItem>
          <SelectItem value="latin">latin</SelectItem>
          <SelectItem value="edm">edm</SelectItem>
          <SelectItem value="r&b">r&b</SelectItem>
        </Select>
        <Select
          className="border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-green-500"
          onValueChange={(value) => setFilters({ ...filters, popularity: value })}
          defaultValue=""
        >
          <SelectItem value="">All Popularity Levels</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="average">Average</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </Select>
        <Button className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-400" onClick={exportData}>
          Download Filtered Data<MdDownload size={20} className="ml-2 text-center items-center justify-center"/>
        </Button>
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          onClick={() => handlePageChange(-1)}
          disabled={currentPage === 1}
        >
          <FaArrowCircleLeft />
        </button>
        <span className="text-gray-400">
          Page {currentPage} of {Math.ceil(filteredSongs.length / itemsPerPage)}
        </span>
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === Math.ceil(filteredSongs.length / itemsPerPage)}
        >
          <FaArrowCircleRight color="white" onClick={() => handlePageChange(1)}/>
        </button>
      </div>
      <div>
        {songs.length === 0 ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {paginatedSongs.map((song) => {
              const popularityCategory =
              song.track_popularity <= 25
                ? { label: "Low", color: "red" }
                : song.track_popularity <= 50
                ? { label: "Average", color: "yellow" }
                : song.track_popularity <= 75
                ? { label: "Medium", color: "orange" }
                : { label: "High", color: "greenyellow" };
                const time = convertTime(song.duration_ms)
              return(
                <div
                  key={song.track_id}
                  className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold">{song.track_name || "Untitled"}</h3>
                  <p className="text-sm text-gray-400">by <strong className="text-lg">{song.track_artist || "Unknown Artist"}</strong></p>
                  <p className="text-xl text-gray-400">{song.track_album_name || "Unknown Album"}</p>
                  <p className="text-sm text-gray-400" style={{color: popularityCategory.color}}>{popularityCategory.label|| "Unknown"}</p>
                  <p className="text-sm text-gray-400">{song.playlist_genre || "Unknown Genre"}</p>
                  <div className="flex">
                    <p className="flex mt-2" style={{color: '#1db954'}}><MdTimer size={20} className="mr-1"/>{time}</p>
                    {song.track_id &&
                    <a href={`https://open.spotify.com/track/${song.track_id}`} target="_blank"
                      className="float-right mt-auto ml-auto"
                      style={{color: '#1db954'}}
                    >
                      <IoIosPlayCircle size={60}/>
                    </a>
                    }
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;