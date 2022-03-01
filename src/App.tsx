import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar/sidebar';
import ExpenseItem from './components/expenses/Expense-Item';

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
	const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
	console.log(expenses);
	return (
		<div className='app-container'>
			<Sidebar />
		</div>
	);
}

export default App;
