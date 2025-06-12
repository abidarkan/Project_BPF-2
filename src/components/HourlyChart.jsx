// src/components/HourlyChart.jsx
import React, { useContext } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { SettingsContext } from '../context/SettingsContext';

const HourlyChart = ({ data, unitSymbol }) => {
  const { theme } = useContext(SettingsContext);
  const chartColor = theme === 'dark' ? '#FFFFFF' : '#334155'; // Warna teks grafik sesuai tema

  const chartData = data.slice(0, 8).map(item => ({
    time: new Date(item.dt_txt).toLocaleTimeString('id-ID', { hour: '2-digit' }) + ':00',
    temp: Math.round(item.main.temp),
  }));

  return (
    <div className="mt-6">
      <h3 className="font-bold mb-4 text-slate-600 dark:text-slate-300">PRAKIRAAN PER JAM</h3>
      <div style={{ width: '100%', height: 150 }}>
        <ResponsiveContainer>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke={chartColor} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke={chartColor} fontSize={12} unit={unitSymbol} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ 
                backgroundColor: theme === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)', 
                border: '1px solid #475569',
                color: chartColor,
                borderRadius: '0.5rem'
              }}
              cursor={{ fill: 'rgba(136, 132, 216, 0.1)' }}
            />
            <Area type="monotone" dataKey="temp" stroke="#8884d8" fillOpacity={1} fill="url(#colorTemp)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HourlyChart;