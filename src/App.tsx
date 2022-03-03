import React, { useState } from 'react';
import './App.css';
//Components
import Sidebar from './components/sidebar/sidebar';
import ExpenseList from './components/expenses/Expense-List';
import ExpenseAdd from './components/expenses/Expense-Add';
import ExpenseUpdate from './components/expenses/Expense-Update';

function App() {
	//State related to the two slider windows and lifted state from the item component
	const [windowState, setWindowState] = useState(false);
	const [updateWindowState, setUpdateWindowState] = useState(false);
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

	return (
		<div className='app-container'>
			<Sidebar />
			<ExpenseList
				updateExpenseWindowHandler={updateExpenseWindowHandler} //Used to switch the update-expense state boolean and lift up the state from the item component
				addExpenseWindowHandler={addExpenseWindowHandler} //Used to switch the add-expense state boolean
			/>
			<ExpenseAdd
				windowState={windowState} //Pass the windows state for the add expense component so we can show the slider conditionally
				addExpenseWindowHandler={addExpenseWindowHandler}></ExpenseAdd>
			//Pass the add expense handler to be used for closing the slider by pressing
			the "X" button
			<ExpenseUpdate
				getExpenses={getExpenses} //Pass the current expense to the update component
				updateWindowState={updateWindowState} //Pass the state of the window slider
				updateExpenseWindowHandler={updateExpenseWindowHandler}></ExpenseUpdate>
			//Pass the update expense handler to be used for closing the slider by
			pressing the "X" button
		</div>
	);
}

export default App;
