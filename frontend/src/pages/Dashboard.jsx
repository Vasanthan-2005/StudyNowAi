import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAIStudySchedule, getSubjects } from '../features/study/studySlice';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { subjects: allSubjects, isLoading: loading, isError, message } = useSelector((state) => state.study);
    const error = isError ? message : '';

    useEffect(() => {
        dispatch(getSubjects());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="gradient-bg min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="gradient-bg min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                Welcome to StudyNowAI 📚
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Your smart learning companion. Use the navigation bar to access your Study Plan, Subjects, Topics, and more.
                            </p>
                        </div>
                        <a 
                            href="/settings" 
                            className="btn-secondary flex items-center space-x-2"
                        >
                            <span>⚙️</span>
                            <span>Settings</span>
                        </a>
                    </div>
                </div>

                {error && (
                    <div className="card p-6 mb-8 border-l-4 border-red-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-red-800">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* General Info Card */}
                <div className="card p-8 text-center mt-8">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🎓</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Started</h3>
                    <p className="text-gray-600 mb-6">
                        Use the navigation bar to access your Study Plan, manage Subjects and Topics, and view your progress.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
