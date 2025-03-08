
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import GlitchText from '@/components/GlitchText';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (await login(email, password)) {
      navigate(from, { replace: true });
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
            <GlitchText text="hackXtreme" className="text-cyber-red" glitchOnHover={false} />
          </h2>
          <p className="mt-2 text-center text-sm text-cyber-muted-text terminal-text">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyber-red hover:text-cyber-red-hover">
              Register
            </Link>
          </p>
        </div>

        <div className="cyber-card p-1 rounded-lg overflow-hidden shadow-xl">
          <div className="bg-cyber-background-alt p-6 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-red via-cyber-red to-cyber-red"></div>
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm space-y-4">
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
                    placeholder="demo@example.com"
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
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-cyber-background border border-cyber-border text-white px-3 py-2 mt-1 block w-full rounded-md focus:outline-none focus:ring-1 focus:ring-cyber-red focus:border-cyber-red"
                    placeholder="Any password works with demo@example.com"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-cyber-border bg-cyber-background text-cyber-red focus:ring-cyber-red"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-cyber-muted-text terminal-text">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="text-cyber-red hover:text-cyber-red-hover terminal-text">
                    Forgot password?
                  </a>
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
                    <Lock size={20} />
                    <span>ACCESS SYSTEM</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        
        <div className="text-center mt-4 text-xs text-cyber-muted-text terminal-text">
          <p>Demo credentials: demo@example.com / any password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
