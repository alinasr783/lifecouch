import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/database/supabase';
import { FiLock, FiMail, FiLogIn } from 'react-icons/fi';
import './UDBL.css';

const UDBL = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // جلب البيانات من جدول UDB
      const { data, error } = await supabase
        .from('UDB')
        .select('admins');

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }

      // البحث عن المستخدم المطابق في مصفوفة admins
      const adminFound = data.some(entry => 
        entry.admins?.some(admin => 
          admin.email === email && admin.password === password
        )
      );

      if (adminFound) {
        const token = btoa(`${email}:${Date.now()}`);
        localStorage.setItem('adminToken', token);
        navigate('/user-dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <motion.div 
        className="login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-header">
          <h2>Admin Portal</h2>
          <p>Sign in to access the dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          <div className="form-group">
            <label htmlFor="email">
              <FiMail className="input-icon" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <FiLock className="input-icon" />
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <motion.button
            type="submit"
            className="login-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner"></span>
            ) : (
              <>
                <FiLogIn /> Sign In
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default UDBL;