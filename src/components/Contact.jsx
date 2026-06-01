import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone, Facebook, Linkedin, Twitter } from "lucide-react";

const socialLinks = [
    {
        name: "WhatsApp",
        value: "+961 76876530",
        href: "https://wa.me/96176876530",
        icon: <Phone className="w-6 h-6" />
    },
    {
        name: "Email",
        value: "contact@asad-allah.com",
        href: "mailto:contact@asad-allah.com",
        icon: <Mail className="w-6 h-6" />
    },
    {
        name: "Facebook",
        value: "Assad Allah Alebrahim",
        href: "https://www.facebook.com/AssadAllahAlebrahim/",
        icon: <Facebook className="w-6 h-6" />
    },
    {
        name: "LinkedIn",
        value: "Connect with me",
        href: "https://linkedin.com/in/assad-allah-alebrahim",
        icon: <Linkedin className="w-6 h-6" />
    }
];

const Contact = () => {
    return (
        <section id="contact" className="py-24 md:py-40 px-6 md:px-12 bg-black text-white relative overflow-hidden">
            <div className="container max-w-6xl mx-auto relative z-10">
                {/* HEADLINE */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 border-b border-white/20 pb-8">
                    <div>
                        <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-[0.3em] mb-4 block">
                            05 / Contact
                        </span>
                        <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter leading-[0.8]">
                            Start the <br />
                            <span className="font-sans font-bold not-italic text-white">Dialogue.</span>
                        </h2>
                    </div>
                </div>

                {/* LINKS LIST (Architectural Table) */}
                <div className="flex flex-col">
                    {socialLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative flex items-center justify-between py-12 border-b border-white/20 hover:bg-white transition-colors duration-500 px-4 -mx-4 cursor-pointer"
                        >
                            {/* TEXT CONTENT */}
                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12 relative z-10">
                                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest min-w-[100px] group-hover:text-black transition-colors delay-75">
                                    {link.name}
                                </span>
                                <span className="text-sm md:text-5xl font-bold text-gray-300 group-hover:text-black transition-colors duration-300 break-all text-right">
                                    {link.value}
                                </span>
                            </div>

                            {/* ARROW ICON */}
                            <div className="relative z-10 p-4 border rounded-full border-white/20 text-white group-hover:border-black group-hover:text-black group-hover:rotate-45 transition-all duration-500">
                                <ArrowUpRight size={24} />
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* FOOTER */}
                <div className="mt-40 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-gray-600 uppercase tracking-widest">
                    <p>© 2026 Assad Allah Alebrahim</p>
                    <p>Designed in Damascus</p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
