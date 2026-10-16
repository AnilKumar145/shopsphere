/**
 * Authentication Route (Sign In & Demo Registration)
 * Demonstrates 6.2 Form Events, 6.4 Controlled Components, 6.6 Form Validation, 11.2 Login Integration
 */

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, Mail, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './LoginPage.css';

interface LocationState {
  from?: {
    pathname: string;
  };
}

export const LoginPage: React.FC = () => {
  useDocumentTitle('Account Access');
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [username, setUsername] = useState('johnd');
  const [password, setPassword] = useState('m38rmF$');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Field Errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const { login, demoQuickLogin, isLoading, error: authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const targetDestination = state?.from?.pathname || '/account';

  const validateSignIn = (): boolean => {
    const errors: Record<string, string> = {};
    if (!username.trim()) {
      errors.username = 'Username is required';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 4) {
      errors.password = 'Password must be at least 4 characters';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateRegister = (): boolean => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errors.email = 'Valid email address is required';
    if (!username.trim()) errors.username = 'Username is required';
    if (!password || password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignIn()) return;

    const success = await login({ username, password });
    if (success) {
      navigate(targetDestination, { replace: true });
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegister()) return;

    // Fake Store API demo registration
    setRegisteredSuccess(true);
    setTimeout(async () => {
      await demoQuickLogin('customer');
      navigate(targetDestination, { replace: true });
    }, 1200);
  };

  const handleQuickLogin = async (role: 'customer' | 'admin') => {
    await demoQuickLogin(role);
    navigate(targetDestination, { replace: true });
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-card">
          <div className="login-card__header">
            <span className="section-eyebrow">Client Portal</span>
            <h1 className="login-card__title">
              {activeTab === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="login-card__desc">
              Access your saved wishlist, private curations, and order dispatch records.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="login-tabs">
            <button
              type="button"
              className={`login-tab ${activeTab === 'signin' ? 'login-tab--active' : ''}`}
              onClick={() => {
                setActiveTab('signin');
                setFieldErrors({});
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`login-tab ${activeTab === 'register' ? 'login-tab--active' : ''}`}
              onClick={() => {
                setActiveTab('register');
                setFieldErrors({});
              }}
            >
              Register (Demo)
            </button>
          </div>

          {/* Auth Error Banner */}
          {authError && (
            <div className="login-alert login-alert--error" role="alert">
              <ShieldAlert size={18} className="login-alert__icon" />
              <span>{authError}</span>
            </div>
          )}

          {registeredSuccess && (
            <div className="login-alert login-alert--success" role="alert">
              <CheckCircle2 size={18} className="login-alert__icon" />
              <span>Demo account registered successfully! Signing in...</span>
            </div>
          )}

          {/* Sign In Form */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignInSubmit} className="login-form">
              <Input
                label="Username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={fieldErrors.username}
                leftIcon={<User size={16} />}
                placeholder="e.g. johnd"
              />

              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={fieldErrors.password}
                leftIcon={<Lock size={16} />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="password-toggle-btn"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
                placeholder="Enter your password"
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isFullWidth
                isLoading={isLoading}
                style={{ marginTop: '0.5rem' }}
              >
                Sign In to ShopSphere
              </Button>
            </form>
          )}

          {/* Registration Form */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="login-form">
              <Input
                label="Full Name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={fieldErrors.fullName}
                leftIcon={<User size={16} />}
                placeholder="e.g. Eleanor Vance"
              />

              <Input
                label="Email Address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={fieldErrors.email}
                leftIcon={<Mail size={16} />}
                placeholder="eleanor@example.com"
              />

              <Input
                label="Choose Username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={fieldErrors.username}
                placeholder="e.g. eleanor_v"
              />

              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={fieldErrors.password}
                leftIcon={<Lock size={16} />}
                placeholder="Minimum 6 characters"
              />

              <Input
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={fieldErrors.confirmPassword}
                leftIcon={<Lock size={16} />}
                placeholder="Re-enter your password"
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isFullWidth
                isLoading={isLoading}
                style={{ marginTop: '0.5rem' }}
              >
                Create Demo Account
              </Button>
            </form>
          )}

          {/* Quick Demo Login Shortcuts */}
          <div className="demo-shortcuts">
            <div className="demo-shortcuts__title">
              <Sparkles size={14} />
              <span>Instant Reviewer Credentials</span>
            </div>
            <p className="demo-shortcuts__desc">
              Fake Store API provides demo credentials. Use the one-click shortcuts below:
            </p>
            <div className="demo-shortcuts__buttons">
              <button
                type="button"
                className="demo-shortcut-btn"
                onClick={() => handleQuickLogin('customer')}
              >
                <strong>Quick Login: Customer</strong>
                <span>User: johnd (John Doe)</span>
              </button>
              <button
                type="button"
                className="demo-shortcut-btn"
                onClick={() => handleQuickLogin('admin')}
              >
                <strong>Quick Login: Administrator</strong>
                <span>User: admin_sophia (Admin Role)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
