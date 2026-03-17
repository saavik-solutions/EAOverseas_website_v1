import React, { useState } from 'react';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch(`${API_BASE}/api/inquiries`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setSubmitStatus('idle'), 5000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center p-6 md:p-12 mb-20" id="contact">
            {/* Background Gradient Shapes */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-[80px] -z-10"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-200/40 rounded-full blur-[80px] -z-10"></div>

            <main className="container mx-auto max-w-6xl">
                {/* Main Contact Card Container */}
                <div className="bg-white rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row min-h-[700px] shadow-[0_20px_50px_-12px_rgba(30,99,243,0.15)]">
                    {/* BEGIN: LeftInfoColumn */}
                    <aside className="lg:w-2/5 p-10 md:p-16 flex flex-col justify-between text-white relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #1E63F3 0%, #0a225a 100%)' }}>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Information</h2>
                            <p className="text-blue-100 text-lg leading-relaxed mb-12">
                                Ready to start your journey? Our study abroad experts are here to guide you through every step of your international education.
                            </p>
                            <ul className="space-y-8">
                                {/* Phone Item */}
                                <li className="flex items-start gap-5">
                                    <div className="bg-white/10 p-3 rounded-xl">
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="block text-sm font-medium text-blue-200">Call us</span>
                                        <a className="text-xl font-semibold hover:text-blue-100 transition-colors" href="tel:+919876543210">+91 9876543210</a>
                                    </div>
                                </li>
                                {/* Email Item */}
                                <li className="flex items-start gap-5">
                                    <div className="bg-white/10 p-3 rounded-xl">
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="block text-sm font-medium text-blue-200">Email us</span>
                                        <a className="text-xl font-semibold hover:text-blue-100 transition-colors" href="mailto:info@eaoverseas.com">info@eaoverseas.com</a>
                                    </div>
                                </li>
                                {/* Location Item */}
                                <li className="flex items-start gap-5">
                                    <div className="bg-white/10 p-3 rounded-xl">
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="block text-sm font-medium text-blue-200">Our Office</span>
                                        <address className="text-xl font-semibold not-italic">Hyderabad, India</address>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="pt-12">
                            <p className="text-blue-300 text-sm">Follow EA Overseas for daily updates</p>
                        </div>

                        {/* Subtle circular decoration */}
                        <div className="absolute bottom-[-50px] right-[-50px] width-[200px] height-[200px] rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)', width: '200px', height: '200px' }}></div>
                    </aside>
                    {/* END: LeftInfoColumn */}

                    {/* BEGIN: RightFormColumn */}
                    <div className="lg:w-3/5 p-10 md:p-16 bg-white">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name Input */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-slate-700 ml-1" htmlFor="name">Your Name</label>
                                    <input
                                        className="w-full px-5 py-4 rounded-2xl border-slate-200 border focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 outline-none"
                                        id="name" name="name" placeholder="John Doe" required type="text"
                                        value={formData.name} onChange={handleChange}
                                    />
                                </div>
                                {/* Email Input */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-slate-700 ml-1" htmlFor="email">Email Address</label>
                                    <input
                                        className="w-full px-5 py-4 rounded-2xl border-slate-200 border focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 outline-none"
                                        id="email" name="email" placeholder="john@example.com" required type="email"
                                        value={formData.email} onChange={handleChange}
                                    />
                                </div>
                            </div>
                            {/* Subject Input */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 ml-1" htmlFor="subject">Subject</label>
                                <input
                                    className="w-full px-5 py-4 rounded-2xl border-slate-200 border focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 outline-none"
                                    id="subject" name="subject" placeholder="Study Abroad Inquiry" required type="text"
                                    value={formData.subject} onChange={handleChange}
                                />
                            </div>
                            {/* Message Textarea */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 ml-1" htmlFor="message">Message</label>
                                <textarea
                                    className="w-full px-5 py-4 rounded-2xl border-slate-200 border focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 resize-none outline-none"
                                    id="message" name="message" placeholder="How can we help you achieve your dreams?" required rows={5}
                                    value={formData.message} onChange={handleChange}
                                ></textarea>
                            </div>
                            {/* Form Submission Button */}
                            <div className="pt-4">
                                <button
                                    className={`w-full md:w-auto px-10 py-4 font-bold text-lg rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${submitStatus === 'success' ? 'bg-green-500 text-white' :
                                        submitStatus === 'error' ? 'bg-red-500 text-white' :
                                            'bg-[#1E63F3] text-white hover:bg-blue-600 hover:-translate-y-1 shadow-blue-500/30'
                                        }`}
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    <span>{isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Sent Successfully!' : submitStatus === 'error' ? 'Error Sending' : 'Send Message'}</span>
                                    {submitStatus === 'idle' && !isSubmitting && (
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </form>
                        {/* Trust indicators */}
                        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-start gap-4 text-slate-400 text-sm">
                            <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Your data is protected. We typically reply within 24 hours.</span>
                        </div>
                    </div>
                    {/* END: RightFormColumn */}
                </div>
            </main>
        </section>
    );
};

export default ContactSection;
