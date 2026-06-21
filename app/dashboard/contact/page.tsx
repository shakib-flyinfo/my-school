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
import { useTheme } from "@/app/components/ThemeProvider";

export default function ContactPage() {
  const { colors, theme } = useTheme();
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
    { name: "Facebook", icon: <Facebook size={18} />, color: "#1877f2", url: "#" },
    { name: "LinkedIn", icon: <Linkedin size={18} />, color: "#0a66c2", url: "#" },
    { name: "Instagram", icon: <Instagram size={18} />, color: "#e4405f", url: "#" },
  ];

  const faqs = [
    { question: "How long does it take to get a response?", answer: "We typically respond within 2 hours during business hours." },
    { question: "Can I visit the campus?", answer: "Yes! Campus visits are available Sunday-Thursday from 9 AM to 4 PM." },
    { question: "How do I apply for admission?", answer: "You can apply online through our admission portal or visit the campus." },
  ];

  return (
    <div 
      className="p-8 font-sans min-h-screen transition-colors duration-300"
      style={{ 
        color: colors.text,
        backgroundColor: colors.background 
      }}
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-20 right-8 z-50 animate-in slide-in-from-right-5">
            <div 
              className="backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
              style={{ backgroundColor: '#10b981' + 'E6' }}
            >
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
            <div 
              className="flex items-center gap-2 font-bold uppercase text-[10px] tracking-[0.3em]"
              style={{ color: colors.primary }}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </div>
            <h2 
              className="text-4xl font-black tracking-tight"
              style={{ color: colors.text }}
            >
              Contact{" "}
              <span 
                className="text-transparent bg-clip-text"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
                }}
              >
                Support
              </span>
            </h2>
            <p 
              className="text-sm max-w-sm"
              style={{ color: colors.textSecondary }}
            >
              Our team is ready to answer any questions you may have. Send a direct message.
            </p>
          </div>
          <div 
            className="hidden lg:flex items-center gap-4 p-4 rounded-3xl border transition-colors"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              borderColor: colors.border,
            }}
          >
            <div 
              className="p-3 rounded-2xl animate-pulse"
              style={{
                backgroundColor: '#10b981' + '20',
                color: '#10b981',
              }}
            >
              <Clock size={24} />
            </div>
            <div>
              <p 
                className="text-[10px] font-bold uppercase"
                style={{ color: colors.textSecondary }}
              >
                Response Time
              </p>
              <p 
                className="text-sm font-bold"
                style={{ color: colors.text }}
              >
                Under 2 Hours
              </p>
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
                className="group border p-6 rounded-2xl transition-all shadow-xl block cursor-pointer"
                style={{
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.primary + '50';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.border;
                }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="p-4 rounded-2xl transition-all duration-500 shadow-lg"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      color: colors.primary,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primary;
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                      e.currentTarget.style.color = colors.primary;
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p 
                      className="text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: colors.textSecondary }}
                    >
                      {item.label}
                    </p>
                    <p 
                      className="text-lg font-bold transition-colors"
                      style={{ color: colors.text }}
                      onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                      onMouseLeave={(e) => e.currentTarget.style.color = colors.text}
                    >
                      {item.val}
                    </p>
                    <p 
                      className="text-xs mt-0.5"
                      style={{ color: colors.textSecondary + '80' }}
                    >
                      {item.sub}
                    </p>
                  </div>
                </div>
              </a>
            ))}

            {/* Social Connect */}
            <div 
              className="p-6 border rounded-2xl text-center space-y-4 shadow-2xl transition-colors"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              <div className="flex justify-center gap-3">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      color: colors.textSecondary,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = social.color;
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                      e.currentTarget.style.color = colors.textSecondary;
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <p 
                className="text-sm font-bold"
                style={{ color: colors.text }}
              >
                Join our community
              </p>
              <div 
                className="flex items-center justify-center gap-2 text-[10px]"
                style={{ color: colors.textSecondary }}
              >
                <Globe size={12} />
                <span>5.2k+ followers</span>
              </div>
            </div>

            {/* Office Hours */}
            <div 
              className="border rounded-2xl p-6 transition-colors"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              <h4 
                className="text-sm font-bold mb-4 flex items-center gap-2"
                style={{ color: colors.text }}
              >
                <Clock size={16} style={{ color: colors.primary }} />
                Office Hours
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span style={{ color: colors.textSecondary }}>Sunday - Thursday</span>
                  <span style={{ color: colors.text }}>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span style={{ color: colors.textSecondary }}>Friday</span>
                  <span style={{ color: colors.text }}>Closed</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span style={{ color: colors.textSecondary }}>Saturday</span>
                  <span style={{ color: colors.text }}>10:00 AM - 2:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-2">
            <div 
              className="border rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden transition-colors"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <MessageSquare size={120} style={{ color: colors.text }} />
              </div>

              <div className="relative z-10 space-y-8">
                <h3 
                  className="text-xl font-bold"
                  style={{ color: colors.text }}
                >
                  Send us a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label 
                        className="text-[10px] font-bold uppercase ml-2 flex items-center gap-1"
                        style={{ color: colors.textSecondary }}
                      >
                        <User size={12} /> Full Name <span style={{ color: colors.primary }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Sakib Ahmed"
                        className={`w-full border rounded-2xl px-5 py-3.5 text-sm transition-all focus:outline-none`}
                        style={{
                          backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                          borderColor: errors.name ? '#ef4444' : colors.border,
                          color: colors.text,
                        }}
                        onFocus={(e) => {
                          if (!errors.name) {
                            e.target.style.borderColor = colors.primary + '80';
                          }
                        }}
                        onBlur={(e) => {
                          if (!errors.name) {
                            e.target.style.borderColor = colors.border;
                          }
                        }}
                      />
                      {errors.name && (
                        <p className="text-[10px] ml-2 flex items-center gap-1" style={{ color: '#ef4444' }}>
                          <AlertCircle size={10} /> {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label 
                        className="text-[10px] font-bold uppercase ml-2 flex items-center gap-1"
                        style={{ color: colors.textSecondary }}
                      >
                        <AtSign size={12} /> Email Address <span style={{ color: colors.primary }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@example.com"
                        className={`w-full border rounded-2xl px-5 py-3.5 text-sm transition-all focus:outline-none`}
                        style={{
                          backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                          borderColor: errors.email ? '#ef4444' : colors.border,
                          color: colors.text,
                        }}
                        onFocus={(e) => {
                          if (!errors.email) {
                            e.target.style.borderColor = colors.primary + '80';
                          }
                        }}
                        onBlur={(e) => {
                          if (!errors.email) {
                            e.target.style.borderColor = colors.border;
                          }
                        }}
                      />
                      {errors.email && (
                        <p className="text-[10px] ml-2 flex items-center gap-1" style={{ color: '#ef4444' }}>
                          <AlertCircle size={10} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label 
                      className="text-[10px] font-bold uppercase ml-2"
                      style={{ color: colors.textSecondary }}
                    >
                      Subject <span style={{ color: colors.primary }}>*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full border rounded-2xl px-5 py-3.5 text-sm transition-all focus:outline-none appearance-none cursor-pointer`}
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        borderColor: errors.subject ? '#ef4444' : colors.border,
                        color: colors.text,
                      }}
                      onFocus={(e) => {
                        if (!errors.subject) {
                          e.target.style.borderColor = colors.primary + '80';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.subject) {
                          e.target.style.borderColor = colors.border;
                        }
                      }}
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
                      <p className="text-[10px] ml-2" style={{ color: '#ef4444' }}>{errors.subject}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label 
                      className="text-[10px] font-bold uppercase ml-2"
                      style={{ color: colors.textSecondary }}
                    >
                      Message <span style={{ color: colors.primary }}>*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help..."
                      className={`w-full border rounded-2xl px-5 py-3.5 text-sm transition-all focus:outline-none resize-none`}
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        borderColor: errors.message ? '#ef4444' : colors.border,
                        color: colors.text,
                      }}
                      onFocus={(e) => {
                        if (!errors.message) {
                          e.target.style.borderColor = colors.primary + '80';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.message) {
                          e.target.style.borderColor = colors.border;
                        }
                      }}
                    ></textarea>
                    {errors.message && (
                      <p className="text-[10px] ml-2 flex items-center gap-1" style={{ color: '#ef4444' }}>
                        <AlertCircle size={10} /> {errors.message}
                      </p>
                    )}
                    <p 
                      className="text-[10px] text-right"
                      style={{ color: colors.textSecondary }}
                    >
                      {formData.message.length}/500 characters
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto flex items-center justify-center gap-3 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                      boxShadow: `0 10px 25px -5px ${colors.primary}40`,
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.boxShadow = `0 15px 30px -5px ${colors.primary}60`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.boxShadow = `0 10px 25px -5px ${colors.primary}40`;
                      }
                    }}
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

                  <div className="pt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter">
                    <CheckCircle2 size={14} style={{ color: '#10b981' }} />
                    <span style={{ color: colors.textSecondary }}>
                      By sending, you agree to our privacy policy.
                    </span>
                  </div>
                </form>
              </div>
            </div>

            {/* FAQ Section */}
            <div 
              className="mt-6 border rounded-3xl p-6 transition-colors"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              <h4 
                className="text-sm font-bold mb-4 flex items-center gap-2"
                style={{ color: colors.text }}
              >
                <HelpCircle size={16} style={{ color: colors.primary }} />
                Frequently Asked Questions
              </h4>
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <details key={idx} className="group">
                    <summary className="flex items-center justify-between cursor-pointer text-sm p-3 rounded-xl transition-colors list-none"
                      style={{ color: colors.text }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                        e.currentTarget.style.color = colors.primary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = colors.text;
                      }}
                    >
                      <span>{faq.question}</span>
                      <ChevronRight 
                        size={14} 
                        className="group-open:rotate-90 transition-transform"
                        style={{ color: colors.textSecondary }}
                      />
                    </summary>
                    <p 
                      className="text-xs p-3 pt-0"
                      style={{ color: colors.textSecondary }}
                    >
                      {faq.answer}
                    </p>
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