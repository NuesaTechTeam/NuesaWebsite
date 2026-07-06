import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquareWarning, Lightbulb, ChevronRight } from 'lucide-react';
import useSEO from "../hooks/useSEO";

const Feedback = () => {
    useSEO({
        title: "Feedback Portal",
        description: "Submit complaints, share suggestions, and give feedback to help the NUESA executive committee improve the engineering college."
    });

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 sm:p-12 font-sans text-gray-900">
            <div className="z-10 w-full max-w-4xl text-center flex flex-col items-center py-8">
                {/* Logo with subtle glow */}
                <div className="relative mb-10 group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green/10 to-green-light/10 rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition duration-700 pointer-events-none"></div>
                    <img
                        src="/images/blog/logo.jpg"
                        alt="NUESA Logo"
                        className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl shadow-xl object-cover border border-white transition-transform duration-500 group-hover:scale-105 bg-white"
                    />
                </div>

                {/* Header */}
                <div className="mb-4">
                    <h1 className="relative text-4xl sm:text-6xl font-extrabold text-green tracking-tight">
                        Have Your Say
                    </h1>
                </div>

                <p className="text-lg sm:text-xl text-gray-600 mb-14 max-w-2xl leading-relaxed">
                    Your voice shapes our community. Whether you want to report an issue or suggest a brilliant idea, we are listening.
                </p>

                {/* Cards */}
                <div className="flex flex-col sm:flex-row gap-6 w-full max-w-3xl">
                    {/* Complaint Card */}
                    <Link
                        to="/feedback/complaints"
                        className="group relative flex-1 p-8 bg-green-50/50 border border-green-100 hover:border-green-700 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden transition duration-300"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-green/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative z-10 flex flex-col items-start text-left h-full">
                            <div className="w-14 h-14 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center shrink-0 mb-6 group-hover:scale-110 group-hover:bg-green-200 transition duration-300">
                                <MessageSquareWarning className="w-7 h-7" />
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                                Make a Complaint
                            </h3>
                            <p className="text-base text-gray-600 group-hover:text-gray-700 transition-colors mb-8 leading-relaxed flex-1">
                                Notice something wrong? Report an issue or concern you've experienced so we can fix it.
                            </p>

                            <div className="mt-auto flex items-center text-green-700 font-medium text-sm tracking-wide">
                                <span className="group-hover:mr-2 group-hover:tracking-wider transition duration-300">File Report</span>
                                <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition duration-300" />
                            </div>
                        </div>
                    </Link>

                    {/* Suggestion Card */}
                    <Link
                        to="/feedback/suggestions"
                        className="group relative flex-1 p-8 bg-green-50/30 border border-green-200 hover:border-green-600 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden transition duration-300"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-light/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative z-10 flex flex-col items-start text-left h-full">
                            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shrink-0 mb-6 group-hover:scale-110 group-hover:bg-green-100 transition duration-300">
                                <Lightbulb className="w-7 h-7" />
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                                Suggest an Idea
                            </h3>
                            <p className="text-base text-gray-600 group-hover:text-gray-700 transition-colors mb-8 leading-relaxed flex-1">
                                Got a spark of inspiration? Share your brilliant thoughts on how we can improve.
                            </p>

                            <div className="mt-auto flex items-center text-green-600 font-medium text-sm tracking-wide">
                                <span className="group-hover:mr-2 group-hover:tracking-wider transition duration-300">Share Idea</span>
                                <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition duration-300" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
