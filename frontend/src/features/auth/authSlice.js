// File: /src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import { toast } from 'react-hot-toast';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user.user : null,
    token: user ? user.token : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.registerUser(user);
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.loginUser(user);
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get user profile
export const getProfile = createAsyncThunk('auth/getProfile', async (_, thunkAPI) => {
    try {
        return await authService.getProfile();
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Update user profile
export const updateProfile = createAsyncThunk('auth/updateProfile', async (profileData, thunkAPI) => {
    try {
        return await authService.updateProfile(profileData);
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Update user preferences
export const updatePreferences = createAsyncThunk('auth/updatePreferences', async (preferencesData, thunkAPI) => {
    try {
        return await authService.updatePreferences(preferencesData);
    } catch (error) {
        const message = (error.response?.data?.message) || error.message || error.toString();
        toast.error(message);
        return thunkAPI.rejectWithValue(message);
    }
});

// Update email notification settings
export const updateEmailSettings = createAsyncThunk('auth/updateEmailSettings', async (settingsData, thunkAPI) => {
    try {
        const response = await authService.updateEmailSettings(settingsData);
        toast.success(response.message || 'Settings updated!');
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.message) || error.message || error.toString();
        toast.error(message);
        return thunkAPI.rejectWithValue(message);
    }
});

// Test an email notification
export const testEmail = createAsyncThunk('auth/testEmail', async (emailType, thunkAPI) => {
    try {
        const response = await authService.testEmail(emailType);
        toast.success(response.data.message || 'Test email sent!');
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.message) || error.message || error.toString();
        toast.error(message);
        return thunkAPI.rejectWithValue(message);
    }
});

// Send an immediate reminder email
export const sendImmediateReminder = createAsyncThunk('auth/sendImmediateReminder', async (_, thunkAPI) => {
    try {
        const response = await authService.sendImmediateReminder();
        toast.success(response.data.message || 'Reminder sent!');
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.message) || error.message || error.toString();
        toast.error(message);
        return thunkAPI.rejectWithValue(message);
    }
});

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                state.token = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                state.token = null;
            })
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.data;
                state.message = action.payload.message;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updatePreferences.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePreferences.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                if (state.user) {
                    state.user.preferences = action.payload.data.preferences;
                }
            })
            .addCase(updatePreferences.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateEmailSettings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateEmailSettings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                if (state.user) {
                    state.user.emailNotificationsEnabled = action.payload.emailNotificationsEnabled;
                }
            })
            .addCase(updateEmailSettings.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(testEmail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(testEmail.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(testEmail.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(sendImmediateReminder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendImmediateReminder.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(sendImmediateReminder.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
