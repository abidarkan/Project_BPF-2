// src/pages/WeatherPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import ForecastItem from '../components/ForecastItem';
import HourlyChart from '../components/HourlyChart';
import { BsSearch, BsWind, BsDroplet, BsSun } from 'react-icons/bs';

const WeatherPage = () => {
  const { units } = useContext(SettingsContext);
  const unitSymbol = units === 'metric' ? '°C' : '°F';
  
  const [selectedCity, setSelectedCity] = useState('Pekanbaru');
  const [searchInput, setSearchInput] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = 'e36f009e055d14d197eb428b19b26fed';

  useEffect(() => {
    if (!selectedCity) return;
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}&units=${units}&lang=id`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${API_KEY}&units=${units}&lang=id`;
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
  }, [selectedCity, units]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput) setSelectedCity(`${searchInput},ID`);
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
      <form onSubmit={handleSearch} className="flex items-center w-full max-w-3xl mb-8 border-b-2 border-slate-200 dark:border-slate-700 pb-4">
        <BsSearch className="text-slate-500 dark:text-slate-400 mr-4 text-xl" />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Cari kota..."
          className="w-full bg-transparent text-lg placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none"
        />
      </form>

      {loading && <div className="flex justify-center items-center h-full"><p className="text-xl">Memuat...</p></div>}
      {error && !loading && <div className="flex justify-center items-center h-full"><p className="text-xl text-red-500">{error}</p></div>}
      
      {currentWeather && forecast && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6">
          
          <div className="lg:col-span-2 bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl flex justify-between items-center shadow-lg dark:shadow-none">
            <div>
              <h2 className="text-3xl font-bold">{currentWeather.name}</h2>
              <p className="text-slate-500 dark:text-slate-400">Peluang Hujan: {currentWeather.clouds.all}%</p>
              <p className="text-8xl font-thin my-4">{Math.round(currentWeather.main.temp)}{unitSymbol}</p>
            </div>
            <img src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`} alt="ikon cuaca" className="w-40 h-40" />
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