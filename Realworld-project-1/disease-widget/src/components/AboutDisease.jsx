import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from 'lucide-react';

export default function AboutDisease({ disease }) {
  
  const Google_Gemini_API = import.meta.env.VITE_GEMINI_API_KEY
  
  // Create an instance of the Generative AI model
  const genAI = new GoogleGenerativeAI(Google_Gemini_API);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (disease) {
      fetchData();
    }
  }, [disease]); // Runs on changes to `disease`

  const fetchData = async () => {
    setLoading(true);  // Set loading state while waiting for the response

    const prompt = `Send causes, precautions, diagnosis, prognosis, complications and symptoms for ${disease.label}. Every field is compulsory. 
    SEND IT IN JSON format, so that I can parse it in js code (only the mentioned data). Add no special characters.
    Send like: 
    {
      causes: []
    },
    here,(DO NOT CHANGE THE FORMAT, FOLLOW THIS EVERYTIME). The data should be converted into object format using JSON.parse`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response.text();

      const parsedData = JSON.parse(response);
      setRes(parsedData);
    } catch (err) {
      console.error("Error fetching AI data: ", err);
      setRes(null);
    }
    setLoading(false);
  };

  const sections = [
    { title: 'Symptoms', data: res?.symptoms },
    { title: 'Causes', data: res?.causes },
    { title: 'Precautions', data: res?.precautions },
    { title: 'Diagnosis', data: res?.diagnosis },
    { title: 'Prognosis', data: res?.prognosis },
    { title: 'Complications', data: res?.complications },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{disease.label}</h2>

      {loading ? (
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-12 w-full bg-gray-200 animate-pulse rounded-md"></div>
          ))}
        </div>
      ) : res ? (
        <div className="space-y-4">
          {sections.map((section, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-lg font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span>{section.title}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? 'transform rotate-180' : ''
                      } w-5 h-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500">
                      {section.data?.map((item, itemIndex) => (
                        <div key={itemIndex} className="mb-2 last:mb-0">
                          <p className="text-sm">{item}</p>
                        </div>
                      ))}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No data available</p>
      )}
    </div>
  );
}

