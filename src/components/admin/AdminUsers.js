import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getUsers, deleteUser, addUser } from '../../firebase/userService';
import './AdminUsers.css';

const AdminUsers = () => {
    const { state, dispatch } = useApp();
    const [loading, setLoading] = useState(true);
    const [showAddUser, setShowAddUser] = useState(false);
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'user'
    });

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);
                console.log('Loading users from Firebase...');
                const users = await getUsers();
                console.log('Loaded users from Firebase:', users);

                // If no users exist, create some sample users
                if (users.length === 0) {
                    console.log('No users found, creating sample users...');
                    await createSampleUsers();
                    // Reload users after creating samples
                    const updatedUsers = await getUsers();
                    console.log('Users after creating samples:', updatedUsers);
                    dispatch({ type: 'LOAD_DATA', payload: { users: updatedUsers } });
                } else {
                    dispatch({ type: 'LOAD_DATA', payload: { users } });
                }
            } catch (error) {
                console.error('Error loading users:', error);
                dispatch({
                    type: 'SET_MESSAGE',
                    payload: { type: 'error', text: `Failed to load users: ${error.message}` }
                });
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, [dispatch]);

    const createSampleUsers = async () => {
        const sampleUsers = [
            {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                role: 'user',
                joinDate: new Date().toISOString().split('T')[0]
            },
            {
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane.smith@example.com',
                role: 'user',
                joinDate: new Date().toISOString().split('T')[0]
            },
            {
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin@touristhub.com',
                role: 'admin',
                joinDate: new Date().toISOString().split('T')[0]
            }
        ];

        try {
            for (const userData of sampleUsers) {
                await addUser(userData);
                console.log('Created sample user:', userData.email);
            }
        } catch (error) {
            console.error('Error creating sample users:', error);
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            // Create user in Firebase Auth first (this would need to be implemented)
            // For now, just add to users collection
            const userData = {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role,
                joinDate: new Date().toISOString().split('T')[0]
            };

            const newUserDoc = await addUser(userData);

            // Update local state
            const updatedUsers = [...state.users, newUserDoc];
            dispatch({ type: 'LOAD_DATA', payload: { users: updatedUsers } });

            dispatch({
                type: 'SET_MESSAGE',
                payload: { type: 'success', text: 'User added successfully!' }
            });

            setShowAddUser(false);
            setNewUser({ firstName: '', lastName: '', email: '', password: '', role: 'user' });
        } catch (error) {
            console.error('Error adding user:', error);
            dispatch({
                type: 'SET_MESSAGE',
                payload: { type: 'error', text: 'Failed to add user' }
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                setLoading(true);
                await deleteUser(userId);

                const updatedUsers = state.users.filter(user => user.id !== userId);
                dispatch({ type: 'LOAD_DATA', payload: { users: updatedUsers } });

                dispatch({
                    type: 'SET_MESSAGE',
                    payload: { type: 'success', text: 'User deleted successfully!' }
                });
            } catch (error) {
                console.error('Error deleting user:', error);
                dispatch({
                    type: 'SET_MESSAGE',
                    payload: { type: 'error', text: 'Failed to delete user' }
                });
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="admin-users">
            <div className="section-header">
                <h1>User Management</h1>
                <div className="header-actions">
                    <button
                        className="btn btn-secondary"
                        onClick={() => window.location.reload()}
                        disabled={loading}
                    >
                        <i className="fas fa-sync-alt"></i>
                        Refresh
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowAddUser(true)}
                    >
                        <i className="fas fa-plus"></i>
                        Add User
                    </button>
                </div>
            </div>

            {showAddUser && (
                <div className="add-user-form">
                    <h3>Add New User</h3>
                    <form onSubmit={handleAddUser}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={newUser.firstName}
                                onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={newUser.lastName}
                                onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                value={newUser.password}
                                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <select
                                value={newUser.role}
                                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Adding...' : 'Add User'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowAddUser(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Join Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="loading-state">
                                    <div className="loading-spinner">
                                        <i className="fas fa-spinner fa-spin"></i>
                                        <span>Loading users...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : state.users.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="empty-state">
                                    <i className="fas fa-users"></i>
                                    <h3>No users found</h3>
                                    <p>Users will appear here once they register or you add them manually.</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => setShowAddUser(true)}
                                    >
                                        <i className="fas fa-plus"></i>
                                        Add First User
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            state.users.map(user => (
                                <tr key={user.id}>
                                    <td>#{user.id}</td>
                                    <td>{user.firstName} {user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`role-badge role-${user.role}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>{user.joinDate || 'N/A'}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDeleteUser(user.id)}
                                                disabled={loading}
                                            >
                                                <i className="fas fa-trash"></i> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;