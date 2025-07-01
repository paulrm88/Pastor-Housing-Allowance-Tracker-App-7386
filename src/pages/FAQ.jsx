import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiChevronDown, FiChevronUp, FiInfo } = FiIcons;

function FAQ() {
  const [openItems, setOpenItems] = useState(new Set([0])); // First item open by default

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      question: "What is a housing allowance?",
      answer: "A housing allowance (also called a parsonage allowance) is a tax-free benefit that churches can provide to ordained ministers to help cover housing expenses. This allowance must be designated in advance by the church and can only be used for qualifying housing expenses."
    },
    {
      question: "Who is eligible for a housing allowance?",
      answer: "Only ordained, licensed, or commissioned ministers who perform ministerial services are eligible for housing allowance benefits. The minister must be serving in a capacity that is recognized by their church or denomination."
    },
    {
      question: "What expenses qualify for housing allowance?",
      answer: "Qualifying expenses include: mortgage payments or rent, property taxes, homeowners/renters insurance, utilities, home repairs and maintenance, furnishings and appliances, lawn care, home security systems, and other expenses directly related to providing a home."
    },
    {
      question: "How much housing allowance can I receive?",
      answer: "The housing allowance is limited to the lesser of: (1) the amount officially designated by your church, (2) your actual housing expenses, or (3) the fair rental value of your home (including furnishings and utilities)."
    },
    {
      question: "Do I need to track my housing expenses?",
      answer: "Yes! It's crucial to maintain detailed records of all housing-related expenses. You must be able to substantiate your expenses if questioned by the IRS. Keep receipts, invoices, and documentation for all claimed expenses."
    },
    {
      question: "When must the housing allowance be designated?",
      answer: "The housing allowance must be officially designated by your church before the tax year begins or before you start your ministerial duties. Retroactive designations are not allowed."
    },
    {
      question: "Is housing allowance subject to Social Security taxes?",
      answer: "Yes, housing allowance is generally subject to Social Security and Medicare taxes (self-employment tax) for ministers, even though it's excluded from federal income tax."
    },
    {
      question: "Can I claim housing allowance if I live in a church-provided parsonage?",
      answer: "If you live in a church-provided parsonage, you generally cannot claim a housing allowance. However, you may be able to receive an allowance for utilities, furnishings, and other qualifying expenses not provided by the church."
    },
    {
      question: "What records should I keep?",
      answer: "Keep detailed records including: receipts for all housing expenses, bank statements, mortgage statements, utility bills, repair invoices, purchase receipts for furniture and appliances, and your church's official housing allowance designation."
    },
    {
      question: "Can I use this app for tax preparation?",
      answer: "This app helps you track and organize your housing allowance expenses, but it's not a substitute for professional tax advice. Always consult with a qualified tax professional or CPA who understands ministerial tax issues for tax preparation and planning."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Housing Allowance FAQ
        </h1>
        <p className="text-gray-600">
          Common questions about housing allowance benefits for pastors
        </p>
      </div>

      {/* Important Notice */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8"
      >
        <div className="flex items-start gap-3">
          <SafeIcon icon={FiInfo} className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Important Disclaimer</h3>
            <p className="text-blue-800 text-sm">
              This information is for educational purposes only and should not be considered as tax or legal advice. 
              Tax laws can be complex and change frequently. Always consult with a qualified tax professional 
              or CPA who understands ministerial tax issues for personalized guidance.
            </p>
          </div>
        </div>
      </motion.div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 pr-4">
                {item.question}
              </h3>
              <SafeIcon
                icon={openItems.has(index) ? FiChevronUp : FiChevronDown}
                className="w-5 h-5 text-gray-400 flex-shrink-0"
              />
            </button>
            
            <AnimatePresence>
              {openItems.has(index) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Additional Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Resources</h3>
        <div className="space-y-3 text-sm">
          <p className="text-gray-600">
            <strong>IRS Publication 517:</strong> "Social Security and Other Information for Members of the Clergy and Religious Workers"
          </p>
          <p className="text-gray-600">
            <strong>Church Law & Tax:</strong> Provides comprehensive resources for ministerial tax issues
          </p>
          <p className="text-gray-600">
            <strong>Professional Help:</strong> Consider consulting with a CPA who specializes in ministerial taxes
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default FAQ;