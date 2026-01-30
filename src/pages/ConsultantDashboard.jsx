import React from 'react';
import PageHeader from '../components/PageHeader';

const ConsultantDashboard = () => {
    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-gray-50/50">
            {/* Header with Sign Out button, properly aligned like Student Dashboard */}
            <PageHeader title="Counsellor Dashboard" />

            <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-8 pb-10">

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        {/* Card 1 */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                    <span className="material-symbols-outlined icon-filled">person</span>
                                </div>
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-600">+1 new</span>
                            </div>
                            <p className="text-gray-500 text-sm font-medium">Assigned Students</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">24 <span className="text-sm font-normal text-gray-500">total</span></p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                    <span className="material-symbols-outlined icon-filled">school</span>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm font-medium">Active Student Cases</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">12 <span className="text-sm font-normal text-gray-500">in progress</span></p>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                                    <span className="material-symbols-outlined icon-filled">description</span>
                                </div>
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-orange-50 text-orange-600">Action Needed</span>
                            </div>
                            <p className="text-gray-500 text-sm font-medium">Pending Reviews</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">3 <span className="text-sm font-normal text-gray-500">documents</span></p>
                        </div>
                        {/* Card 4 */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
                                    <span className="material-symbols-outlined icon-filled">star</span>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm font-medium">Average Rating</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">4.8 <span className="text-sm font-normal text-gray-500">stars</span></p>
                        </div>
                    </div>

                    {/* Main Content: Upcoming Sessions List */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">Upcoming Sessions</h3>
                            <a className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1" href="#">
                                View Full Schedule <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </a>
                        </div>
                        <div className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm divide-y divide-gray-100 overflow-hidden">
                            {/* Session Item 1 */}
                            <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="flex flex-col items-center justify-center w-14 h-14 bg-blue-50 rounded-xl text-blue-600 shrink-0">
                                        <span className="text-xs font-bold uppercase">Today</span>
                                        <span className="text-lg font-bold">10:00</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-semibold text-gray-900 text-base">Sarah Jenkins</h4>
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">Starting in 15m</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span className="material-symbols-outlined text-[16px]">topic</span>
                                            <span>Visa Application Strategy</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:self-center self-start w-full sm:w-auto">
                                    <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-600/30">
                                        Start Session
                                    </button>
                                </div>
                            </div>
                            {/* Session Item 2 */}
                            <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="flex flex-col items-center justify-center w-14 h-14 bg-gray-100 rounded-xl text-gray-500 shrink-0">
                                        <span className="text-xs font-bold uppercase">Today</span>
                                        <span className="text-lg font-bold">13:30</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-semibold text-gray-900 text-base">Michael Chen</h4>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span className="material-symbols-outlined text-[16px]">topic</span>
                                            <span>University Selection - Phase 2</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:self-center self-start w-full sm:w-auto">
                                    <button className="w-full sm:w-auto border border-gray-200 bg-transparent hover:bg-gray-50 text-gray-900 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>
                            {/* Session Item 3 */}
                            <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="flex flex-col items-center justify-center w-14 h-14 bg-gray-100 rounded-xl text-gray-500 shrink-0">
                                        <span className="text-xs font-bold uppercase">Tmrw</span>
                                        <span className="text-lg font-bold">09:00</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-semibold text-gray-900 text-base">Priya Patel</h4>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span className="material-symbols-outlined text-[16px]">topic</span>
                                            <span>Mock Interview Prep</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:self-center self-start w-full sm:w-auto">
                                    <button className="w-full sm:w-auto border border-gray-200 bg-transparent hover:bg-gray-50 text-gray-900 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ConsultantDashboard;
