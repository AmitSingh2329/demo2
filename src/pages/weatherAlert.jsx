import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const WeatherAlerts = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState("Your Location");

  const getLocation = () =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          }),
        reject
      );
    });

  const getLocationName = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );

      setLocationName(
        res.data.address.city ||
          res.data.address.town ||
          res.data.address.village ||
          "Your Location"
      );
    } catch {}
  };

  const fetchAlerts = async () => {
    try {
      let lat = 20.2961;
      let lon = 85.8245;

      try {
        const loc = await getLocation();
        lat = loc.lat;
        lon = loc.lon;
        getLocationName(lat, lon);
      } catch {}

      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/alerts`, {
        params: { lat, lon },
        withCredentials: true,
      });

      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white text-xl bg-black animate-pulse">
        🌤 Loading weather insights...
      </div>
    );
  }

  if (!data || !data.weather) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-black">
        ⚠️ Failed to load weather data
      </div>
    );
  }

  const { weather, alerts } = data;

  const getStyle = (s) => {
    if (s === "Critical")
      return "bg-gradient-to-r from-red-700 to-red-500 animate-pulse";
    if (s === "High")
      return "bg-gradient-to-r from-red-500 to-orange-500";
    if (s === "Medium")
      return "bg-gradient-to-r from-yellow-400 to-orange-400";
    return "bg-gradient-to-r from-green-500 to-green-600";
  };

  return (
    <div className="h-screen overflow-hidden relative bg-gradient-to-br from-green-900 via-black to-green-800 text-white">

      {/* subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_70%)]"></div>

      {/* MAIN */}
      <div className="relative z-10 h-full flex flex-col p-5 max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 shrink-0">
          <div>
            <h1 className="text-3xl font-bold">
              📍 {locationName}
            </h1>
            <p className="text-sm text-green-300">
              Smart Weather Alerts
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchAlerts}
            className="bg-white/10 backdrop-blur-lg border border-white/20 px-5 py-2 rounded-full hover:bg-white/20 transition"
          >
            🔄 Refresh
          </motion.button>
        </div>

        {/* WEATHER */}
        <div className="grid md:grid-cols-2 gap-5 mb-5 shrink-0">

          {/* NEXT 3 HOURS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-xl"
          >
            <h2 className="text-sm font-semibold mb-3 text-green-300">
              ⚡ Next 3 Hours
            </h2>

            <div className="flex justify-between text-xl font-bold">
              <span>🌡 {weather.next3Hours?.maxTemp}°C</span>
              <span>🌧 {weather.next3Hours?.totalRain} mm</span>
            </div>
          </motion.div>

          {/* FULL DAY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-xl"
          >
            <h2 className="text-sm font-semibold mb-3 text-green-300">
              📅 Today
            </h2>

            <div className="grid grid-cols-3 text-center">
              <div>
                <p className="text-2xl font-bold">
                  {weather.fullDay?.maxTemp}°
                </p>
                <small>Max</small>
              </div>

              <div>
                <p className="text-2xl font-bold">
                  {weather.fullDay?.minTemp}°
                </p>
                <small>Min</small>
              </div>

              <div>
                <p className="text-2xl font-bold">
                  {weather.fullDay?.maxRain}
                </p>
                <small>Rain</small>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ALERTS (scroll only here) */}
        <div className="flex-1 overflow-y-auto pr-2">

          <h2 className="text-lg font-bold mb-4 text-green-300">
            🚨 Alerts
          </h2>

          {alerts.length === 0 ? (
            <div className="bg-green-500/20 border border-green-400/40 p-4 rounded-xl text-center">
              ✅ No Alerts
            </div>
          ) : (
            alerts.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className={`mb-3 p-5 rounded-xl shadow-xl ${getStyle(
                  a.severity
                )}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-lg">
                    {a.type}
                  </span>

                  <span className="text-xs bg-white/20 px-2 py-1 rounded">
                    {a.severity}
                  </span>
                </div>

                <p className="text-sm opacity-90">
                  {a.message}
                </p>

                {a.severity === "High" && (
                  <div className="mt-2 text-xs animate-pulse">
                    ⚠ Take action soon
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherAlerts;