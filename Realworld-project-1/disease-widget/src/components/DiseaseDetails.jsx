import { useEffect, useState } from "react";
import axios from "axios";
import { ExternalLink, Loader2, BookOpen, Tag } from 'lucide-react';

const DiseaseDetails = ({ disease, setDiseaseTree }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `/api/ontologies/${disease.ontology_name}/terms`,
          {
            params: {
              id: disease.iri,
            },
          }
        );
        setDetails(data);
        console.log(data?._embedded.terms[0]);
        setDiseaseTree(data?._embedded.terms[0]?._links);
      } catch (error) {
        console.error("Error fetching disease details:", error);
      } finally {
        setLoading(false);
      }
    };    

    if (disease) fetchDetails();
  }, [disease, setDiseaseTree]);

  if (!disease) return null;

  return (
    <div className="bg-gradient-to-br from-purple-100 to-indigo-100 shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 ease-in-out hover:shadow-3xl transform hover:-translate-y-1">
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
        </div>
      ) : details ? (
        <div className="p-8">
          <h2 className="font-extrabold text-3xl text-indigo-800 mb-6 flex items-center justify-between">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              {details?._embedded?.terms[0]?.label}
            </span>
            <a
              href={details?._embedded?.terms[0]?.iri}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-indigo-500 hover:text-indigo-600 transition-colors duration-300"
            >
              <ExternalLink size={24} className="transform hover:scale-110 transition-transform duration-300" />
            </a>
          </h2>
          <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-xl p-6 mb-8 shadow-lg">
            <h3 className="font-semibold text-xl text-indigo-700 mb-3 flex items-center">
              <BookOpen size={20} className="mr-2" />
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {details?._embedded?.terms[0]?.description[0] || "No description available."}
            </p>
          </div>
          <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg">
            <h3 className="font-semibold text-xl text-indigo-700 mb-3 flex items-center">
              <Tag size={20} className="mr-2" />
              Also Known as:
            </h3>
            {details?._embedded?.terms[0]?.synonyms.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {details?._embedded?.terms[0]?.synonyms.map((synonym, index) => (
                  <li key={index} className="bg-indigo-100 rounded-lg p-3 text-indigo-700 hover:bg-indigo-200 transition-colors duration-300 transform hover:scale-105">
                    {synonym}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No synonyms available.</p>
            )}
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-indigo-600 font-medium">
              Ontology ID: {details?._embedded?.terms[0]?.obo_id}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-8">
          <p className="text-gray-500 italic text-center">No details available.</p>
        </div>
      )}
    </div>
  );
};

export default DiseaseDetails;