import React, { useState } from 'react';
import './App.css';
//Components
import Sidebar from './components/sidebar/sidebar';
import ExpenseList from './components/expenses/Expense-List';
import ExpenseAdd from './components/expenses/Expense-Add';
import ExpenseUpdate from './components/expenses/Expense-Update';
import ExpensePermissions from './components/expenses/Expense-Permissions';

function App() {
	//State related to the three slider windows and lifted state from the item component
	const [windowState, setWindowState] = useState(false);
	const [updateWindowState, setUpdateWindowState] = useState(false);
	const [deleteWindowState, setDeleteWindowState] = useState(false);
	const [getExpenses, setGetExpenses] = useState({});

	//Open add-expense window slider
	const addExpenseWindowHandler = (forceState: Boolean | undefined) => {
		//Force the state when we press a button to close the slider
		if (forceState) {
			setWindowState(false);
		}
		//Change the state to the opposite of the current state
		setWindowState(!windowState);
	};

	//Open update-expense window slider, also fetch the current expense from the Expense-item component. In any case, the update handler will have to be drilled to the item component to change the status of the slider, so it is easier to take the state of the pressed expense with the same handler.
	const updateExpenseWindowHandler = (
		forceState: Boolean | any,
		expenses?: any,
	) => {
		//Force the state when we press a button to close the slider
		if (forceState) {
			setUpdateWindowState(false);
		}
		//If expenses are passed to the function, set the getExpense state.
		if (expenses) {
			setGetExpenses(expenses);
		}
		//Change the state to the opposite of the current state
		setUpdateWindowState(!updateWindowState);
	};

	const deleteExpenseWindowHandler = (forceState?: Boolean) => {
		//Force the state when we press a button to close the slider
		if (forceState) {
			setDeleteWindowState(false);
		}
		//Change the state to the opposite of the current state
		setDeleteWindowState(!deleteWindowState);
	};
	return (
		<div className='app-container'>
			<Sidebar deleteExpenseWindowHandler={deleteExpenseWindowHandler} />
			{/*	- Used to switch the update-expense state boolean and lift up the state from the item component
				- Used to switch the add-expense state boolean */}
			<ExpenseList
				updateExpenseWindowHandler={updateExpenseWindowHandler}
				addExpenseWindowHandler={addExpenseWindowHandler}
			/>
			{/*- Pass the windows state for the add expense component so we can show the slider conditionally
			   - Pass the add expense handler to be used for closing the slider by pressing the "X" button */}
			<ExpenseAdd
				windowState={windowState}
				addExpenseWindowHandler={addExpenseWindowHandler}></ExpenseAdd>

			{/* - Pass the current expense to the update component 
				- Pass the state of the window slider
				- Pass the update expense handler to be used for closing the slider by pressing the "X" button*/}
			<ExpenseUpdate
				getExpenses={getExpenses}
				updateWindowState={updateWindowState}
				updateExpenseWindowHandler={updateExpenseWindowHandler}></ExpenseUpdate>
			<ExpensePermissions
				deleteWindowState={deleteWindowState}
				deleteExpenseWindowHandler={
					deleteExpenseWindowHandler
				}></ExpensePermissions>
		</div>
	);
}

export default App;
