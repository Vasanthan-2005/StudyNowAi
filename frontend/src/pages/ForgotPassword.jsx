import { useState } from 'react';
import { Link } from 'react-router-dom';

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setError('');
        setSubmitted(true);
    };

    return (
        <div className="gradient-bg min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo and Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-3xl text-white">🔐</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
                    <p className="text-gray-600">Enter your email to receive reset instructions</p>
                </div>

                {/* Form */}
                <div className="card p-8">
                    {submitted ? (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Check Your Email</h3>
                            <p className="text-gray-600 mb-6">
                                If an account with <strong>{email}</strong> exists, you will receive password reset instructions.
                            </p>
                            <p className="text-sm text-gray-500 mb-6">
                                Note: Password reset functionality is not yet implemented in this demo.
                            </p>
                            <Link to="/login" className="btn-primary">
                                Back to Login
                            </Link>
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-red-800 text-sm">{error}</p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input-field"
                                        placeholder="Enter your email address"
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn-primary w-full">
                                    Send Reset Link
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <Link 
                                    to="/login" 
                                    className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                                >
                                    ← Back to Login
                                </Link>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-gray-500 text-sm">
                        © 2024 StudyNowAI. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword; 