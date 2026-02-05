import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import TiltCard from "./ui/TiltCard";
import TextScramble from "./ui/TextScramble";
import { WordReveal, LineReveal } from "./ui/RevealText";
import { MagneticWrapper } from "./ui/MagneticButton";

const works = [
  {
    id: "01",
    name: "VocabMaster",
    cat: "AI Platform",
    desc: "Next-gen language learning with RAG & Agentic workflows.",
    link: "https://github.com/assadAllah630/vocab-web",
    color: "#0a0a0a",
    image: "/images/vocab_showcase.png",
    year: "2024",
  },
  {
    id: "02",
    name: "Sheikh Al Jabal Store",
    cat: "E-Commerce",
    desc: "Enterprise Flutter application with Clean Architecture.",
    link: "https://github.com/mahmoodhamdi/TStore",
    color: "#3b82f6",
    image: "/images/tstore_showcase.png",
    year: "2024",
  },
  {
    id: "03",
    name: "Backup POS",
    cat: "System Utility",
    desc: "Offline-first resilience engineering for retail.",
    link: "https://github.com/assadAllah630/Backup_POS",
    color: "#f97316",
    image: "/images/backup_pos_showcase.png",
    year: "2023",
  },
];

const ProjectsBentoEnhanced = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={containerRef}
      id="work" 
      className="py-40 px-6 md:px-12 bg-[#FAFAFA] relative overflow-hidden"
    >
      {/* Background decorative element */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute -right-1/4 top-1/4 w-[800px] h-[800px] rounded-full opacity-5 pointer-events-none"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-transparent blur-3xl" />
      </motion.div>

      <div className="container max-w-6xl mx-auto relative z-10">
        {/* Header with scramble effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-24 text-center"
        >
          <LineReveal>
            <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-[0.3em] mb-4 block">
              03 / Impact
            </span>
          </LineReveal>
          
          <h2 className="text-2xl md:text-6xl font-bold text-gray-200 mt-4 tracking-tight uppercase">
            <WordReveal text="Selected Works" staggerDelay={0.1} />
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-32">
          {works.map((work, index) => (
            <ProjectCard 
              key={work.id} 
              work={work} 
              index={index}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>

        {/* View All Link */}
        <motion.div 
          className="mt-40 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <MagneticWrapper strength={0.15}>
            <motion.a
              href="https://github.com/assadAllah630"
              target="_blank"
              className="group inline-block text-xl font-medium text-gray-900 relative"
              whileHover={{ scale: 1.02 }}
            >
              <span className="relative z-10">
                <TextScramble text="View Full Archive" />
              </span>
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-black"
                initial={{ scaleX: 1 }}
                whileHover={{ scaleX: 0, originX: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              />
            </motion.a>
          </MagneticWrapper>
        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard = ({ work, index, isReversed }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-16 items-center`}
    >
      {/* Image with 3D tilt */}
      <motion.div 
        className="w-full md:w-2/3"
        style={{ opacity }}
      >
        <TiltCard tiltAmount={5} glareEnabled={true} scale={1.01}>
          <motion.a
            href={work.link}
            target="_blank"
            className="group block relative aspect-video overflow-hidden rounded-lg bg-gray-100"
            data-cursor="pointer"
          >
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-lg z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              style={{
                background: `linear-gradient(135deg, ${work.color}40 0%, transparent 50%)`,
              }}
            />

            {/* Image container with parallax */}
            <motion.div
              className="w-full h-full relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.img
                src={work.image}
                alt={work.name}
                className="w-full h-full object-cover"
                style={{ scale: imageScale }}
              />
              
              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"
              />
              
              {/* View project indicator */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-white flex items-center justify-center"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight className="w-8 h-8 text-gray-900" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Project number badge */}
            <motion.div
              className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-xs font-mono font-bold text-gray-900">
                {work.id}
              </span>
            </motion.div>
          </motion.a>
        </TiltCard>
      </motion.div>

      {/* Content */}
      <div className={`w-full md:w-1/3 ${isReversed ? "md:text-right" : ""}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Year */}
          <motion.span
            className="text-xs font-mono text-gray-400 block mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {work.year}
          </motion.span>

          {/* Title with hover scramble */}
          <motion.a
            href={work.link}
            target="_blank"
            className="block group"
            data-cursor="pointer"
          >
            <h3 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4 group-hover:text-gray-700 transition-colors">
              {work.name}
            </h3>
          </motion.a>

          {/* Category badge */}
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <span 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: work.color }}
            />
            <span className="text-xs font-mono uppercase text-gray-500">
              {work.cat}
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-gray-500 font-light leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {work.desc}
          </motion.p>

          {/* Link indicator */}
          <motion.a
            href={work.link}
            target="_blank"
            className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-gray-900 group"
            data-cursor="pointer"
            whileHover={{ x: isReversed ? -5 : 5 }}
          >
            <span className="border-b border-gray-300 group-hover:border-gray-900 transition-colors">
              View Project
            </span>
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectsBentoEnhanced;
