import React, { useState } from 'react';
import { ArrowLeft, Send, Loader2, MessageSquareWarning, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sendFeedbackEmail } from '../lib/api';
import useSEO from "../hooks/useSEO";

const Complaints = () => {
    useSEO({
        title: "Submit a Complaint",
        description: "File an anonymous or contactable complaint regarding welfare, academics, or facilities to the NUESA executive team."
    });

    const [isAnonymous, setIsAnonymous] = useState(true);
    const [contactMethod, setContactMethod] = useState('email');
    const [contactInfo, setContactInfo] = useState('');
    const [details, setDetails] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus(null);

        try {
            await sendFeedbackEmail("Complaint", {
                isAnonymous,
                contactMethod,
                contactInfo: isAnonymous ? "" : contactInfo,
                details
            });
            setStatus('success');
            setDetails('');
            setContactInfo('');
        } catch (error) {
            console.error("Failed to submit complaint:", error);
            setStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
            <div className="w-full max-w-3xl z-10">
                <div className="mb-8">
                    <Link to="/feedback" className="group inline-flex items-center text-sm font-medium text-gray-600 hover:text-green-700 bg-white/50 px-4 py-2 rounded-full border border-gray-200 shadow-sm backdrop-blur-sm hover:bg-white hover:shadow">
                        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                        Back to Feedback
                    </Link>
                </div>

                <div className="w-full bg-white border border-gray-200 shadow-lg rounded-3xl p-8 sm:p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green/5 rounded-full blur-[80px] pointer-events-none opacity-50" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-5 mb-10 border-b border-gray-200 pb-8">
                            <div className="w-16 h-16 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center shrink-0">
                                <MessageSquareWarning className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700 tracking-tight">Lodge a Complaint</h1>
                                <p className="text-gray-600 mt-2 text-sm sm:text-base">We take your concerns seriously. Let us know what went wrong.</p>
                            </div>
                        </div>

                        {status === 'success' && (
                            <div className="mb-8 p-5 bg-green-50 text-green-700 rounded-2xl border border-green-200 text-sm flex items-start gap-3 shadow-sm">
                                <CheckCircle2 className="w-5 h-5 text-green shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold mb-1">Complaint Submitted</h4>
                                    <p className="text-green-600">Your complaint has been successfully submitted. We will look into it promptly.</p>
                                </div>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="mb-8 p-5 bg-red-50 text-red-700 rounded-2xl border border-red-200 text-sm flex items-start gap-3 shadow-sm">
                                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold mb-1">Submission Failed</h4>
                                    <p className="text-red-600">There was an error submitting your complaint. Please try again later.</p>
                                </div>
                            </div>
                        )}

                        <form className="space-y-8" onSubmit={handleSubmit}>
                            {/* Anonymity Toggle */}
                            <div className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-200 transition hover:border-gray-300 hover:shadow-md">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900">Submit Anonymously</h3>
                                    <p className="text-xs text-gray-500 mt-1">Hide your identity and contact information</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsAnonymous(!isAnonymous)}
                                    className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${isAnonymous ? 'bg-green-700' : 'bg-gray-200'}`}
                                >
                                    <span className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isAnonymous ? 'translate-x-5' : 'translate-x-0'}`} />
                                </button>
                            </div>

                            {/* Contact Info Section */}
                            <div className={`space-y-5 overflow-hidden transition-all duration-500 ease-out ${isAnonymous ? 'max-h-0 opacity-0 pointer-events-none' : 'max-h-[300px] opacity-100'}`}>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setContactMethod('email')}
                                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold transition ${contactMethod === 'email'
                                            ? 'border-green-700 bg-green-50 text-green-700 shadow-sm'
                                            : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${contactMethod === 'email' ? 'border-green-700' : 'border-gray-300'}`}>
                                            <div className={`w-2 h-2 rounded-full transition-colors ${contactMethod === 'email' ? 'bg-green-700' : 'bg-transparent'}`} />
                                        </div>
                                        Email
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setContactMethod('phone')}
                                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold transition ${contactMethod === 'phone'
                                            ? 'border-green-700 bg-green-50 text-green-700 shadow-sm'
                                            : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${contactMethod === 'phone' ? 'border-green-700' : 'border-gray-300'}`}>
                                            <div className={`w-2 h-2 rounded-full transition-colors ${contactMethod === 'phone' ? 'bg-green-700' : 'bg-transparent'}`} />
                                        </div>
                                        Phone
                                    </button>
                                </div>

                                <div>
                                    <label htmlFor="contact" className="block text-sm font-bold text-gray-700 mb-2 pl-1">
                                        {contactMethod === 'email' ? 'Email Address' : 'Phone Number'}
                                    </label>
                                    <input
                                        type={contactMethod === 'email' ? 'email' : 'tel'}
                                        id="contact"
                                        value={contactInfo}
                                        onChange={(e) => setContactInfo(e.target.value)}
                                        required={!isAnonymous}
                                        className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-700 outline-none transition text-gray-900 placeholder:text-gray-400 font-medium"
                                        placeholder={contactMethod === 'email' ? 'you@example.com' : '+234 800 000 0000'}
                                    />
                                </div>
                            </div>

                            {/* Details Section */}
                            <div>
                                <label htmlFor="complaint" className="block text-sm font-bold text-gray-700 mb-2 pl-1">
                                    Complaint Details
                                </label>
                                <textarea
                                    id="complaint"
                                    rows="6"
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                    className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-700 outline-none resize-none transition text-gray-900 placeholder:text-gray-400 font-medium leading-relaxed"
                                    placeholder="Please describe the issue in detail..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg ${isLoading ? 'bg-green/60 cursor-not-allowed shadow-none' : 'bg-green hover:bg-green-dark hover:shadow-green/20 hover:-translate-y-0.5'}`}
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                {isLoading ? 'Submitting...' : 'Submit Complaint'}
                            </button>
                        </form>

                        <div className="mt-10 pt-8 border-t border-gray-200 flex items-center justify-center text-center">
                            <p className="text-sm text-gray-500 max-w-md font-medium">
                                Your feedback helps us maintain the quality of our organization. We handle all complaints professionally and confidentially.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Complaints;
