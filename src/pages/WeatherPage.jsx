// src/pages/WeatherPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SettingsContext } from '../context/SettingsContext';
import { FavoritesContext } from '../context/FavoritesContext';
import ForecastItem from '../components/ForecastItem';
import HourlyChart from '../components/HourlyChart';
import { BsWind, BsDroplet, BsSun, BsStar, BsStarFill } from 'react-icons/bs';

const WeatherPage = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const { units } = useContext(SettingsContext);
  const { favoriteCities, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const unitSymbol = units === 'metric' ? '°C' : '°F';
  
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'e36f009e055d14d197eb428b19b26fed';

  // --- FUNGSI BARU YANG LEBIH PINTAR ---
  const getCityDisplayName = (city) => {
    // Menghapus "Kota ", "Kabupaten ", dan ",ID" untuk nama yang bersih
    return city.replace("Kota ", "").replace("Kabupaten ", "").split(',')[0];
  };
  
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      // Gunakan nama kota yang sudah dibersihkan untuk API call
      const cityToFetch = getCityDisplayName(cityName || 'Pekanbaru'); 
      
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityToFetch},ID&appid=${API_KEY}&units=${units}&lang=id`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityToFetch},ID&appid=${API_KEY}&units=${units}&lang=id`;
      try {
        const [currentWeatherRes, forecastRes] = await Promise.all([ fetch(currentWeatherUrl), fetch(forecastUrl) ]);
        if (!currentWeatherRes.ok || !forecastRes.ok) { throw new Error('Kota tidak ditemukan. Coba nama lain.'); }
        const currentWeatherData = await currentWeatherRes.json();
        const forecastData = await forecastRes.json();
        setCurrentWeather(currentWeatherData);
        setForecast(forecastData);
      } catch (err) { 
        setError(err.message);
        setCurrentWeather(null);
        setForecast(null);
      } finally { 
        setLoading(false); 
      }
    };
    fetchAllData();
  }, [cityName, units]);

  const isFavorite = currentWeather && favoriteCities.includes(currentWeather.name);

  const handleFavoriteToggle = () => {
    if (!currentWeather) return;
    const cleanName = getCityDisplayName(currentWeather.name);
    if (isFavorite) {
      removeFavorite(cleanName);
    } else {
      addFavorite(cleanName);
    }
  };

  const DetailCard = ({ icon, title, value }) => (
    <div className="flex items-center gap-4">
      <span className="text-2xl text-slate-500 dark:text-slate-400">{icon}</span>
      <div>
        <p className="text-slate-500 dark:text-slate-400 text-sm">{title}</p>
        <p className="font-bold text-lg text-slate-800 dark:text-white">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in-up">
      {/* --- TOMBOL FAVORIT DENGAN NAVIGASI YANG DIPERBAIKI --- */}
      <div className="flex flex-wrap items-center gap-3 mb-8 border-b-2 border-slate-200 dark:border-slate-700 pb-4">
        <h2 className="text-sm font-bold text-slate-400 mr-4">KOTA FAVORIT:</h2>
        {favoriteCities.map(city => {
          const cleanCityName = getCityDisplayName(city);
          return (
            <button
              key={cleanCityName}
              onClick={() => navigate(`/app/weather/${cleanCityName}`)}
              className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300
                ${cleanCityName === cityName
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
            >
              {cleanCityName}
            </button>
          )
        })}
      </div>

      {/* Sisa JSX tetap sama */}
      {loading && <div className="flex justify-center items-center h-full"><p className="text-xl">Memuat...</p></div>}
      {error && !loading && <div className="flex justify-center items-center h-full"><p className="text-xl text-red-500">{error}</p></div>}
      
      {currentWeather && forecast && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6">
          <div className="lg:col-span-2 bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl flex justify-between items-start shadow-lg dark:shadow-none">
            <div>
              <h2 className="text-3xl font-bold">{currentWeather.name}</h2>
              <p className="text-slate-500 dark:text-slate-400">Peluang Hujan: {currentWeather.clouds.all}%</p>
              <p className="text-8xl font-thin my-4">{Math.round(currentWeather.main.temp)}{unitSymbol}</p>
            </div>
            <button onClick={handleFavoriteToggle} className="text-2xl text-yellow-400 hover:scale-110 transition-transform" title="Tambah/Hapus Favorit">
              {isFavorite ? <BsStarFill /> : <BsStar />}
            </button>
          </div>

          <div className="lg:row-span-2 bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl shadow-lg dark:shadow-none">
            <h3 className="font-bold mb-4 text-slate-600 dark:text-slate-300">RAMALAN 7 HARI</h3>
            <div className="space-y-2">
              {forecast.list.filter(item => item.dt_txt.includes("12:00:00")).map((item, index) => (
                <ForecastItem key={index} forecast={item} unitSymbol={unitSymbol} />
              ))}
            </div>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl shadow-lg dark:shadow-none">
            <HourlyChart data={forecast.list} unitSymbol={unitSymbol} />
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl shadow-lg dark:shadow-none">
            <h3 className="font-bold mb-4 text-slate-600 dark:text-slate-300">KONDISI UDARA</h3>
            <div className="grid grid-cols-2 gap-y-6">
              <DetailCard icon={<BsSun />} title="Terasa Seperti" value={`${Math.round(currentWeather.main.feels_like)}${unitSymbol}`} />
              <DetailCard icon={<BsWind />} title="Angin" value={`${currentWeather.wind.speed} ${units === 'metric' ? 'm/s' : 'mph'}`} />
              <DetailCard icon={<BsDroplet />} title="Peluang Hujan" value={`${currentWeather.clouds.all}%`} />
              <DetailCard icon={<BsSun />} title="Indeks UV" value="N/A" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;