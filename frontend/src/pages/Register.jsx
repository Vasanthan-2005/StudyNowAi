// Register page for new users to sign up
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isError, message } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [formError, setFormError] = useState('');

    useEffect(() => {
        // Clear any previous auth state on mount
        dispatch(reset());
    }, [dispatch]);

    // Handle Redux state changes
    useEffect(() => {
        if (isError && message) {
            setFormError(message);
        }
    }, [isError, message]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (formError) {
            setFormError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Clear any previous errors
        setFormError('');
        
        // Client-side validation
        if (!formData.name.trim()) {
            setFormError('Name is required.');
            return;
        }
        if (!validateEmail(formData.email)) {
            setFormError('Please enter a valid email address.');
            return;
        }
        if (formData.password.length < 6) {
            setFormError('Password must be at least 6 characters.');
            return;
        }

        const result = await dispatch(register(formData));
        
        if (register.fulfilled.match(result)) {
            navigate('/dashboard');
        }
        // If registration fails, the error will be handled by the useEffect above
    };

    return (
        <div className="gradient-bg min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo and Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-3xl text-white">🚀</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Join StudyNowAI</h1>
                    <p className="text-gray-600">Create your account and start learning smarter</p>
                </div>

                {/* Register Form */}
                <div className="card p-8">
                    {formError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <div className="flex items-center">
                                <svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="text-red-800 text-sm">{formError}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

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
                                placeholder="Create a password (min 6 characters)"
                                required
                                minLength={6}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-success w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Creating Account...
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Features */}
                <div className="mt-8 grid grid-cols-1 gap-4">
                    <div className="card p-4">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg mr-3">
                                <span className="text-blue-600">🎯</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">AI-Powered Study Plans</h3>
                                <p className="text-sm text-gray-600">Get personalized study recommendations</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card p-4">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg mr-3">
                                <span className="text-green-600">📊</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Progress Tracking</h3>
                                <p className="text-sm text-gray-600">Monitor your learning journey</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card p-4">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg mr-3">
                                <span className="text-purple-600">⚡</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Smart Prioritization</h3>
                                <p className="text-sm text-gray-600">Focus on what matters most</p>
                            </div>
                        </div>
                    </div>
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

export default Register;
