import React, { useState } from 'react';
import { ArrowLeft, Send, Loader2, Lightbulb, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sendFeedbackEmail } from '../lib/api';

const Suggestions = () => {
    const [isAnonymous, setIsAnonymous] = useState(true);
    const [contactMethod, setContactMethod] = useState('email');
    const [contactInfo, setContactInfo] = useState('');
    const [details, setDetails] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' or 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus(null);

        try {
            await sendFeedbackEmail("Suggestion", {
                isAnonymous,
                contactMethod,
                contactInfo: isAnonymous ? "" : contactInfo,
                details
            });
            setStatus('success');
            setDetails('');
            setContactInfo('');
        } catch (error) {
            console.error("Failed to submit suggestion:", error);
            setStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900 selection:bg-emerald-100">
            <div className="w-full max-w-3xl z-10">
                <div className="mb-8">
                    <Link to="/feedback" className="group inline-flex items-center text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors bg-white/50 px-4 py-2 rounded-full border border-gray-100 shadow-sm backdrop-blur-sm hover:bg-white hover:shadow">
                        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                        Back to Feedback
                    </Link>
                </div>

                <div className="w-full bg-white/80 backdrop-blur-xl border border-gray-100 shadow-xl rounded-3xl p-8 sm:p-10 relative overflow-hidden">
                    {/* Inner subtle glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-[80px] pointer-events-none opacity-50" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-5 mb-10 border-b border-gray-100 pb-8">
                            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-100 shadow-[0_0_30px_-5px_var(--tw-shadow-color)] shadow-emerald-200/50">
                                <Lightbulb className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 tracking-tight">Suggest an Idea</h1>
                                <p className="text-gray-500 mt-2 text-sm sm:text-base">Help us innovate. We'd love to hear your brilliant thoughts.</p>
                            </div>
                        </div>

                        {status === 'success' && (
                            <div className="mb-8 p-5 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-200 text-sm flex items-start gap-3 shadow-sm animate-in fade-in slide-in-from-top-4">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold mb-1">Suggestion Submitted</h4>
                                    <p className="text-emerald-600">Your suggestion has been successfully submitted. Thank you for your contribution!</p>
                                </div>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="mb-8 p-5 bg-rose-50 text-rose-700 rounded-2xl border border-rose-200 text-sm flex items-start gap-3 shadow-sm animate-in fade-in slide-in-from-top-4">
                                <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold mb-1">Submission Failed</h4>
                                    <p className="text-rose-600">There was an error submitting your suggestion. Please try again later.</p>
                                </div>
                            </div>
                        )}

                        <form className="space-y-8" onSubmit={handleSubmit}>
                            {/* Anonymity Toggle */}
                            <div className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all hover:border-gray-200 hover:shadow-md">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900">Submit Anonymously</h3>
                                    <p className="text-xs text-gray-500 mt-1">Hide your identity and contact information</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsAnonymous(!isAnonymous)}
                                    className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${isAnonymous ? 'bg-emerald-500' : 'bg-gray-200'}`}
                                >
                                    <span className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isAnonymous ? 'translate-x-5' : 'translate-x-0'}`} />
                                </button>
                            </div>

                            {/* Contact Info Section */}
                            <div className={`space-y-5 transition-all duration-500 overflow-hidden ${isAnonymous ? 'max-h-0 opacity-0' : 'max-h-[300px] opacity-100'}`}>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setContactMethod('email')}
                                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold transition-all ${contactMethod === 'email'
                                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm'
                                            : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${contactMethod === 'email' ? 'border-emerald-500' : 'border-gray-300'}`}>
                                            <div className={`w-2 h-2 rounded-full transition-colors ${contactMethod === 'email' ? 'bg-emerald-500' : 'bg-transparent'}`} />
                                        </div>
                                        Email
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setContactMethod('phone')}
                                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold transition-all ${contactMethod === 'phone'
                                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm'
                                            : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${contactMethod === 'phone' ? 'border-emerald-500' : 'border-gray-300'}`}>
                                            <div className={`w-2 h-2 rounded-full transition-colors ${contactMethod === 'phone' ? 'bg-emerald-500' : 'bg-transparent'}`} />
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
                                        className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none shadow-sm transition-all text-gray-900 placeholder:text-gray-400 font-medium"
                                        placeholder={contactMethod === 'email' ? 'you@example.com' : '+234 800 000 0000'}
                                    />
                                </div>
                            </div>

                            {/* Details Section */}
                            <div>
                                <label htmlFor="suggestion" className="block text-sm font-bold text-gray-700 mb-2 pl-1">
                                    Suggestion Details
                                </label>
                                <textarea
                                    id="suggestion"
                                    rows="6"
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                    className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none resize-none shadow-sm transition-all text-gray-900 placeholder:text-gray-400 font-medium leading-relaxed"
                                    placeholder="Tell us your brilliant idea..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all duration-300 ${isLoading ? 'bg-emerald-400 cursor-not-allowed shadow-none' : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-600/20 hover:-translate-y-0.5'}`}
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                {isLoading ? 'Submitting...' : 'Submit Suggestion'}
                            </button>
                        </form>

                        <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-center text-center">
                            <p className="text-sm text-gray-500 max-w-md font-medium">
                                Every great initiative started with a simple idea. We appreciate the time you take to help us grow.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Suggestions;
