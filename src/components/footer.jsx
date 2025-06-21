// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 text-center">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        © {currentYear} Weather App Riau. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;