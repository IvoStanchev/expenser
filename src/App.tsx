import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar/sidebar';
import ExpenseList from './components/expenses/Expense-List';
import ExpenseAdd from './components/expenses/Expense-Add';
import { ExpenseData } from './components/interface/interface';
import { useCallback } from 'react';
import { useEffect } from 'react';

function App() {
	const [windowState, setWindowState] = useState(false);

	//Add expense logic
	const addExpenseWindowHandler = (forceState: Boolean | any) => {
		if (forceState) {
			setWindowState(false);
		}
		setWindowState(!windowState);
	};

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
