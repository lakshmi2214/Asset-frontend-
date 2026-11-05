import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Alert } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { API_BASE, PROD_BACKEND } from '../auth';

export default function Signup({ setUser }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    if (!username || !password) {
      setMsg('Please enter username and password');
      return;
    }
    if (password.length < 3) {
      setMsg('Password must be at least 3 characters');
      return;
    }

    const requestData = {
      username,
      password,
      email: email || undefined,
      phone: phone || undefined
    };

    setLoading(true);
    setMsg('Signing up...');

    const targetApi = API_BASE || PROD_BACKEND;

    try {
      let res;
      try {
        res = await fetch(`${targetApi}/api/v1/auth/signup/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData)
        });
      } catch (fetchErr) {
        if (targetApi !== PROD_BACKEND) {
          res = await fetch(`${PROD_BACKEND}/api/v1/auth/signup/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
          });
        } else {
          throw fetchErr;
        }
      }

      if (res && res.ok) {
        const tokenRes = await fetch(`${targetApi}/api/v1/auth/token/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email: email || username, password })
        });

        if (tokenRes.ok) {
          const tokens = await tokenRes.json();
          localStorage.setItem('access', tokens.access);
          localStorage.setItem('refresh', tokens.refresh);
          localStorage.removeItem('standalone_mode');
          setUser(tokens.access);
          setMsg('Signup successful!');
          navigate('/');
        } else {
          setMsg('Signup succeeded! Please login with your new account.');
          navigate('/login');
        }
      } else {
        try {
          const t = await res.json();
          setMsg('Error: ' + (t.detail || JSON.stringify(t)));
        } catch (e) {
          setMsg('Error: ' + (res ? `${res.status} ${res.statusText}` : 'Unable to connect to server'));
        }
      }
    } catch (err) {
      console.error('Signup error:', err);
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
          {/* Username Input */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter Your Username"
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

          {/* Email Input */}
          <div className="mb-3">
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
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

          {/* Phone Number Input */}
          <div className="mb-3">
            <input
              type="tel"
              placeholder="Enter Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
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

          {/* Password Input with Eye Toggle */}
          <div className="mb-4 position-relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
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

          {/* Primary Signup Button */}
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
            {loading ? 'Signing up...' : 'Signup'}
          </button>

          {/* Already have an account? Login */}
          <div className="text-center mt-3 mb-1" style={{ fontSize: '0.94rem', color: '#475569' }}>
            <span>Already have an account? </span>
            <Link to="/login" className="fw-bold text-decoration-none" style={{ color: '#1877f2' }}>
              Login
            </Link>
          </div>
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
