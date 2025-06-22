// File: /src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import studyReducer from '../features/study/studySlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        study: studyReducer,
        // subject: subjectReducer (feature coming soon)
        // topic: topicReducer (feature coming soon)
    },
});

export default store;
