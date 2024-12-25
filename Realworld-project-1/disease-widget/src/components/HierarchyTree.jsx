import { useEffect, useState } from "react";
import { ChevronRight, ChevronDown, Activity } from 'lucide-react';
import axios from "axios";

const HierarchyTree = ({ disease, diseaseTree }) => {
  const [tree, setTree] = useState([]);
  const [collapsed, setCollapsed] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHierarchy = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${diseaseTree?.jstree?.href}`);
        setTree(response?.data);
      } catch (error) {
        console.error("Error fetching hierarchy:", error);
      } finally {
        setLoading(false);
      }
    };

    if (disease) fetchHierarchy();
  }, [disease, diseaseTree]);

  const getNodeLevel = (node, nodes) => {
    let level = 0;
    let currentParent = node.parent;
    while (currentParent !== '#') {
      level++;
      const parentNode = nodes.find(n => n.id === currentParent);
      currentParent = parentNode ? parentNode.parent : '#';
    }
    return level;
  };

  const renderTree = (nodes, parent = '#') => {
    return nodes
      ?.filter(node => node.parent === parent)
      .map(node => {
        const level = getNodeLevel(node, nodes);
        const hasChildren = nodes.some(n => n.parent === node.id);
        return (
          <div key={node.id} className="transition-all duration-300 ease-in-out">
            <div className="flex items-center py-2 hover:bg-indigo-50 rounded-lg transition-all duration-200 group">
              <div className="flex items-center w-full" style={{ paddingLeft: `${level * 20}px` }}>
                {hasChildren && (
                  <button 
                    onClick={() => toggleNode(node.id)}
                    className="p-2 hover:bg-indigo-200 rounded-full transition-all duration-200 mr-2 transform group-hover:scale-110"
                    aria-label={collapsed[node.id] ? "Expand" : "Collapse"}
                  >
                    {collapsed[node.id] ? (
                      <ChevronRight size={18} className="text-indigo-600" />
                    ) : (
                      <ChevronDown size={18} className="text-indigo-600" />
                    )}
                  </button>
                )}
                <span 
                  className={`text-sm flex-grow ${
                    node.text === disease?.label 
                      ? "text-indigo-600 font-semibold" 
                      : "text-gray-700 group-hover:text-indigo-800"
                  } transition-all duration-200`}
                >
                  {node.text}
                </span>
                {node.text === disease?.label && (
                  <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                    Current
                  </span>
                )}
              </div>
            </div>
            {!collapsed[node.id] && (
              <div className="overflow-hidden transition-all duration-300 ease-in-out">
                {renderTree(nodes, node.id)}
              </div>
            )}
          </div>
        );
      });
  };

  const toggleNode = (nodeId) => {
    setCollapsed(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-8">
        <h3 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Activity className="mr-3 text-indigo-600" />
          Disease Hierarchy
        </h3>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-2xl p-6 shadow-inner">
            <div className="max-h-[60vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
              {Array.isArray(tree) && tree.length > 0 ? (
                renderTree(tree)
              ) : (
                <p className="text-gray-500 italic text-center py-8">No hierarchy data available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HierarchyTree;