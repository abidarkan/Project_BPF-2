import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SettingsContext } from '../context/SettingsContext';
import ForecastItem from '../components/ForecastItem';
import HourlyChart from '../components/HourlyChart';
import { BsWind, BsDroplet, BsSun, BsStar, BsStarFill } from 'react-icons/bs';

const WeatherPage = () => {
  const { cityName } = useParams();
  const { units } = useContext(SettingsContext);
  const unitSymbol = units === 'metric' ? '°C' : '°F';
  
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'e36f009e055d14d197eb428b19b26fed'; 

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      const cityToFetch = cityName || 'Pekanbaru';
      
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityToFetch},ID&appid=${API_KEY}&units=${units}&lang=id`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityToFetch},ID&appid=${API_KEY}&units=${units}&lang=id`;
      try {
        const [currentWeatherRes, forecastRes] = await Promise.all([ fetch(currentWeatherUrl), fetch(forecastUrl) ]);
        if (!currentWeatherRes.ok || !forecastRes.ok) { throw new Error('Kota tidak ditemukan.'); }
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

  const DetailCard = ({ icon, title, value }) => (
    <div className="flex items-center gap-4">
      <span className="text-xl text-slate-500 dark:text-slate-400">{icon}</span>
      <div>
        <p className="text-slate-500 dark:text-slate-400 text-sm">{title}</p>
        <p className="font-bold text-base">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in-up space-y-6">
      {/* Container untuk Tombol Favorit di Halaman Cuaca */}
      {/* Logika ini bisa ditambahkan jika Anda ingin tombol favorit di halaman ini */}

      {loading && <div className="text-center p-10"><p className="text-xl">Memuat...</p></div>}
      {error && !loading && <div className="text-center p-10"><p className="text-xl text-red-500">{error}</p></div>}
      
      {currentWeather && forecast && !loading && (
        // --- PERUBAHAN UTAMA DI SINI ---
        // Layout sekarang menjadi 'flex flex-col' di layar kecil, dan 'grid' di layar besar (lg)
        <div className="flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-6">
          
          <div className="lg:col-span-2 bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl flex justify-between items-center shadow-lg dark:shadow-none">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold">{currentWeather.name}</h2>
              <p className="text-slate-500 dark:text-slate-400">Peluang Hujan: {currentWeather.clouds.all}%</p>
              <p className="text-7xl lg:text-8xl font-thin my-4">{Math.round(currentWeather.main.temp)}{unitSymbol}</p>
            </div>
            <img src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`} alt="ikon cuaca" className="w-28 h-28 lg:w-40 lg:h-40" />
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