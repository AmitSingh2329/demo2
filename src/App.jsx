// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { AnimatePresence, motion } from "framer-motion";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import CropRecommendation from "./pages/CropRecommendation";
// import Navbar from "./component/navbar";
// import ProtectedRoute from "./component/ProtectedRoute";
// import WeatherAlertsPage from "./pages/weatherAlert";
// import DiseaseDetection from "./pages/DiseaseDetection";

// /* 🔥 Page Wrapper (FINAL) */
// const PageWrapper = ({ children, noScroll = false }) => {
//   return (
//     <motion.div
//       className={`relative ${
//         noScroll
//           ? "h-[calc(100vh-64px)] overflow-hidden"
//           : "min-h-[calc(100vh-64px)]"
//       }`}
//       initial={{ opacity: 0, scale: 0.97, filter: "blur(10px)" }}
//       animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
//       exit={{ opacity: 0, scale: 0.97, filter: "blur(10px)" }}
//       transition={{ duration: 0.4 }}
//     >
//       {/* Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-black via-green-900 to-black z-0" />

//       {/* Overlay */}
//       <motion.div
//         className="absolute inset-0 bg-black z-10 pointer-events-none"
//         initial={{ opacity: 0.6 }}
//         animate={{ opacity: 0 }}
//         exit={{ opacity: 0.6 }}
//         transition={{ duration: 0.4 }}
//       />

//       {/* Content */}
//       <div className="relative z-20 h-full">{children}</div>
//     </motion.div>
//   );
// };

// /* 🔥 Animated Routes */
// function AnimatedRoutes({ user, setUser }) {
//   const location = useLocation();

//   return (
//     <AnimatePresence mode="wait">
//       <Routes location={location} key={location.pathname}>
//         {/* Scrollable Pages */}
//         <Route
//           path="/"
//           element={
//             <PageWrapper>
//               <Home />
//             </PageWrapper>
//           }
//         />

//         <Route
//           path="/crop"
//           element={
//             <ProtectedRoute user={user}>
//               <PageWrapper>
//                 <CropRecommendation />
//               </PageWrapper>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute user={user}>
//               <PageWrapper>
//                 <Dashboard user={user} setUser={setUser} />
//               </PageWrapper>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/disease"
//           element={
//             <ProtectedRoute user={user}>
//               <PageWrapper>
//                 <DiseaseDetection />
//               </PageWrapper>
//             </ProtectedRoute>
//           }
//         />

//         {/* No Scroll Pages */}

//         <Route
//           path="/login"
//           element={
//             <PageWrapper noScroll>
//               <Login setUser={setUser} />
//             </PageWrapper>
//           }
//         />

//         <Route
//           path="/register"
//           element={
//             <PageWrapper noScroll>
//               <Register />
//             </PageWrapper>
//           }
//         />

//         <Route
//           path="/alerts"
//           element={
//             <ProtectedRoute user={user}>
//               <PageWrapper noScroll>
//                 <WeatherAlertsPage />
//               </PageWrapper>
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </AnimatePresence>
//   );
// }

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`, {
//         withCredentials: true,
//       })
//       .then((res) => {
//         setUser(res.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setUser(null);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div className="p-6">Loading...</div>;
//   }

//   return (
//     <BrowserRouter>
//       <Navbar user={user} setUser={setUser} />
//       <AnimatedRoutes user={user} setUser={setUser} />
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./component/navbar";
import ProtectedRoute from "./component/ProtectedRoute";

/* 🔥 Lazy Loaded Pages */
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CropRecommendation = lazy(() => import("./pages/CropRecommendation"));
const WeatherAlertsPage = lazy(() => import("./pages/weatherAlert"));
const DiseaseDetection = lazy(() => import("./pages/DiseaseDetection"));

/* 🔥 Page Wrapper */
const PageWrapper = ({ children, noScroll = false }) => {
  return (
    <motion.div
      className={`relative ${
        noScroll
          ? "h-[calc(100vh-64px)] overflow-hidden"
          : "min-h-[calc(100vh-64px)]"
      }`}
      initial={{ opacity: 0, scale: 0.97, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.97, filter: "blur(10px)" }}
      transition={{ duration: 0.4 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-green-900 to-black z-0" />

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black z-10 pointer-events-none"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0.6 }}
        transition={{ duration: 0.4 }}
      />

      {/* Content */}
      <div className="relative z-20 h-full">{children}</div>
    </motion.div>
  );
};

/* 🔥 Animated Routes */
function AnimatedRoutes({ user, setUser }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Home */}
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />

        {/* Crop */}
        <Route
          path="/crop"
          element={
            <ProtectedRoute user={user}>
              <PageWrapper>
                <CropRecommendation />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <PageWrapper>
                <Dashboard user={user} setUser={setUser} />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        {/* Disease */}
        <Route
          path="/disease"
          element={
            <ProtectedRoute user={user}>
              <PageWrapper>
                <DiseaseDetection />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            <PageWrapper noScroll>
              <Login setUser={setUser} />
            </PageWrapper>
          }
        />

        {/* Register */}
        <Route
          path="/register"
          element={
            <PageWrapper noScroll>
              <Register />
            </PageWrapper>
          }
        />

        {/* Alerts */}
        <Route
          path="/alerts"
          element={
            <ProtectedRoute user={user}>
              <PageWrapper noScroll>
                <WeatherAlertsPage />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

/* 🔥 Main App */
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />

      {/* 🔥 Suspense wrapper for lazy pages */}
      <Suspense fallback={null}>
        <AnimatedRoutes user={user} setUser={setUser} />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;