import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ContactUs = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
            const response = await fetch(`${apiUrl}/api/v1/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    source: 'Contact Page',
                    data: formData
                })
            });

            const result = await response.json();
            if (result.success) {
                toast.success('Inquiry Synchronized with Institutional Vault');
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                navigate('/thank-you');
            } else {
                throw new Error(result.message);
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
                
                {/* ── Left Column: Institutional Info ── */}
                <div className="space-y-12">
                    <div className="space-y-6">
                        <h2 className="text-[#7a29c2] font-bold tracking-[0.2em] uppercase text-sm">Get In Touch</h2>
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
                            Let's Architect Your <span className="text-[#7a29c2]">Global Future.</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed font-medium max-w-xl">
                            Our global strategists are ready to provide the clarity and expertise you need to navigate international education.
                        </p>
                    </div>

                    <div className="grid gap-8">
                        <div className="flex items-start gap-6 group">
                            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-[#7a29c2] group-hover:bg-[#7a29c2] group-hover:text-white transition-all duration-300 shadow-sm">
                                <span className="material-symbols-outlined text-2xl">mail</span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Email Us</p>
                                <p className="text-xl font-black text-gray-900">info@saaviksolutions.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 group">
                            <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                <span className="material-symbols-outlined text-2xl">call</span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Call Center</p>
                                <p className="text-xl font-black text-gray-900">+1 (408) 741 6969</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 group">
                            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                <span className="material-symbols-outlined text-2xl">location_on</span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Headquarters</p>
                                <a 
                                    href="https://maps.app.goo.gl/wpGfQLZSgCT2c2X49" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block text-xl font-black text-gray-900 leading-relaxed hover:text-[#7a29c2] transition-colors"
                                >
                                    6250 West Park Dr Ste 319,<br />Houston, TX 77057 United States
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Quick Badge */}
                    <div className="p-8 bg-gray-900 rounded-[2.5rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/40 transition-all duration-500"></div>
                        <div className="relative z-10 flex items-center gap-6">
                            <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-3xl animate-pulse">support_agent</span>
                            </div>
                            <div>
                                <h4 className="text-white font-black text-xl">24/7 Priority Support</h4>
                                <p className="text-gray-400 font-medium">For registered EA Scholars and partner institutions.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Right Column: Premium Form ── */}
                <div className="relative">
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-100 rounded-full blur-[100px] -z-10"></div>
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-violet-100 rounded-full blur-[100px] -z-10"></div>
                    
                    <div className="bg-white/70 backdrop-blur-3xl border border-white p-10 md:p-14 rounded-[3rem] shadow-2xl space-y-10">
                        <div className="space-y-2">
                            <h3 className="text-3xl font-black text-gray-900">Send an Inquiry</h3>
                            <p className="text-gray-500 font-medium">Response time: Usually within 2 business hours.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        placeholder="Alex Johnson" 
                                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-900 placeholder-gray-300 focus:ring-2 focus:ring-[#7a29c2]/50 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        placeholder="alex@example.com" 
                                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-900 placeholder-gray-300 focus:ring-2 focus:ring-[#7a29c2]/50 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        placeholder="+91 00000 00000" 
                                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-900 placeholder-gray-300 focus:ring-2 focus:ring-[#7a29c2]/50 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Interest</label>
                                    <select 
                                        value={formData.subject}
                                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-900 focus:ring-2 focus:ring-blue-500/50 transition-all font-medium appearance-none cursor-pointer"
                                    >
                                        <option value="">Select a Subject</option>
                                        <option value="Undergraduate">Undergraduate Study</option>
                                        <option value="Postgraduate">Postgraduate Study</option>
                                        <option value="Visa Guidance">Visa Guidance</option>
                                        <option value="Scholarships">Scholarships</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Your Message</label>
                                <textarea 
                                    rows={4}
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    placeholder="Briefly describe your requirements..."
                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-900 placeholder-gray-300 focus:ring-2 focus:ring-blue-500/50 transition-all font-medium resize-none"
                                ></textarea>
                            </div>

                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-[#7a29c2] hover:bg-purple-700 text-white font-[950] text-xl py-6 rounded-2xl transition-all shadow-xl shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Synchronizing Hub...
                                    </>
                                ) : (
                                    <>
                                        Request Strategic Briefing
                                        <span className="material-symbols-outlined">send</span>
                                    </>
                                )}
                            </button>

                            <p className="text-center text-gray-400 text-xs font-medium">
                                Your data is protected by Saavik Solutions Enterprise Encryption.
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Map Placeholder or Visual Bridge */}
            <div className="mt-24 rounded-[3rem] overflow-hidden h-[400px] relative shadow-2xl">
                <iframe 
                    title="SAAVI Solutions Headquarters"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.851321609353!2d-95.49440849999999!3d29.724065699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c3cb76c7e067%3A0x7d366f36e70be664!2s6250%20Westpark%20Dr%20%23319%2C%20Houston%2C%20TX%2077057%2C%20USA!5e0!3m2!1sen!2sin!4v1774251384681!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none border-[12px] border-white/10 rounded-[3rem]"></div>
            </div>
        </div>
    );
};

export default ContactUs;

