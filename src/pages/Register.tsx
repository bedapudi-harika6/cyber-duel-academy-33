
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User } from 'lucide-react';
import GlitchText from '@/components/GlitchText';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    if (await register(username, email, password)) {
      navigate('/');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cyber-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-red to-cyber-neon rounded-md rotate-45 animate-pulse-glow"></div>
            <div className="relative bg-cyber-background-alt p-2 rounded-sm">
              <div className="text-cyber-red text-xl font-bold orbitron">hX</div>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            <GlitchText text="JOIN hackXtreme" className="text-cyber-red" glitchOnHover={false} />
          </h2>
          <p className="mt-2 text-center text-sm text-cyber-muted-text terminal-text">
            Already have an account?{' '}
            <Link to="/login" className="text-cyber-red hover:text-cyber-red-hover">
              Login
            </Link>
          </p>
        </div>

        <div className="cyber-card p-1 rounded-lg overflow-hidden shadow-xl">
          <div className="bg-cyber-background-alt p-6 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-red via-cyber-red to-cyber-red"></div>
            
            {error && (
              <div className="mb-4 p-2 bg-red-900/30 border border-cyber-red text-cyber-red text-sm rounded">
                {error}
              </div>
            )}
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="username" className="terminal-text text-cyber-muted-text text-sm">
                    USERNAME
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-cyber-background border border-cyber-border text-white px-3 py-2 mt-1 block w-full rounded-md focus:outline-none focus:ring-1 focus:ring-cyber-red focus:border-cyber-red"
                    placeholder="hackerX"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="terminal-text text-cyber-muted-text text-sm">
                    EMAIL
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-cyber-background border border-cyber-border text-white px-3 py-2 mt-1 block w-full rounded-md focus:outline-none focus:ring-1 focus:ring-cyber-red focus:border-cyber-red"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="terminal-text text-cyber-muted-text text-sm">
                    PASSWORD
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-cyber-background border border-cyber-border text-white px-3 py-2 mt-1 block w-full rounded-md focus:outline-none focus:ring-1 focus:ring-cyber-red focus:border-cyber-red"
                    placeholder="Create a strong password"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="terminal-text text-cyber-muted-text text-sm">
                    CONFIRM PASSWORD
                  </label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-cyber-background border border-cyber-border text-white px-3 py-2 mt-1 block w-full rounded-md focus:outline-none focus:ring-1 focus:ring-cyber-red focus:border-cyber-red"
                    placeholder="Repeat your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="cyber-button-primary w-full flex justify-center items-center space-x-2"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <User size={20} />
                    <span>CREATE ACCOUNT</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
