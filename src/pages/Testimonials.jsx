import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Testimonials = () => {
    return (
        <div className="bg-white font-display text-[#111218] antialiased min-h-screen">
            <Navbar />

            <main className="max-w-[1200px] mx-auto px-6 py-12">
                {/* Page Heading */}
                <section className="mb-12">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl font-black leading-tight tracking-[-0.033em] mb-4">Real Stories, <span className="text-primary text-[#193ce6]">Real Success</span></h1>
                        <p className="text-lg text-gray-600 leading-relaxed">Discover authentic experiences from our global community of students and parents who turned their international education dreams into reality.</p>
                    </div>
                </section>

                {/* Filter Chips */}
                <section className="mb-12 sticky top-[80px] z-40 bg-white/90 backdrop-blur-sm py-4">
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                        <button className="flex h-10 shrink-0 items-center justify-center rounded-full bg-[#193ce6] text-white px-6 text-sm font-semibold shadow-md shadow-primary/20">All</button>
                        <button className="flex h-10 shrink-0 items-center justify-center rounded-full bg-white border border-gray-200 hover:border-[#193ce6] px-6 text-sm font-medium transition-all">Students</button>
                        <button className="flex h-10 shrink-0 items-center justify-center rounded-full bg-white border border-gray-200 hover:border-[#193ce6] px-6 text-sm font-medium transition-all">Parents</button>
                        <button className="flex h-10 shrink-0 items-center justify-center rounded-full bg-white border border-gray-200 hover:border-[#193ce6] px-6 text-sm font-medium transition-all">Test Preparation</button>
                        <button className="flex h-10 shrink-0 items-center justify-center rounded-full bg-white border border-gray-200 hover:border-[#193ce6] px-6 text-sm font-medium transition-all">University Selection</button>
                        <button className="flex h-10 shrink-0 items-center justify-center rounded-full bg-white border border-gray-200 hover:border-[#193ce6] px-6 text-sm font-medium transition-all">Visa Guidance</button>
                    </div>
                </section>

                {/* Testimonials Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
                        <div className="text-[#193ce6] mb-4 opacity-30 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-[40px]">format_quote</span>
                        </div>
                        <p className="text-gray-700 italic mb-8 leading-relaxed">"The step-by-step guidance for my UK university applications made a complex process feel effortless. I couldn't have done it without them."</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-cover bg-center ring-2 ring-primary/10" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD3vSTzgnXQwWuF6tb6s3A6KiU42KppRA9uAzTFLXZkBqX54i8QwLwEfanWvulTKTkxQKoNbOC6sfL-2cTSMMalQBBA4sxSPOyZmNnG6iFyy40xh-Lhr_ky0sVn9UtXTwkKx3o1A5j7Kt8gBo0WKomun0_9BbWnbYAC_AVnaXKGvnZ3gO6No19epKSp9yiWpwlxopy01AxxwxNS5wKr1LIkW8ReHcF5yGkYJmzeStKrDs07F2oJGpKgRQHMNfPwz3FGS3fwHPhIV9U')" }}></div>
                            <div>
                                <h4 className="font-bold text-[#111218]">Aarav Mehta</h4>
                                <p className="text-xs text-gray-500">MSc Data Science, UK</p>
                            </div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
                        <div className="text-[#193ce6] mb-4 opacity-30 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-[40px]">format_quote</span>
                        </div>
                        <p className="text-gray-700 italic mb-8 leading-relaxed">"As a parent, I was worried about the visa process. EAOverseas was professional, transparent, and kept us updated every single day."</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-cover bg-center ring-2 ring-primary/10" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB6XVKwUb1zYsjc6hU8HpzA3d3bTLvBs0aHEaFTfKSyytqhe0qJLijE7OhP4KsVUiaZsQWj58-gNVMB0z7g7ePtNaEjABKkL7A4A-f_q-yO4beKxKtDaVQzRczlzDJin9nR086xBkYqhInjs1xhqhIXMV6VD5-smNmeM7sLOyTXgnSJJiUQslsgcbrVLoPIMECQLxlnung2W5BSKE7XSu4gRIki1WWmwEPjrOrCPbWF-YmYk9hu5NgRBPNldBtPB86od_FR-Km71m0')" }}></div>
                            <div>
                                <h4 className="font-bold text-[#111218]">Sarah Jenkins</h4>
                                <p className="text-xs text-gray-500">Parent of Graduate</p>
                            </div>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
                        <div className="text-[#193ce6] mb-4 opacity-30 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-[40px]">format_quote</span>
                        </div>
                        <p className="text-gray-700 italic mb-8 leading-relaxed">"The test prep courses helped me jump from a 6.5 to an 8.0 in IELTS. The teachers are truly experts in their field."</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-cover bg-center ring-2 ring-primary/10" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFyMOSx5eMNEqwDwi_NEfMVMKAr94oJzMyIf7pTlJjDj9atLOyyg8iWFiajMai7-3u-zn0SI4tY1aAZh_t_dMkzjk9UsXJiVS2YeKmhV9_ATtLBqckt3XSrkWeP6BChXnqalHQo_V_fwdcFnHm0xwo7kJm0bcuabtQSEj7gCvzN_aXvT7RCdbnywA5mGVKDGCqgX5H5Hmb9EoudCDseGLu55pnHY1lCUkLKxDzsBtreEkd9MctVGBtmQdRLmk46KYZJEJ-PcviNCk')" }}></div>
                            <div>
                                <h4 className="font-bold text-[#111218]">Li Wei</h4>
                                <p className="text-xs text-gray-500">Test Prep Candidate</p>
                            </div>
                        </div>
                    </div>
                    {/* Card 4 */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
                        <div className="text-[#193ce6] mb-4 opacity-30 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-[40px]">format_quote</span>
                        </div>
                        <p className="text-gray-700 italic mb-8 leading-relaxed">"I was confused between Canada and Australia. Their university selection tool and counseling session gave me total clarity."</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-cover bg-center ring-2 ring-primary/10" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJ9eu0aNiDJRJcFiYhZTjkh2nUmYkG2FZb1jrH88T_qU_MbRC-QTNrWlstp8HLbLHwDQb6-7Ojhkqm-bggPXkisujN5yZz-vVtQo0a4xBijJ_Qoo7cxgTauXa5TVc74eGM9sr3DmZd6s-Hy-iCaoXBATasH6q0BzrBhy04ALJCC42ynlILtTeFSCqbbSOJZuBlwZGQRc43EyiiDKAlT6_XLQs3V-pzryxAx6d1TA6GSC-qh7O7Yk211DBbLI8ysdAmFux0SgLEPFQ')" }}></div>
                            <div>
                                <h4 className="font-bold text-[#111218]">Priya Singh</h4>
                                <p className="text-xs text-gray-500">Bachelors, Australia</p>
                            </div>
                        </div>
                    </div>
                    {/* Card 5 */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
                        <div className="text-[#193ce6] mb-4 opacity-30 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-[40px]">format_quote</span>
                        </div>
                        <p className="text-gray-700 italic mb-8 leading-relaxed">"The visa guidance was flawless. I received my F-1 visa for the USA without a single hitch. Highly recommended."</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-cover bg-center ring-2 ring-primary/10" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB3Nn3nkBkRSDROOWTrnAcgJQCzZAeckz-pWCQVxPnrOCBw0myekg9tcU3Bdvvjat8o52XwUNQpiNBZBIxrDpzGZrZozVF25Nc5CwfaxkCQcDl6p9lzroFlWgUSWo-ioNDJb5k4_vwM3UFWMFqNkB21gZ_nkk5D0d755ST9q4ED_Na_NqSZjq6k95gf8lFsxrTWdT-gnlQkJ9ihxYCjzWwOHWbZSczoaLCyGIMABIKSLxsWVIpHxT3JIEG89ymS9UCzQjQuPrMjYns')" }}></div>
                            <div>
                                <h4 className="font-bold text-[#111218]">David Miller</h4>
                                <p className="text-xs text-gray-500">MBA, USA</p>
                            </div>
                        </div>
                    </div>
                    {/* Card 6 */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
                        <div className="text-[#193ce6] mb-4 opacity-30 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-[40px]">format_quote</span>
                        </div>
                        <p className="text-gray-700 italic mb-8 leading-relaxed">"Finding a scholarship felt impossible until I joined EAOverseas. They found opportunities I didn't even know existed."</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-cover bg-center ring-2 ring-primary/10" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAUj8f_mdgy5SVJN_i-scTYs71noallgdsagD5hl-v4tXjxwwvqrD4NOTIfqs9sqrgXwQV4s9xoe6WtyU5W4HHcZYpKYm1u0wLwoOPzFCW31_PQU9YpVWyWtjx6ABiJtTIvdRz75mzAPZFUMgGJ5QShbRXODCaaWeTKYaffbQcLf0cJTI2DJld0BzssRBnF0jdckZ0lSI_qFx5D08NY5qdYb4hZgwtbZx5pS11eDxqd2SsjUi-qQ9mYs8KdepaNkkXeEux-Gq-RhJU')" }}></div>
                            <div>
                                <h4 className="font-bold text-[#111218]">Elena Rossi</h4>
                                <p className="text-xs text-gray-500">Scholarship Recipient, EU</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* In Their Own Words: Long-Form Stories */}
                <section className="mb-24">
                    <div className="flex items-center justify-between mb-10 px-4">
                        <h2 className="text-3xl font-bold tracking-tight">In Their Own Words: <span className="text-[#193ce6]">Journey Highlights</span></h2>
                        <a className="text-[#193ce6] font-bold text-sm flex items-center gap-2 hover:underline" href="#">
                            View All Stories <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </a>
                    </div>
                    <div className="space-y-12">
                        {/* Long-form Card 1 */}
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-lg transition-shadow">
                            <div className="w-full md:w-1/3 min-h-[300px] bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBmisLFaxPTqKu8EjWz7lB4uGo5GYHmu1aAM3-ZdJf5PV6YuZGABqEOyr7fDrNoip5ES7bpQl85dMb1DnfXQ3_Dgn7ah8xUWh38yjook6-zsDXVR40i6VyB3nO832fckrTrw28zWYNBxL0br-23jAQVmCbvL53uowRIm_JTpHKD5zD95cSMIVKpfntR6zMFON1aFAHp0q08c2KjTsEFFMQN1oSBBRmx9lO9NZDlz0V7C5nn4MV2xurherq7azqx2N4aV1ttd0NFvyg')" }}></div>
                            <div className="p-10 flex-1">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="px-3 py-1 bg-[#193ce6]/10 text-[#193ce6] text-[11px] font-bold uppercase tracking-wider rounded-full">Success Story</span>
                                    <span className="text-gray-400 text-sm">• 5 min read</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">From Confusion to Cambridge: Marcus's Journey</h3>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-sm font-bold text-[#193ce6] uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[16px]">help</span> The Challenge
                                        </h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            Marcus was overwhelmed by contradictory advice online. With a stellar academic record but zero knowledge of the UK's UCAS system, he felt stuck between three different engineering specializations.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-green-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[16px]">check_circle</span> The Outcome
                                        </h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            Through personalized mentoring, we helped Marcus refine his personal statement and choose the right specialization. He secured admissions from 4 top-tier UK universities, eventually choosing Cambridge.
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAUj7fEKGo7-oVgyihNxCJHI_9n1Qx6WniKc6yKFb2cSQXh3_X6_3xgEn3E3eRXIqIKs8K_CvT5srtC37y1h-pm4fc5sT753KO2MJ89Agb3Fa8dpf2vtXsgYDig3QWYGUowJ1eqDjctgCyI5laDnXpzpDoVQWDO-RH8Dv40axd41a0cXuv4AA5-o48gkLB0td8RjxYYKDEX-AefujHrYnnf1mDHNCavHnA1XFKBfK4PJME0tDdDedWmpXfnlO_jMxhxdXHwUyVCAKk')" }}></div>
                                        <div>
                                            <p className="text-sm font-bold">Marcus Thorne</p>
                                            <p className="text-xs text-gray-500">Engineering Student</p>
                                        </div>
                                    </div>
                                    <button className="text-[#193ce6] font-bold text-sm hover:translate-x-1 transition-transform flex items-center gap-1">
                                        Read Full Narrative <span className="material-symbols-outlined">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Long-form Card 2 */}
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row-reverse shadow-sm hover:shadow-lg transition-shadow">
                            <div className="w-full md:w-1/3 min-h-[300px] bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCllpsFfUC1rze4_m9DRRH1mMUU0pifeWPcUGFO3MbKK7uIWp7hyPgS3hvweeFySKu4M94Vxj_2j8u1_9S20rYxOInT1mjIO6ellZnNaXcY1jPs_E0JGof8tAhwIey8TW1SpwbpRbTNqLCXJ7sXH9fOWT8d4bEYFuVHayXOMhFzVZ7AvOdCgfVPTWAaTF4GdVQwlwA5dEbnaIWhlvjAt2P_nyKZAM8-959jS-PNqDvclv1a8wOjWJBKW4O6uTzt0L1I2JD_gZHT1Hc')" }}></div>
                            <div className="p-10 flex-1">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="px-3 py-1 bg-[#193ce6]/10 text-[#193ce6] text-[11px] font-bold uppercase tracking-wider rounded-full">Scholarship spotlight</span>
                                    <span className="text-gray-400 text-sm">• 4 min read</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Navigating the Scholarship Maze: Anjali's Story</h3>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-sm font-bold text-[#193ce6] uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[16px]">psychology</span> The Strategy
                                        </h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            Anjali had the talent but lacked the financial means. We designed a "Scholarship-First" strategy, targeting institutions with generous endowment funds and helping her draft winning essays that highlighted her unique background.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-green-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[16px]">military_tech</span> The Result
                                        </h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            Anjali was awarded a 75% tuition waiver at the University of Toronto. She's now pursuing her dream in International Relations and serves as a student ambassador for new arrivals.
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCxhq_1i5j-xXnYKv_8DKbRfGNMmwngzeVkEnF4uk7qrCIhPL-LbRbfyaVVZUft9F0AFhkGp0k1CxjxgY_lHLn7e12s06piSG57wfk_IdntrpjNNplL5KBNZ5LqjuPzyiOCMdPv3kZIJlN82Bi1GPouzvIc7h1OPE3dSUFmB9OoSP8n4XX7nICIq47Td9CaF4JhmcBKXTobLux23A5HXlhTsJ666ga4Ig8U7s39AYsnwB0uqqMMPP_8PI9tJUbP40j3-Ho4eakt_T8')" }}></div>
                                        <div>
                                            <p className="text-sm font-bold">Anjali Sharma</p>
                                            <p className="text-xs text-gray-500">Intl. Relations, Canada</p>
                                        </div>
                                    </div>
                                    <button className="text-[#193ce6] font-bold text-sm hover:translate-x-1 transition-transform flex items-center gap-1">
                                        Read Full Narrative <span className="material-symbols-outlined">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-[#193ce6] rounded-3xl p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
                            <circle cx="0" cy="0" fill="white" r="40"></circle>
                            <circle cx="100" cy="100" fill="white" r="30"></circle>
                        </svg>
                    </div>
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-4xl font-black mb-4">Start Your Success Story</h2>
                        <p className="text-primary-20 opacity-90 mb-8 text-lg">Join 10,000+ students who achieved their dreams with EAOverseas guidance. Your future starts here.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="bg-white text-[#193ce6] font-bold px-8 py-4 rounded-full hover:shadow-xl transition-all w-full sm:w-auto">
                                Consult an Expert
                            </button>
                            <button className="bg-[#193ce6]/20 border border-white/30 text-white font-bold px-8 py-4 rounded-full hover:bg-primary/40 transition-all w-full sm:w-auto">
                                Explore Universities
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Testimonials;
