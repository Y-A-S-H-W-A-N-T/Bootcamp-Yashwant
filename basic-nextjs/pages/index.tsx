import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react';

const Card = ({ title, description, link, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="group h-full"
  >
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-950/50 via-black/50 to-purple-900/50 p-1">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        <div className="relative h-full rounded-xl bg-black/40 backdrop-blur-xl p-6 sm:p-8 flex flex-col">
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-purple-900 opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-xl rounded-xl" />
          
          {/* Card content */}
          <div className="relative flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium text-purple-400">Featured Link</span>
              </div>
              <div className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors">
              {title}
            </h3>

            <p className="text-white/70 group-hover:text-white/90 transition-colors mb-6 flex-grow">
              {description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                Open Project
              </span>
              <ArrowUpRight className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </div>
      </div>
    </a>
  </motion.div>
);

const LinkData = [
  {
    title: "Greeting App",
    description: "A simple widget which greets you. Takes your name as an input and shows a greeting pop up message",
    link: "https://yashwant-nextjs-ex-1.bootcamp.aganitha.ai"
  },
  {
    title: "Greeting App using Kaminari template",
    description: "Previous project replicated using kaminari boilerplate code. Comes with required environment for a nextjs project",
    link: "https://yashwant-nextjs-ex-2.bootcamp.aganitha.ai"
  },
  {
    title: "Crud App",
    description: "Simple task management app using T3 nextjs, prisma, sqlite and tRPC",
    link: "https://yashwant_t3.bootcamp.aganitha.ai/"
  },
  {
    title: "Product Dashboard using SSG,SSR and State management",
    description: "Simple products website made using static site generation and server side rendering. Using react context for saving favorites (State Management).",
    link: "https://yashwant-nextjs-ex-4.bootcamp.aganitha.ai"
  }
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 sm:px-6 py-8 sm:py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-20"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Basic projects of
            <span className="text-purple-400"> Nextjs</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {LinkData.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              description={item.description}
              link={item.link}
              delay={index * 0.2}
            />
          ))}
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 text-white/50 text-sm sm:text-base"
        >
          <p>© 2025 | Basic Nextjs Projects</p>
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default LandingPage;