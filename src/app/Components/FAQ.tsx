"use client";

import { useState } from "react";
import { 
  ChevronDown, 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  Globe, 
  Award, 
  Users, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useFormModal } from "@/context/FormModalContext";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { openModal } = useFormModal();

  const categories = [
    { id: "all", name: "All Questions", icon: HelpCircle },
    { id: "admissions", name: "Admissions", icon: Globe },
    { id: "process", name: "Process", icon: Clock },
    { id: "support", name: "Support", icon: Users },
    { id: "benefits", name: "Benefits", icon: Award }
  ];

  const faqs = [
    {
      question: "What services does Education Times Abroad provide?",
      answer: "Education Times Abroad provides comprehensive study abroad services including university admissions, visa assistance, scholarship guidance, pre-departure orientation, and ongoing support throughout your educational journey.",
      category: "support"
    },
    {
      question: "How do I apply to universities through Education Times Abroad?",
      answer: "Our streamlined application process: 1) Schedule free consultation → 2) Select course & country → 3) Submit documents → 4) We handle applications → 5) Receive offers → 6) Visa & departure support.",
      category: "process"
    },
    {
      question: "Which countries do you help students study in?",
      answer: "We specialize in USA, UK, Canada, Australia, New Zealand, Germany, Ireland, and top European destinations. Each offers unique advantages from world-class education to post-study work opportunities.",
      category: "admissions"
    },
    {
      question: "What are the eligibility requirements for studying abroad?",
      answer: "Requirements vary but typically include academic qualifications, English proficiency (IELTS/TOEFL), statement of purpose, recommendation letters, and financial proof. We evaluate your profile and match you with suitable programs.",
      category: "admissions"
    },
    {
      question: "Do you help with scholarships and financial aid?",
      answer: "Absolutely! We provide comprehensive scholarship support - identifying opportunities, application assistance, and financial planning. Many universities offer exclusive scholarships for our students.",
      category: "benefits"
    },
    {
      question: "How long does the application process take?",
      answer: "Timeline: 4-12 weeks depending on destination. We recommend starting 6-8 months early to ensure smooth processing of applications, visas, and preparations.",
      category: "process"
    }
  ];

  const filteredFaqs = activeCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <section className="relative py-24 bg-[#F8FAFC] overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none">
        <HelpCircle size={400} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4">
              <Sparkles size={14} />
              Information Hub
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none">
              Answers for Your <br />
              <span className="text-blue-600">FAQ.</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium text-lg max-w-sm border-l-2 border-blue-100 pl-6 mb-2">
            Everything you need to know about the admission process, costs, and student support.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-2 bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <p className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Select Category</p>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all ${
                    activeCategory === category.id
                      ? "bg-blue-600 text-white shadow-xl shadow-blue-200"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <category.icon size={20} />
                  {category.name}
                </button>
              ))}
            </div>

            {/* Support Mini-Card */}
            <div className="mt-8 p-8 bg-slate-900 rounded-[2.5rem] text-white overflow-hidden relative group">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-600 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-500" />
              <h4 className="text-xl font-bold mb-2">Still confused?</h4>
              <p className="text-slate-400 text-sm mb-6">Talk to our experts for a personalized roadmap.</p>
              <Button
                onClick={openModal}
                className="w-full bg-white text-slate-900 hover:bg-blue-50 rounded-xl font-black py-6"
              >
                Chat with Us
              </Button>
            </div>
          </aside>

          {/* FAQ Accordion */}
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {filteredFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`group bg-white rounded-[2rem] border transition-all duration-300 ${
                      openIndex === index 
                        ? "border-blue-200 shadow-xl shadow-blue-900/5" 
                        : "border-slate-100 hover:border-blue-100 shadow-sm"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full px-8 py-7 text-left flex items-center justify-between"
                    >
                      <span className={`text-lg font-black transition-colors ${
                        openIndex === index ? "text-blue-600" : "text-slate-800"
                      }`}>
                        {faq.question}
                      </span>
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        openIndex === index ? "bg-blue-600 text-white rotate-180" : "bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600"
                      }`}>
                        <ChevronDown size={20} />
                      </div>
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-8 pb-8">
                        <div className="h-px bg-slate-50 mb-6" />
                        <p className="text-slate-500 font-medium leading-relaxed text-lg">
                          {faq.answer}
                        </p>
                        <div className="mt-6 flex items-center gap-2 text-blue-600 font-bold text-sm cursor-pointer hover:underline">
                          Learn more about this <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Floating Contact Strip */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="mt-20 flex flex-wrap justify-center gap-8 py-8 px-12 bg-white rounded-full border border-slate-100 shadow-sm"
        >
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold">1</div>
             <span className="text-sm font-bold text-slate-700">Quick Support</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold">2</div>
             <span className="text-sm font-bold text-slate-700">Expert Advice</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold">3</div>
             <span className="text-sm font-bold text-slate-700">Zero Charges</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;