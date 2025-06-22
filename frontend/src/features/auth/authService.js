import axiosInstance from '../../services/axiosInstance';

// Register user
const registerUser = async (userData) => {
    const response = await axiosInstance.post('/api/auth/register', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Login user
const loginUser = async (userData) => {
    const response = await axiosInstance.post('/api/auth/login', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem('user');
};

// Update profile
const updateProfile = async (profileData) => {
    const response = await axiosInstance.put('/api/auth/profile', profileData);
    if (response.data.success) {
        const user = JSON.parse(localStorage.getItem('user'));
        user.user = response.data.data;
        localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
};

// Update preferences
const updatePreferences = async (preferencesData) => {
    const response = await axiosInstance.put('/api/auth/preferences', preferencesData);
    if (response.data.success) {
        const user = JSON.parse(localStorage.getItem('user'));
        user.user = response.data.data;
        localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
};

// Update email notification settings
const updateEmailSettings = async (settingsData) => {
    const response = await axiosInstance.put('/api/auth/settings/email', settingsData);
    return response.data;
};

// Test an email notification
const testEmail = async (emailType) => {
    return await axiosInstance.post('/api/notifications/test-email', { emailType });
};

// Send an immediate reminder email
const sendImmediateReminder = async () => {
    return await axiosInstance.post('/api/notifications/send-reminder');
};

const authService = {
    registerUser,
    loginUser,
    logout,
    updateProfile,
    updatePreferences,
    updateEmailSettings,
    testEmail,
    sendImmediateReminder,
};

export default authService; 