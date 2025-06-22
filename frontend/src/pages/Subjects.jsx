// File: /src/pages/Subjects.jsx
// This page lets users manage their subjects and exam dates
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSubjects, createSubject, updateSubject, deleteSubject, reset } from '../features/study/studySlice';

const Subjects = () => {
    const dispatch = useDispatch();
    const { subjects, isLoading, isError, message } = useSelector((state) => state.study);

    const [name, setName] = useState('');
    const [examDate, setExamDate] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        dispatch(getSubjects());

        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    const handleReset = () => {
        setName('');
        setExamDate('');
        setEditingId(null);
        setFormError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            setFormError('Subject name is required.');
            return;
        }

        const subjectData = { name, examDate };

        if (editingId) {
            dispatch(updateSubject({ id: editingId, ...subjectData }));
        } else {
            dispatch(createSubject(subjectData));
        }
        handleReset();
    };

    const handleEdit = (subject) => {
        setName(subject.name);
        setExamDate(subject.examDate?.substring(0, 10) || '');
        setEditingId(subject._id);
        window.scrollTo(0, 0);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this subject? All associated topics will also be deleted.')) {
            dispatch(deleteSubject(id));
        }
    };

    return (
        <div className="gradient-bg min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Subjects 📘</h1>
                    <p className="text-gray-600 text-lg">Add, edit, or delete your course subjects.</p>
                </div>

                {/* Add/Edit Form */}
                <div className="card p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">{editingId ? 'Edit Subject' : 'Add a New Subject'}</h2>
                    {(isError || formError) && <p className="text-red-500 mb-4">{formError || message}</p>}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="form-label">Subject Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (formError || isError) setFormError('');
                                    }}
                                    className="input-field"
                                    placeholder="e.g., Quantum Physics"
                                    required
                                />
                            </div>
                            <div>
                                <label className="form-label">Exam Date (Optional)</label>
                                <input
                                    type="date"
                                    value={examDate}
                                    onChange={(e) => setExamDate(e.target.value)}
                                    className="input-field"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4">
                            {editingId && (
                                <button type="button" onClick={handleReset} className="btn-secondary">
                                    Cancel
                                </button>
                            )}
                            <button type="submit" className="btn-primary" disabled={isLoading}>
                                {isLoading ? 'Saving...' : (editingId ? 'Update Subject' : 'Add Subject')}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Subjects List */}
                {isLoading && subjects.length === 0 ? (
                    <div className="text-center text-gray-600">Loading subjects...</div>
                ) : subjects.length === 0 ? (
                    <div className="card p-8 text-center">
                        <h3 className="text-xl font-semibold">No Subjects Yet</h3>
                        <p className="text-gray-600 mt-2">Add your first subject using the form above.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subjects.map((subj) => (
                            <div key={subj._id} className="card p-6 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{subj.name}</h3>
                                    <div className="flex items-center text-gray-600 mb-4">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        <span>Exam Date: {subj.examDate ? new Date(subj.examDate).toLocaleDateString() : 'Not set'}</span>
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-3 mt-4">
                                    <button onClick={() => handleEdit(subj)} className="text-blue-600 hover:underline">Edit</button>
                                    <button onClick={() => handleDelete(subj._id)} className="text-red-600 hover:underline">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Subjects;
