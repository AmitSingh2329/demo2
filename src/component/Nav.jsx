import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Navbar({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
      setUser(null);
      setProfileOpen(false);
      setIsOpen(false);
      navigate("/login");
    } catch {}
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false);
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 h-16 w-full bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)] text-white"
    >
      {/* top glow line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          {/* 🔥 Logo */}
          <Link to="/" className="text-xl font-bold flex items-center gap-1">
            <span className="text-green-400">Agro</span>
            <span className="text-white">AI</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Home */}
            <Link className="relative group" to="/">
              <span
                className={
                  isActive("/")
                    ? "text-green-300"
                    : "group-hover:text-green-300"
                }
              >
                Home
              </span>
              {isActive("/") && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-400 rounded-full"></span>
              )}
            </Link>

            {/* Dashboard */}
            <Link className="relative group" to="/dashboard">
              <span
                className={
                  isActive("/dashboard")
                    ? "text-green-300"
                    : "group-hover:text-green-300"
                }
              >
                Dashboard
              </span>
              {isActive("/dashboard") && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-400 rounded-full"></span>
              )}
            </Link>

            {/* Features Dropdown */}
            <div
              onMouseEnter={() => setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}
              className="relative"
            >
              <button className="flex items-center gap-1 hover:text-green-300">
                Features <ChevronDown size={16} />
              </button>

              <AnimatePresence>
                {dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-14 w-60 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                  >
                    {[
                      { to: "/crop", label: "🌾 Crop Recommendation" },
                      { to: "/disease", label: "🦠 Disease Detection" },
                      { to: "/yield", label: "📈 Yield Prediction" },

                      { to: "/alerts", label: "🌦 Weather Alert" },
                    ].map((item, i) => (
                      <Link
                        key={i}
                        to={item.to}
                        className={`block px-4 py-3 text-sm transition-all ${
                          location.pathname === item.to
                            ? "bg-green-500/20 text-green-300"
                            : "hover:bg-white/10 hover:translate-x-1"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full hover:bg-white/20 hover:scale-105 transition"
                >
                  <User size={18} />
                  <span>{user.name}</span>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute right-0 mt-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl w-40"
                    >
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 hover:bg-white/10"
                      >
                        Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/20"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* 🔥 Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black/80 backdrop-blur-xl border-t border-white/10 px-4 pb-4"
          >
            <Link
              onClick={() => setIsOpen(false)}
              to="/"
              className="block py-2"
            >
              Home
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              to="/dashboard"
              className="block py-2"
            >
              Dashboard
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              to="/crop"
              className="block py-2"
            >
              🌾 Crop Recommendation
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              to="/disease"
              className="block py-2"
            >
              🦠 Disease Detection
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              to="/yield"
              className="block py-2"
            >
              📈 Yield Prediction
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              to="/alerts"
              className="block py-2"
            >
              🌦 Weather Alert
            </Link>

            {user ? (
              <button
                onClick={handleLogout}
                className="mt-3 w-full bg-red-500 px-4 py-2 rounded-lg font-semibold"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="mt-3 block text-center bg-green-500 px-4 py-2 rounded-lg font-semibold"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 block text-center bg-blue-500 px-4 py-2 rounded-lg font-semibold"
                >
                  Register
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
