import { motion } from "framer-motion";
import { FileText, FileJson, Workflow, GitMerge, FileSpreadsheet, Database, Download, Eye, ArrowUpRight } from "lucide-react";

const documents = [
    {
        title: "Prodaio SRS & Plan",
        type: "Software Requirements",
        description: "Comprehensive software requirements specification for Prodaio, detailing functional scope, user stories, and system architecture.",
        tags: ["SRS", "Planning", "Prodaio"],
        icon: <FileText size={20} />,
        file: "/documents/Prodaio_SRS.pdf"
    },
    {
        title: "Wafa Telecom E-Care FRS",
        type: "Functional Spec",
        description: "Functional requirement specification for the Wafa Telecom E-Care Portal (Web & Mobile), defining user journeys and API integrations.",
        tags: ["FRS", "Telecom", "Portal"],
        icon: <Workflow size={20} />,
        file: "/documents/Wafa_ECare_FRS.pdf"
    },
    {
        title: "New SIM Architecture (HLD)",
        type: "High-Level Design",
        description: "Restructured High-Level Design (HLD) showing the architectural overhaul for the new SIM management system.",
        tags: ["Architecture", "HLD", "System Design"],
        icon: <Database size={20} />,
        file: "/documents/Wafa_SIM_HLD_V3.pdf"
    },
    {
        title: "DIVPOS Technical Docs",
        type: "Technical Documentation",
        description: "Technical reference and user manual for the DIVPOS system, covering installation, configuration, and troubleshooting.",
        tags: ["Manual", "POS", "Retail"],
        icon: <FileJson size={20} />,
        file: "/documents/Cogent_DIVPOS_Docs.pdf"
    },
    {
        title: "Strategic Market Analysis",
        type: "Business Strategy",
        description: "In-depth market positioning analysis identifying key growth opportunities and competitive landscape.",
        tags: ["Strategy", "Marketing", "Analysis"],
        icon: <GitMerge size={20} />,
        file: "/documents/Marketing_Analysis.pdf"
    },
    {
        title: "Prodaio Business Proposal",
        type: "Business Proposal",
        description: "Strategic business proposal outlining the value proposition, revenue model, and go-to-market strategy for Prodaio.",
        tags: ["Proposal", "Startup", "Business"],
        icon: <FileSpreadsheet size={20} />,
        file: "/documents/Prodaio_Proposal.pdf"
    }
];

const BusinessAnalysis = () => {
    return (
        <section id="analysis" className="py-32 px-6 md:px-12 bg-[#FAFAFA] text-gray-900 border-t border-gray-100 relative">
            {/* Subtle Grid Pattern Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>

            <div className="container max-w-7xl mx-auto relative z-10">

                {/* HEADLINE */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-200 pb-8"
                >
                    <div>
                        <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-[0.3em] mb-4 block">
                            04 / The Blueprint
                        </span>
                        <h2 className="text-2xl md:text-6xl font-bold text-gray-900 mt-4 tracking-tight uppercase">
                            System Analysis <br /> <span className="text-gray-300 font-serif italic lowercase">& Documentation</span>
                        </h2>
                    </div>
                </motion.div>

                {/* PRO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {documents.map((doc, index) => (
                        <DocumentCard key={index} doc={doc} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
};

const DocumentCard = ({ doc, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className="group relative bg-white p-6 md:p-8 hover:bg-gray-50 transition-all duration-500 cursor-pointer border border-gray-100 hover:border-gray-300 overflow-hidden"
            onClick={() => window.open(doc.file, "_blank")}
        >
            {/* Hover Accent Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

            <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-gray-50 rounded-full text-gray-400 group-hover:text-black group-hover:bg-white border border-transparent group-hover:border-gray-200 transition-all duration-300">
                    {doc.icon}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight size={20} className="text-gray-400" />
                </div>
            </div>

            <div className="mb-6">
                <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest mb-2 block">
                    {doc.type}
                </span>
                <h3 className="text-2xl font-serif text-gray-900 italic leading-tight group-hover:underline decoration-1 underline-offset-4">
                    {doc.title}
                </h3>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-8 border-l-2 border-gray-100 pl-4">
                {doc.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
                {doc.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider text-gray-400 border border-gray-100 px-2 py-1 rounded-full group-hover:border-gray-300 transition-colors">
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

export default BusinessAnalysis;
