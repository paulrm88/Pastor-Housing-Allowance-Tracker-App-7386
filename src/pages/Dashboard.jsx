import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useExpense } from '../context/ExpenseContext';
import ExpenseForm from '../components/ExpenseForm';

const { FiDollarSign, FiTrendingUp, FiTrendingDown, FiPlus, FiEdit3 } = FiIcons;

function Dashboard() {
  const { 
    annualAllowance, 
    setAnnualAllowance, 
    getTotalExpenses, 
    getRemainingAllowance,
    expenses 
  } = useExpense();
  
  const [showAllowanceForm, setShowAllowanceForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [allowanceInput, setAllowanceInput] = useState(annualAllowance);

  const totalExpenses = getTotalExpenses();
  const remainingAllowance = getRemainingAllowance();
  const usagePercentage = annualAllowance > 0 ? (totalExpenses / annualAllowance) * 100 : 0;

  const handleAllowanceSubmit = (e) => {
    e.preventDefault();
    setAnnualAllowance(parseFloat(allowanceInput) || 0);
    setShowAllowanceForm(false);
  };

  const recentExpenses = expenses.slice(-3).reverse();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Housing Allowance Tracker
        </h1>
        <p className="text-gray-600">
          Manage and track your housing allowance expenses
        </p>
      </div>

      {/* Annual Allowance Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Annual Allowance</h2>
          <button
            onClick={() => {
              setAllowanceInput(annualAllowance);
              setShowAllowanceForm(true);
            }}
            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiEdit3} className="w-5 h-5" />
          </button>
        </div>

        {showAllowanceForm ? (
          <form onSubmit={handleAllowanceSubmit} className="space-y-4">
            <input
              type="number"
              value={allowanceInput}
              onChange={(e) => setAllowanceInput(e.target.value)}
              placeholder="Enter annual allowance amount"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowAllowanceForm(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="text-3xl font-bold text-indigo-600">
            ${annualAllowance.toLocaleString()}
          </div>
        )}
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalExpenses.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <SafeIcon icon={FiTrendingDown} className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Remaining</p>
              <p className="text-2xl font-bold text-green-600">
                ${remainingAllowance.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Usage</p>
              <p className="text-2xl font-bold text-gray-900">
                {usagePercentage.toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  usagePercentage > 90 ? 'bg-red-500' : 
                  usagePercentage > 75 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
              ></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <button
          onClick={() => setShowExpenseForm(true)}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          Add New Expense
        </button>
      </motion.div>

      {/* Recent Expenses */}
      {recentExpenses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Expenses</h3>
          <div className="space-y-3">
            {recentExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{expense.description}</p>
                  <p className="text-sm text-gray-500">{expense.category}</p>
                </div>
                <p className="font-bold text-gray-900">${expense.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Expense Form Modal */}
      {showExpenseForm && (
        <ExpenseForm
          onClose={() => setShowExpenseForm(false)}
          onSubmit={() => setShowExpenseForm(false)}
        />
      )}
    </motion.div>
  );
}

export default Dashboard;