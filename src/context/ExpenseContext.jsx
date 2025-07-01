import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ExpenseContext = createContext();

const initialState = {
  annualAllowance: 0,
  expenses: [],
  categories: [
    'Mortgage/Rent',
    'Property Tax',
    'Utilities',
    'Home Insurance',
    'Maintenance & Repairs',
    'Furnishings',
    'Appliances',
    'Lawn Care',
    'Home Security',
    'Other'
  ]
};

function expenseReducer(state, action) {
  switch (action.type) {
    case 'SET_ANNUAL_ALLOWANCE':
      return { ...state, annualAllowance: action.payload };
    
    case 'ADD_EXPENSE':
      return { 
        ...state, 
        expenses: [...state.expenses, { ...action.payload, id: Date.now() }] 
      };
    
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map(expense =>
          expense.id === action.payload.id ? action.payload : expense
        )
      };
    
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.payload)
      };
    
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload]
      };
    
    case 'LOAD_STATE':
      return action.payload;
    
    default:
      return state;
  }
}

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('housingAllowanceData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_STATE', payload: { ...initialState, ...parsedData } });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('housingAllowanceData', JSON.stringify(state));
  }, [state]);

  const setAnnualAllowance = (amount) => {
    dispatch({ type: 'SET_ANNUAL_ALLOWANCE', payload: amount });
  };

  const addExpense = (expense) => {
    dispatch({ type: 'ADD_EXPENSE', payload: expense });
  };

  const updateExpense = (expense) => {
    dispatch({ type: 'UPDATE_EXPENSE', payload: expense });
  };

  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
  };

  const addCategory = (category) => {
    dispatch({ type: 'ADD_CATEGORY', payload: category });
  };

  const getTotalExpenses = () => {
    return state.expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const getRemainingAllowance = () => {
    return state.annualAllowance - getTotalExpenses();
  };

  const value = {
    ...state,
    setAnnualAllowance,
    addExpense,
    updateExpense,
    deleteExpense,
    addCategory,
    getTotalExpenses,
    getRemainingAllowance
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
}