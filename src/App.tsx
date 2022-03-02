import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar/sidebar';
import ExpenseList from './components/expenses/Expense-List';
import ExpenseAdd from './components/expenses/Expense-Add';
import { ExpenseData } from './components/interface/interface';
import { useCallback } from 'react';
import { useEffect } from 'react';

//dummy data
export const DUMMY_EXPENSES = [
	{
		id: 'e1',
		name: 'Toilet Paper',
		price: 94.12,
		currency: 'USD',
	},
	{ id: 'e2', name: 'New TV', price: 799.49, currency: 'USD' },
	{
		id: 'e3',
		name: 'Car Insurance',
		price: 294.67,
		currency: 'USD',
	},
	{
		id: 'e4',
		name: 'New Desk (Wooden)',
		price: 450,
		currency: 'USD',
	},
];

function App() {
	//Set the state with the dummy data
	// const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
	const [windowState, setWindowState] = useState(false);

	//Add expense logic
	const addExpenseWindowHandler = (forceState: Boolean | any) => {
		if (forceState) {
			setWindowState(false);
		}
		setWindowState(!windowState);
	};

	// const addExpenseHandler = (expense: ExpenseData) => {
	// 	setExpenses((prevExpenses: any) => {
	// 		return [expense, ...prevExpenses];
	// 	});
	// };

	return (
		<div className='app-container'>
			<Sidebar />
			<ExpenseList addExpenseWindowHandler={addExpenseWindowHandler} />
			<ExpenseAdd
				windowState={windowState}
				addExpenseWindowHandler={addExpenseWindowHandler}></ExpenseAdd>
		</div>
	);
}

export default App;
