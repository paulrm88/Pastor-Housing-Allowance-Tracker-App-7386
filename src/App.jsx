import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import FAQ from './pages/FAQ';
import { ExpenseProvider } from './context/ExpenseContext';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Housing Allowance Tracker...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <ExpenseProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="pb-20">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/faq" element={<FAQ />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </Router>
    </ExpenseProvider>
  );
}

export default App;