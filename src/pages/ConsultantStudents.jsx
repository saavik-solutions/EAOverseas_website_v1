import React from 'react';
import PageHeader from '../components/PageHeader';

const ConsultantStudents = () => {
    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-gray-50/50">
            {/* Header with breadcrumbs */}
            <PageHeader
                title="My Students"
                breadcrumbs={[{ label: 'Dashboard', link: '/counsellor-dashboard' }, { label: 'My Students' }]}
            />

            <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
                <div className="max-w-[1200px] mx-auto space-y-6 pb-10">

                    {/* Header Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Student Management</h2>
                            <p className="text-gray-500 mt-1">Manage and track student progress across 12 countries.</p>
                        </div>
                        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 w-full sm:w-auto">
                            <span className="material-symbols-outlined text-lg">person_add</span>
                            Add New Student
                        </button>
                    </div>

                    {/* Filters Bar */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-wrap items-center gap-3 shadow-sm">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-200 cursor-pointer hover:border-blue-400 transition-colors">
                            <span className="font-medium text-gray-500">Country:</span>
                            <span>All</span>
                            <span className="material-symbols-outlined text-lg">expand_more</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-200 cursor-pointer hover:border-blue-400 transition-colors">
                            <span className="font-medium text-gray-500">Stage:</span>
                            <span>All</span>
                            <span className="material-symbols-outlined text-lg">expand_more</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-200 cursor-pointer hover:border-blue-400 transition-colors">
                            <span className="font-medium text-gray-500">Urgency:</span>
                            <span>All</span>
                            <span className="material-symbols-outlined text-lg">expand_more</span>
                        </div>
                        <div className="hidden md:block h-6 w-[1px] bg-gray-200 mx-2"></div>
                        <button className="text-sm font-medium text-blue-600 hover:underline">Clear Filters</button>

                        <div className="ml-auto flex items-center gap-2">
                            <div className="relative group/search">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg group-focus-within/search:text-blue-500 transition-colors">search</span>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-1.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none w-40 md:w-64 transition-all"
                                />
                            </div>
                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                                <button className="p-1.5 bg-blue-50 text-blue-600">
                                    <span className="material-symbols-outlined text-lg">view_list</span>
                                </button>
                                <button className="p-1.5 text-gray-400 hover:bg-gray-50">
                                    <span className="material-symbols-outlined text-lg">grid_view</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Student Name</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Target Country</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Current Stage</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Priority</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Last Interaction</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        {
                                            name: 'James Sterling',
                                            id: '#EAS-2940',
                                            country: 'United Kingdom',
                                            stage: 'Visa Processing',
                                            priority: 'Urgent',
                                            last: '2 hours ago',
                                            detail: 'Call scheduled',
                                            initials: 'JS',
                                            color: 'blue'
                                        },
                                        {
                                            name: 'Aisha Mohammed',
                                            id: '#EAS-3012',
                                            country: 'Canada',
                                            stage: 'App. Submitted',
                                            priority: 'High',
                                            last: 'Yesterday',
                                            detail: 'Document review',
                                            initials: 'AM',
                                            color: 'orange'
                                        },
                                        {
                                            name: 'Liam Chen',
                                            id: '#EAS-1829',
                                            country: 'Australia',
                                            stage: 'Test Prep',
                                            priority: 'Low',
                                            last: 'Oct 24, 2023',
                                            detail: 'IELTS Mock results',
                                            initials: 'LC',
                                            color: 'purple'
                                        },
                                        {
                                            name: 'Sofia Wagner',
                                            id: '#EAS-4410',
                                            country: 'Germany',
                                            stage: 'Visa Processing',
                                            priority: 'High',
                                            last: 'Oct 22, 2023',
                                            detail: 'Interview scheduled',
                                            initials: 'SW',
                                            color: 'teal'
                                        },
                                    ].map((student, idx) => (
                                        <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`size-9 rounded-full bg-${student.color}-100 flex items-center justify-center text-${student.color}-600 font-bold text-sm shrink-0 uppercase`}>
                                                        {student.initials}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900">{student.name}</p>
                                                        <p className="text-xs text-gray-500">ID: {student.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-gray-400 text-sm">public</span>
                                                    <span className="text-sm text-gray-600">{student.country}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${student.stage === 'Visa Processing' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                    student.stage === 'App. Submitted' ? 'bg-green-50 text-green-600 border-green-100' :
                                                        'bg-yellow-50 text-yellow-700 border-yellow-100'
                                                    }`}>
                                                    {student.stage}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className={`flex items-center gap-1.5 font-semibold text-xs px-2 py-1 rounded-lg w-fit ${student.priority === 'Urgent' ? 'text-red-600 bg-red-50' :
                                                    student.priority === 'High' ? 'text-orange-600 bg-orange-50' :
                                                        'text-blue-600 bg-blue-50'
                                                    }`}>
                                                    <span className={`size-1.5 rounded-full ${student.priority === 'Urgent' ? 'bg-red-600 animate-pulse' :
                                                        student.priority === 'High' ? 'bg-orange-600' :
                                                            'bg-blue-600'
                                                        }`}></span>
                                                    {student.priority}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-600">{student.last}</p>
                                                <p className="text-xs text-gray-400 italic">{student.detail}</p>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-blue-600 text-sm font-bold hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
                                                    View Profile
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Table Footer / Pagination */}
                        <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
                            <p className="text-sm text-gray-500">Showing <span className="font-semibold text-gray-900">1-20</span> of <span className="font-semibold text-gray-900">500</span> students</p>
                            <div className="flex items-center gap-2">
                                <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
                                    <span className="material-symbols-outlined text-lg">chevron_left</span>
                                </button>
                                <button className="size-9 flex items-center justify-center bg-blue-600 text-white rounded-lg font-bold text-sm shadow-sm shadow-blue-600/20">1</button>
                                <button className="size-9 flex items-center justify-center hover:bg-gray-50 text-gray-600 rounded-lg font-medium text-sm transition-colors">2</button>
                                <button className="size-9 flex items-center justify-center hover:bg-gray-50 text-gray-600 rounded-lg font-medium text-sm transition-colors">3</button>
                                <span className="text-gray-400 px-1">...</span>
                                <button className="size-9 flex items-center justify-center hover:bg-gray-50 text-gray-600 rounded-lg font-medium text-sm transition-colors">25</button>
                                <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ConsultantStudents;
