import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Search, Loader2, X, WormIcon as Virus } from 'lucide-react';

const DiseaseSearch = ({ onSelectDisease }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setShowResults(true);
    try {
      const response = await axios.get('/api/search', {
        params: { q: query, ontology: 'efo' },
      });
      console.log(response.data);
      setResults(response.data.response.docs);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-xl shadow-2xl animate-gradient" ref={searchRef}>
      <div className="mb-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-2 animate-float">Disease Explorer</h2>
        <p className="text-xl text-white opacity-80">Discover and learn about various diseases</p>
      </div>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for a disease..."
          className="w-full px-6 py-4 pr-12 text-lg text-gray-800 bg-white border-2 border-transparent rounded-full focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition duration-300 ease-in-out placeholder-gray-400"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition duration-300 ease-in-out"
          >
            <X size={24} />
          </button>
        )}
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300 ease-in-out"
        >
          <Search size={24} />
        </button>
      </div>
      {loading && (
        <div className="flex justify-center items-center mt-6">
          <Loader2 className="animate-spin text-white" size={36} />
        </div>
      )}
      {showResults && (
        <div className="mt-6 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out">
          {results.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {results.map((result) => (
                <li
                  key={result.id}
                  className="p-4 hover:bg-purple-50 cursor-pointer transition duration-300 ease-in-out"
                  onClick={() => {
                    onSelectDisease(result);
                    setShowResults(false);
                  }}
                >
                  <div className="flex items-center">
                    <Virus className="text-purple-500 mr-3" size={24} />
                    <div>
                      <p className="font-semibold text-gray-800 text-lg">{result.label}</p>
                      <p className="text-sm text-gray-600">{result.ontology_name}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <p className="text-xl text-gray-500 mb-2">No results found</p>
              <p className="text-gray-400">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiseaseSearch;