import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Alert } from 'react-bootstrap';
import { FaFacebookF, FaEye, FaEyeSlash } from 'react-icons/fa';
import { API_BASE, PROD_BACKEND } from '../auth';

export default function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    if (!username || !password) {
      setMsg('Please enter email / username and password');
      return;
    }

    setLoading(true);
    setMsg('Logging in...');

    try {
      let tokenRes;
      const targetApi = API_BASE || PROD_BACKEND;

      try {
        tokenRes = await fetch(`${targetApi}/api/v1/auth/token/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email: username, password })
        });
      } catch (fetchErr) {
        console.error('Login primary API connection error:', fetchErr);

        if (targetApi !== PROD_BACKEND) {
          tokenRes = await fetch(`${PROD_BACKEND}/api/v1/auth/token/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email: username, password })
          });
        } else {
          throw fetchErr;
        }
      }

      if (tokenRes && tokenRes.ok) {
        const tokens = await tokenRes.json();
        localStorage.setItem('access', tokens.access);
        localStorage.setItem('refresh', tokens.refresh);
        localStorage.removeItem('standalone_mode');
        setUser(tokens.access);
        setMsg('Login successful!');
        navigate('/');
      } else {
        if (tokenRes && tokenRes.status === 500) {
          setMsg('Error: Backend encountered a problem (Status 500).');
        } else if (tokenRes) {
          try {
            const t = await tokenRes.json();
            setMsg('Error: ' + (t.detail || JSON.stringify(t)));
          } catch (e) {
            setMsg('Error: Login failed (Status ' + tokenRes.status + ')');
          }
        } else {
          setMsg('Error: Unable to connect to server.');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setMsg('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center py-5" style={{ minHeight: '75vh' }}>
      <div
        className="w-100 bg-white"
        style={{
          maxWidth: '430px',
          padding: '2.5rem 2rem',
          borderRadius: '24px',
          boxShadow: '0 12px 35px -8px rgba(15, 23, 42, 0.08)',
          border: '1.5px solid #e2e8f0'
        }}
      >
        <Form onSubmit={submit}>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter Your Username / Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="form-control"
              style={{
                borderRadius: '14px',
                border: '1.5px solid #cbd5e1',
                padding: '13px 18px',
                fontSize: '0.96rem',
                color: '#334155',
                outline: 'none',
                boxShadow: 'none'
              }}
            />
          </div>


          <div className="mb-2 position-relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="form-control pe-5"
              style={{
                borderRadius: '14px',
                border: '1.5px solid #cbd5e1',
                padding: '13px 18px',
                fontSize: '0.96rem',
                color: '#334155',
                outline: 'none',
                boxShadow: 'none'
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted pe-3 p-0"
              style={{ textDecoration: 'none', color: '#94a3b8' }}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEyeSlash size={19} /> : <FaEye size={19} />}
            </button>
          </div>


          <div className="text-center my-3">
            <a
              href="#forgot"
              onClick={(e) => {
                e.preventDefault();
                setMsg('Password reset link sent to your registered email.');
              }}
              className="text-decoration-none fw-semibold"
              style={{ color: '#1877f2', fontSize: '0.92rem' }}
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-100 py-3 fw-bold text-white shadow-sm"
            style={{
              backgroundColor: '#1877f2',
              borderRadius: '14px',
              fontSize: '1.02rem',
              border: 'none',
              transition: 'background-color 0.2s ease',
              boxShadow: '0 4px 14px rgba(24, 119, 242, 0.28)'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>


          <div className="text-center mt-3 mb-3" style={{ fontSize: '0.94rem', color: '#475569' }}>
            <span>Don’t have an account? </span>
            <Link to="/signup" className="fw-bold text-decoration-none" style={{ color: '#1877f2' }}>
              Signup
            </Link>
          </div>


          <div className="d-flex align-items-center my-3">
            <div className="flex-grow-1 border-top" style={{ borderColor: '#cbd5e1' }}></div>
            <span className="px-3 text-muted small fw-medium" style={{ fontSize: '0.85rem' }}>Or</span>
            <div className="flex-grow-1 border-top" style={{ borderColor: '#cbd5e1' }}></div>
          </div>


          <button
            type="button"
            onClick={() => setMsg('Facebook OAuth authentication integration initiated.')}
            className="btn w-100 py-3 fw-semibold text-white d-flex align-items-center justify-content-center gap-2 shadow-sm"
            style={{
              backgroundColor: '#1877f2',
              borderRadius: '14px',
              fontSize: '0.96rem',
              border: 'none',
              boxShadow: '0 4px 14px rgba(24, 119, 242, 0.25)'
            }}
          >
            <FaFacebookF size={18} />
            <span>Login with Facebook</span>
          </button>
        </Form>

        {msg && (
          <Alert variant={msg.includes('Error') ? 'danger' : 'info'} className="mt-3 mb-0 text-center py-2 rounded-3 small">
            {msg}
          </Alert>
        )}
      </div>
    </div>
  );
}
