import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar/sidebar';
import ExpenseList from './components/expenses/Expense-List';
import ExpenseSearch from './components/expenses/Expense-Search';

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
	{
		id: 'e5',
		name: 'New Desk (Wooden)',
		price: 450,
		currency: 'USD',
	},
	{
		id: 'e6',
		name: 'New Desk (Wooden)',
		price: 450,
		currency: 'USD',
	},
	{
		id: 'e7',
		name: 'New Desk (Wooden)',
		price: 450,
		currency: 'USD',
	},
	{
		id: 'e8',
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
			<ExpenseList expenses={expenses} />
		</div>
	);
}

export default App;
