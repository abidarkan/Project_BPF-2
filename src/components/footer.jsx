// src/components/Footer.jsx
import React from 'react';
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 text-center">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        © {currentYear} Weather App Riau. All Rights Reserved.
      </p>
      <MdEmail/>
    </footer>
  );
};

export default Footer;