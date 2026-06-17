"use client";
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Globe,
  CheckCircle2,
  HelpCircle,
 
  AlertCircle,
  User,
  AtSign,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  const socialLinks = [
    { name: "Facebook", icon: <Facebook size={18} />, color: "hover:bg-blue-600", url: "#" },
    { name: "LinkedIn", icon: <Linkedin size={18} />, color: "hover:bg-blue-700", url: "#" },
    { name: "Instagram", icon: <Instagram size={18} />, color: "hover:bg-pink-600", url: "#" },
  ];

  const faqs = [
    { question: "How long does it take to get a response?", answer: "We typically respond within 2 hours during business hours." },
    { question: "Can I visit the campus?", answer: "Yes! Campus visits are available Sunday-Thursday from 9 AM to 4 PM." },
    { question: "How do I apply for admission?", answer: "You can apply online through our admission portal or visit the campus." },
  ];

  return (
    <div className="p-8 font-sans text-gray-200 min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-20 right-8 z-50 animate-in slide-in-from-right-5">
            <div className="bg-emerald-500/90 backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
              <CheckCircle2 size={24} />
              <div>
                <p className="font-bold">Message Sent!</p>
                <p className="text-sm opacity-90">We'll get back to you soon.</p>
              </div>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-500 font-bold uppercase text-[10px] tracking-[0.3em]">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight">
              Contact{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-orange-500">
                Support
              </span>
            </h2>
            <p className="text-gray-500 text-sm max-w-sm">
              Our team is ready to answer any questions you may have. Send a direct message.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10">
            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500 animate-pulse">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase">
                Response Time
              </p>
              <p className="text-sm font-bold text-white">Under 2 Hours</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Contact Info */}
          <div className="space-y-6">
            {[
              {
                icon: <Mail size={20} />,
                label: "Email Us",
                val: "support@school.edu",
                sub: "For general inquiries",
                action: "mailto:support@school.edu",
              },
              {
                icon: <Phone size={20} />,
                label: "Call Directly",
                val: "+880 1700-000000",
                sub: "Sun - Thu, 9am - 5pm",
                action: "tel:+8801700000000",
              },
              {
                icon: <MapPin size={20} />,
                label: "Our Location",
                val: "Dhatiya Para, Dhaka",
                sub: "Visit our campus office",
                action: "https://maps.google.com",
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.action}
                target={item.action.startsWith("http") ? "_blank" : undefined}
                rel={item.action.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group bg-[#1e1e2d] border border-white/5 p-6 rounded-2xl hover:border-red-500/30 transition-all shadow-xl block cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-500 shadow-lg">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      {item.label}
                    </p>
                    <p className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                      {item.val}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">{item.sub}</p>
                  </div>
                </div>
              </a>
            ))}

            {/* Social Connect */}
            <div className="p-6 bg-linear-to-br from-[#1e1e2d] to-[#1a1a27] border border-white/5 rounded-2xl text-center space-y-4 shadow-2xl">
              <div className="flex justify-center gap-3">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 transition-all ${social.color} hover:text-white hover:scale-110`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <p className="text-sm font-bold text-gray-300">
                Join our community
              </p>
              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500">
                <Globe size={12} />
                <span>5.2k+ followers</span>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-[#1e1e2d] border border-white/5 rounded-2xl p-6">
              <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Clock size={16} className="text-red-500" />
                Office Hours
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Sunday - Thursday</span>
                  <span className="text-white">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Friday</span>
                  <span className="text-white">Closed</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Saturday</span>
                  <span className="text-white">10:00 AM - 2:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#1e1e2d] border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <MessageSquare size={120} className="text-white" />
              </div>

              <div className="relative z-10 space-y-8">
                <h3 className="text-xl font-bold text-white">Send us a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase ml-2 flex items-center gap-1">
                        <User size={12} /> Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Sakib Ahmed"
                        className={`w-full bg-white/5 border ${
                          errors.name ? "border-red-500" : "border-white/10"
                        } rounded-2xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-red-500/50 transition-all`}
                      />
                      {errors.name && (
                        <p className="text-[10px] text-red-500 ml-2 flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase ml-2 flex items-center gap-1">
                        <AtSign size={12} /> Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@example.com"
                        className={`w-full bg-white/5 border ${
                          errors.email ? "border-red-500" : "border-white/10"
                        } rounded-2xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-red-500/50 transition-all`}
                      />
                      {errors.email && (
                        <p className="text-[10px] text-red-500 ml-2 flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase ml-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full bg-white/5 border ${
                        errors.subject ? "border-red-500" : "border-white/10"
                      } rounded-2xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-red-500/50 transition-all appearance-none cursor-pointer`}
                    >
                      <option value="">Select a subject</option>
                      <option value="Admission Inquiry">📚 Admission Inquiry</option>
                      <option value="Technical Support">💻 Technical Support</option>
                      <option value="Billing & Fees">💰 Billing & Fees</option>
                      <option value="General Question">❓ General Question</option>
                      <option value="Complaint">📝 Complaint</option>
                      <option value="Other">📌 Other</option>
                    </select>
                    {errors.subject && (
                      <p className="text-[10px] text-red-500 ml-2">{errors.subject}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase ml-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help..."
                      className={`w-full bg-white/5 border ${
                        errors.message ? "border-red-500" : "border-white/10"
                      } rounded-2xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-red-500/50 transition-all resize-none`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-[10px] text-red-500 ml-2 flex items-center gap-1">
                        <AlertCircle size={10} /> {errors.message}
                      </p>
                    )}
                    <p className="text-[10px] text-gray-500 text-right">
                      {formData.message.length}/500 characters
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto flex items-center justify-center gap-3 bg-linear-to-r from-red-600 to-orange-500 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-red-600/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>

                  <div className="pt-4 flex items-center gap-2 text-[10px] text-gray-600 font-bold uppercase tracking-tighter">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    By sending, you agree to our privacy policy.
                  </div>
                </form>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-6 bg-[#1e1e2d] border border-white/5 rounded-3xl p-6">
              <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <HelpCircle size={16} className="text-red-500" />
                Frequently Asked Questions
              </h4>
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <details key={idx} className="group">
                    <summary className="flex items-center justify-between cursor-pointer text-sm text-gray-300 hover:text-red-400 transition-colors p-3 rounded-xl hover:bg-white/5 list-none">
                      <span>{faq.question}</span>
                      <ChevronRight size={14} className="group-open:rotate-90 transition-transform" />
                    </summary>
                    <p className="text-xs text-gray-500 p-3 pt-0">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}