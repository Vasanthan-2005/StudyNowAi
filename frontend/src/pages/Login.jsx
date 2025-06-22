// Login page for users to sign in
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const validateEmail = (email) => {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isError, message } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [formError, setFormError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setFormError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Client-side validation
        if (!validateEmail(formData.email)) {
            setFormError('Please enter a valid email address.');
            return;
        }
        if (formData.password.length < 6) {
            setFormError('Password must be at least 6 characters.');
            return;
        }
        const result = await dispatch(login(formData));
        if (result.meta.requestStatus === 'fulfilled') {
            navigate('/dashboard');
        }
    };

    // Determine error type for user feedback
    let errorMessage = formError || message;
    let showRegister = false;
    if (message && message.toLowerCase().includes('not found')) {
        errorMessage = 'Email not registered. Please register.';
        showRegister = true;
    } else if (message && message.toLowerCase().includes('incorrect password')) {
        errorMessage = 'Incorrect password. Please try again.';
    }

    return (
        <div className="gradient-bg min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo and Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-3xl text-white">📚</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to your StudyNowAI account</p>
                </div>

                {/* Login Form */}
                <div className="card p-8">
                    {errorMessage && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <div className="flex items-center">
                                <svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="text-red-800 text-sm">{errorMessage}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="Enter your password"
                                required
                                minLength={6}
                            />
                        </div>

                        <div className="text-right">
                            <Link 
                                to="/forgot-password" 
                                className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Signing In...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {showRegister && (
                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                            <div className="flex items-center">
                                <svg className="h-5 w-5 text-blue-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <p className="text-blue-800 text-sm font-medium">New to StudyNowAI?</p>
                                    <Link to="/register" className="text-blue-600 hover:text-blue-700 text-sm underline">
                                        Create an account
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-gray-500 text-sm">
                        © 2025 StudyNowAI. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
