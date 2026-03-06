import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquareWarning, Lightbulb, ChevronRight } from 'lucide-react';

const Feedback = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 sm:p-12 font-sans text-gray-900 selection:bg-rose-100">
            <div className="z-10 w-full max-w-4xl text-center flex flex-col items-center py-8">
                {/* Logo with Glow Effect */}
                <div className="relative mb-10 group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-rose-200 to-emerald-200 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition duration-700 pointer-events-none"></div>
                    <img
                        src="/images/blog/logo.jpg"
                        alt="NUESA Logo"
                        className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl shadow-xl object-cover border border-white transition-transform duration-500 group-hover:scale-105 bg-white"
                    />
                </div>

                {/* Header Section */}
                <div className="relative inline-block mb-4">
                    <span className="absolute -inset-x-6 -inset-y-2 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-sm rounded-full pointer-events-none"></span>
                    <h1 className="relative text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 tracking-tight flex items-center justify-center gap-3">
                        Have Your Say
                    </h1>
                </div>

                <p className="text-lg sm:text-xl text-gray-600 mb-14 max-w-2xl leading-relaxed font-light">
                    Your voice shapes our community. Whether you want to report an issue or suggest a brilliant idea, we are listening.
                </p>

                {/* Cards Container */}
                <div className="flex flex-col sm:flex-row gap-6 w-full max-w-3xl">
                    {/* Complaint Card */}
                    <Link
                        to="/feedback/complaints"
                        className="group relative flex-1 p-8 bg-white/80 border border-gray-100 hover:border-rose-200 rounded-3xl shadow-xl backdrop-blur-xl hover:bg-white transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative z-10 flex flex-col items-start text-left h-full">
                            <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center shrink-0 mb-6 group-hover:scale-110 group-hover:bg-rose-100 transition-all duration-500 border border-rose-100 shadow-[0_0_30px_-5px_var(--tw-shadow-color)] shadow-rose-200/50">
                                <MessageSquareWarning className="w-7 h-7" />
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                                Make a Complaint
                            </h3>
                            <p className="text-base text-gray-500 group-hover:text-gray-700 transition-colors mb-8 leading-relaxed flex-1">
                                Notice something wrong? Report an issue or concern you've experienced so we can fix it.
                            </p>

                            <div className="mt-auto flex items-center text-rose-500 font-medium text-sm tracking-wide">
                                <span className="group-hover:mr-2 group-hover:tracking-wider transition-all duration-300">File Report</span>
                                <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            </div>
                        </div>
                    </Link>

                    {/* Suggestion Card */}
                    <Link
                        to="/feedback/suggestions"
                        className="group relative flex-1 p-8 bg-white/80 border border-gray-100 hover:border-emerald-200 rounded-3xl shadow-xl backdrop-blur-xl hover:bg-white transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative z-10 flex flex-col items-start text-left h-full">
                            <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center shrink-0 mb-6 group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-500 border border-emerald-100 shadow-[0_0_30px_-5px_var(--tw-shadow-color)] shadow-emerald-200/50">
                                <Lightbulb className="w-7 h-7" />
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                                Suggest an Idea
                            </h3>
                            <p className="text-base text-gray-500 group-hover:text-gray-700 transition-colors mb-8 leading-relaxed flex-1">
                                Got a spark of inspiration? Share your brilliant thoughts on how we can improve.
                            </p>

                            <div className="mt-auto flex items-center text-emerald-500 font-medium text-sm tracking-wide">
                                <span className="group-hover:mr-2 group-hover:tracking-wider transition-all duration-300">Share Idea</span>
                                <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
