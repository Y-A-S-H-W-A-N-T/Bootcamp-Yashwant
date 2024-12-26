import { useState } from "react";
import DiseaseSearch from "./components/DiseaseSearch";
import DiseaseDetails from "./components/DiseaseDetails";
import HierarchyTree from "./components/HierarchyTree";
import AboutDisease from "./components/AboutDisease";

const App = () => {
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [diseaseTree, setDiseaseTree] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-800 mb-2">
            Illness Encyclopedia
          </h1>
          <p className="text-lg sm:text-xl text-indigo-600">
            A resource for discovering in-depth details about diseases, their symptoms, and the latest treatment approaches.
          </p>
        </header>

        <div className="max-w-3xl mx-auto mb-8 sm:mb-12 transition-all duration-300 ease-in-out transform hover:scale-105">
          <DiseaseSearch onSelectDisease={setSelectedDisease} />
        </div>

        {selectedDisease && (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-6 sm:mb-8 transition-all duration-300 ease-in-out transform hover:scale-105">
                <DiseaseDetails
                  disease={selectedDisease}
                  setDiseaseTree={setDiseaseTree}
                />
              </div>
              <div className="transition-all duration-300 ease-in-out transform hover:scale-105">
                <AboutDisease disease={selectedDisease} />
              </div>
            </div>
            <div className="lg:col-span-1">
              {diseaseTree && (
                <div className="lg:sticky lg:top-8 transition-all duration-300 ease-in-out transform hover:scale-105">
                  <HierarchyTree
                    disease={selectedDisease}
                    diseaseTree={diseaseTree}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <footer className="mt-16 sm:mt-24 md:mt-32 lg:mt-80 bg-indigo-900 text-white py-6 sm:py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-base sm:text-lg mb-2">
            © 2024 Disease Explorer | All rights reserved | Yashwant
          </p>
          <p className="text-xs sm:text-sm text-indigo-300">
            Powered by advanced medical ontologies and cutting-edge web technologies.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;