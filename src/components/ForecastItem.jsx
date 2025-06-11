import React from 'react';

const ForecastItem = ({ forecast, unitSymbol }) => {
  const temp = Math.round(forecast.main.temp);
  const iconCode = forecast.weather[0].icon;
  const date = new Date(forecast.dt_txt);
  const dayName = date.toLocaleDateString('id-ID', { weekday: 'long' });

  return (
    <div className="flex justify-between items-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50 p-2 rounded-lg transition-colors">
      <p className="w-1/3 font-medium">{dayName}</p>
      <img 
        src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`} 
        alt="Weather Icon"
        className="w-10 h-10"
      />
      <p className="w-1/3 text-right font-semibold text-slate-800 dark:text-white">{temp}{unitSymbol}</p>
    </div>
  );
};

export default ForecastItem;