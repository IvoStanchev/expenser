import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar/sidebar';
import ExpenseList from './components/expenses/Expense-List';
import ExpenseAdd from './components/expenses/Expense-Add';
import ExpenseUpdate from './components/expenses/Expense-Update';

function App() {
	const [windowState, setWindowState] = useState(false);
	const [updateWindowState, setUpdateWindowState] = useState(false);
	const [getExpenses, setGetExpenses] = useState({});

	//Open add expense window slider
	const addExpenseWindowHandler = (forceState: Boolean | undefined) => {
		if (forceState) {
			setWindowState(false);
		}
		setWindowState(!windowState);
	};

	//Open update expense window
	const updateExpenseWindowHandler = (
		forceState: Boolean | any,
		expenses?: any,
	) => {
		if (forceState) {
			setUpdateWindowState(false);
		}
		if (expenses) {
			setGetExpenses(expenses);
		}
		setUpdateWindowState(!updateWindowState);
	};

	return (
		<div className='app-container'>
			<Sidebar />
			<ExpenseList
				updateExpenseWindowHandler={updateExpenseWindowHandler}
				addExpenseWindowHandler={addExpenseWindowHandler}
			/>
			<ExpenseAdd
				windowState={windowState}
				addExpenseWindowHandler={addExpenseWindowHandler}></ExpenseAdd>
			<ExpenseUpdate
				getExpenses={getExpenses}
				updateWindowState={updateWindowState}
				updateExpenseWindowHandler={updateExpenseWindowHandler}></ExpenseUpdate>
		</div>
	);
}

export default App;
