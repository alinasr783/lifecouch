import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/database/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiEdit, FiTrash2, FiPlus, FiX, FiUser, FiMail, 
  FiDollarSign, FiStar, FiCalendar, FiLock, FiInfo,
  FiPackage, FiCreditCard, FiAward, FiFrown, FiLogOut,
  FiLink, FiGlobe
} from 'react-icons/fi';
import './DDB.css';

const DDB = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [newUser, setNewUser] = useState({
    url: '',
    logo: '',
    name: '',
    email: '',
    price: '',
    points: '',
    package: 'Basic',
    password: '',
    description: '',
    renewal_date: ''
  });
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
    }

    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('DDB')
        .select('users');

      if (error) throw error;
      if (data && data.length > 0) {
        setUsers(data[0].users || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setIsEditMode(false);
  };

  const handleEdit = async (updatedUser) => {
    try {
      const updatedUsers = users.map(user => 
        user.email === updatedUser.email ? updatedUser : user
      );

      const { error } = await supabase
        .from('DDB')
        .update({ users: updatedUsers })
        .eq('id', 1);

      if (error) throw error;

      setUsers(updatedUsers);
      setSelectedUser(updatedUser);
      setIsEditMode(false);
      showToast('User updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating user:', error.message);
      showToast('Failed to update user', 'error');
    }
  };

  const handleDelete = async (userEmail) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const updatedUsers = users.filter(user => user.email !== userEmail);

      const { error } = await supabase
        .from('DDB')
        .update({ users: updatedUsers })
        .eq('id', 1);

      if (error) throw error;

      setUsers(updatedUsers);
      setIsModalOpen(false);
      showToast('User deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting user:', error.message);
      showToast('Failed to delete user', 'error');
    }
  };

  const handleAddUser = async () => {
    try {
      // Validate required fields
      if (!newUser.name || !newUser.email) {
        showToast('Name and email are required', 'warning');
        return;
      }

      const updatedUsers = [...users, newUser];

      const { error } = await supabase
        .from('DDB')
        .update({ users: updatedUsers })
        .eq('id', 1);

      if (error) throw error;

      setUsers(updatedUsers);
      setIsAddMode(false);
      setNewUser({
        url: '',
        logo: '',
        name: '',
        email: '',
        price: '',
        points: '',
        package: 'Basic',
        password: '',
        description: '',
        renewal_date: ''
      });
      showToast('User added successfully!', 'success');
    } catch (error) {
      console.error('Error adding user:', error.message);
      showToast('Failed to add user', 'error');
    }
  };

  const showToast = (message, type) => {
    // In a real app, you'd use a toast library or component
    console.log(`${type}: ${message}`);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">User Management</h1>

      <motion.button 
        className="logout-button"
        onClick={handleLogout}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiLogOut /> Logout
      </motion.button>
      <motion.button 
        className="add-user-btn"
        onClick={() => setIsAddMode(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiPlus /> Add New User
      </motion.button>

      {loading ? (
        <div className="user-grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="user-card loading-card" style={{ height: '320px' }} />
          ))}
        </div>
      ) : users.length === 0 ? (
        <div className="empty-state">
          <FiFrown size={48} />
          <h3>No Users Found</h3>
          <p>Get started by adding your first user to the system</p>
          <motion.button 
            className="add-user-btn"
            onClick={() => setIsAddMode(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlus /> Add User
          </motion.button>
        </div>
      ) : (
        <div className="user-grid">
          {users.map((user, index) => (
            <motion.div 
              key={index}
              className="user-card"
              onClick={() => handleUserClick(user)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="card-header">
                <img 
                  src={user.logo || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
                  alt="User Logo" 
                  className="user-logo"
                  loading="lazy"
                />
                <h3>{user.name}</h3>
                <span className={`package-badge ${user.package.toLowerCase()}`}>
                  {user.package}
                </span>
              </div>
              <div className="card-details">
                <p><FiMail /> {user.email}</p>
                <p><FiDollarSign /> ${user.price || '0'}</p>
                <p><FiStar /> {user.points || '0'} points</p>
                {user.url && (
                  <p>
                    <FiGlobe /> 
                    <a 
                      href={user.url.startsWith('http') ? user.url : `https://${user.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="url-link"
                    >
                      {user.url}
                    </a>
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* User Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedUser && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="close-modal"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                <FiX />
              </button>

              {isEditMode ? (
                <div className="edit-form">
                  <h2>Edit User</h2>
                  <div className="form-group">
                    <label><FiUser /> Name</label>
                    <input 
                      type="text" 
                      value={selectedUser.name}
                      onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="form-group">
                    <label><FiMail /> Email</label>
                    <input 
                      type="email" 
                      value={selectedUser.email}
                      onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="form-group">
                    <label><FiLink /> Logo URL</label>
                    <input 
                      type="url" 
                      value={selectedUser.logo}
                      onChange={(e) => setSelectedUser({...selectedUser, logo: e.target.value})}
                      placeholder="Enter image URL"
                    />
                  </div>
                  <div className="form-group">
                    <label><FiGlobe /> Website URL</label>
                    <input 
                      type="url" 
                      value={selectedUser.url}
                      onChange={(e) => setSelectedUser({...selectedUser, url: e.target.value})}
                      placeholder="Enter website URL"
                    />
                  </div>
                  <div className="form-group">
                    <label><FiDollarSign /> Price</label>
                    <input 
                      type="text" 
                      value={selectedUser.price}
                      onChange={(e) => setSelectedUser({...selectedUser, price: e.target.value})}
                      placeholder="Enter subscription price"
                    />
                  </div>
                  <div className="form-group">
                    <label><FiStar /> Points</label>
                    <input 
                      type="number" 
                      value={selectedUser.points}
                      onChange={(e) => setSelectedUser({...selectedUser, points: e.target.value})}
                      placeholder="Enter reward points"
                    />
                  </div>
                  <div className="form-group">
                    <label><FiPackage /> Package</label>
                    <select
                      value={selectedUser.package}
                      onChange={(e) => setSelectedUser({...selectedUser, package: e.target.value})}
                    >
                      <option value="Basic">Basic</option>
                      <option value="Standard">Standard</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label><FiCalendar /> Renewal Date</label>
                    <input 
                      type="date" 
                      value={selectedUser.renewal_date}
                      onChange={(e) => setSelectedUser({...selectedUser, renewal_date: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label><FiInfo /> Description</label>
                    <textarea
                      value={selectedUser.description}
                      onChange={(e) => setSelectedUser({...selectedUser, description: e.target.value})}
                      placeholder="Enter user description"
                    />
                  </div>
                  <div className="form-actions">
                    <motion.button 
                      className="save-btn"
                      onClick={() => handleEdit(selectedUser)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Save Changes
                    </motion.button>
                    <motion.button 
                      className="cancel-btn"
                      onClick={() => setIsEditMode(false)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Cancel
                    </motion.button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="modal-header">
                    <img 
                      src={selectedUser.logo || `https://ui-avatars.com/api/?name=${selectedUser.name}&background=random`} 
                      alt="User Logo" 
                      className="modal-logo"
                      loading="lazy"
                    />
                    <h2>{selectedUser.name}</h2>
                    <span className={`package-badge ${selectedUser.package.toLowerCase()}`}>
                      {selectedUser.package}
                    </span>
                  </div>
                  <div className="modal-body">
                    <div className="detail-row">
                      <FiMail className="detail-icon" />
                      <div>
                        <span className="detail-label">Email</span>
                        <span className="detail-value">{selectedUser.email}</span>
                      </div>
                    </div>
                    {selectedUser.url && (
                      <div className="detail-row">
                        <FiGlobe className="detail-icon" />
                        <div>
                          <span className="detail-label">Website</span>
                          <a 
                            href={selectedUser.url.startsWith('http') ? selectedUser.url : `https://${selectedUser.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="detail-value url-link"
                          >
                            {selectedUser.url}
                          </a>
                        </div>
                      </div>
                    )}
                    <div className="detail-row">
                      <FiDollarSign className="detail-icon" />
                      <div>
                        <span className="detail-label">Price</span>
                        <span className="detail-value">${selectedUser.price || '0'}</span>
                      </div>
                    </div>
                    <div className="detail-row">
                      <FiStar className="detail-icon" />
                      <div>
                        <span className="detail-label">Points</span>
                        <span className="detail-value">{selectedUser.points || '0'}</span>
                      </div>
                    </div>
                    <div className="detail-row">
                      <FiPackage className="detail-icon" />
                      <div>
                        <span className="detail-label">Package</span>
                        <span className="detail-value">{selectedUser.package}</span>
                      </div>
                    </div>
                    <div className="detail-row">
                      <FiCalendar className="detail-icon" />
                      <div>
                        <span className="detail-label">Renewal Date</span>
                        <span className="detail-value">
                          {selectedUser.renewal_date || 'Not specified'}
                        </span>
                      </div>
                    </div>
                    <div className="detail-row">
                      <FiInfo className="detail-icon" />
                      <div>
                        <span className="detail-label">Description</span>
                        <span className="detail-value">
                          {selectedUser.description || 'No description provided'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="modal-actions">
                    <motion.button 
                      className="edit-btn"
                      onClick={() => setIsEditMode(true)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <FiEdit /> Edit
                    </motion.button>
                    <motion.button 
                      className="delete-btn"
                      onClick={() => handleDelete(selectedUser.email)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <FiTrash2 /> Delete
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add User Modal */}
      <AnimatePresence>
        {isAddMode && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAddMode(false)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="close-modal"
                onClick={() => setIsAddMode(false)}
                aria-label="Close modal"
              >
                <FiX />
              </button>

              <div className="edit-form">
                <h2>Add New User</h2>
                <div className="form-group">
                  <label><FiUser /> Name</label>
                  <input 
                    type="text" 
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label><FiMail /> Email</label>
                  <input 
                    type="email" 
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div className="form-group">
                  <label><FiLink /> Logo URL</label>
                  <input 
                    type="url" 
                    value={newUser.logo}
                    onChange={(e) => setNewUser({...newUser, logo: e.target.value})}
                    placeholder="Enter image URL"
                  />
                </div>
                <div className="form-group">
                  <label><FiGlobe /> Website URL</label>
                  <input 
                    type="url" 
                    value={newUser.url}
                    onChange={(e) => setNewUser({...newUser, url: e.target.value})}
                    placeholder="Enter website URL"
                  />
                </div>
                <div className="form-group">
                  <label><FiDollarSign /> Price</label>
                  <input 
                    type="text" 
                    value={newUser.price}
                    onChange={(e) => setNewUser({...newUser, price: e.target.value})}
                    placeholder="Enter subscription price"
                  />
                </div>
                <div className="form-group">
                  <label><FiStar /> Points</label>
                  <input 
                    type="number" 
                    value={newUser.points}
                    onChange={(e) => setNewUser({...newUser, points: e.target.value})}
                    placeholder="Enter reward points"
                  />
                </div>
                <div className="form-group">
                  <label><FiLock /> Password</label>
                  <input 
                    type="password" 
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    placeholder="Set user password"
                  />
                </div>
                <div className="form-group">
                  <label><FiPackage /> Package</label>
                  <select
                    value={newUser.package}
                    onChange={(e) => setNewUser({...newUser, package: e.target.value})}
                  >
                    <option value="Basic">Basic</option>
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                <div className="form-group">
                  <label><FiCalendar /> Renewal Date</label>
                  <input 
                    type="date" 
                    value={newUser.renewal_date}
                    onChange={(e) => setNewUser({...newUser, renewal_date: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label><FiInfo /> Description</label>
                  <textarea
                    value={newUser.description}
                    onChange={(e) => setNewUser({...newUser, description: e.target.value})}
                    placeholder="Enter user description"
                  />
                </div>
                <div className="form-actions">
                  <motion.button 
                    className="save-btn"
                    onClick={handleAddUser}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Add User
                  </motion.button>
                  <motion.button 
                    className="cancel-btn"
                    onClick={() => setIsAddMode(false)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DDB;