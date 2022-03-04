import { useState } from 'react';
import './App.css';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
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
	const [permissionsWindowState, setPermissionsWindowState] = useState(false);
	const [appPermissionsState, setAllPermissionsState] = useState();
	const [getExpenses, setGetExpenses] = useState({});

	const permissionsWindowHandler = (forceState: boolean) => {
		//Force the state when we press a button to close the slider
		if (forceState) {
			setPermissionsWindowState(false);
		}
		//Change the state to the opposite of the current state`
		setPermissionsWindowState(!permissionsWindowState);
	};
	const permissionsStateHandler = (allPermissions: any) => {
		setAllPermissionsState(allPermissions);
	};
	//Open add-expense window slider
	const addExpenseWindowHandler = (forceState: boolean | undefined) => {
		//Force the state when we press a button to close the slider
		if (forceState) {
			setWindowState(false);
		}
		//Change the state to the opposite of the current state
		setWindowState(!windowState);
	};
	//Open update-expense window slider, also fetch the current expense from the Expense-item component. In any case, the update handler will have to be drilled to the item component to change the status of the slider, so it is easier to take the state of the pressed expense with the same handler.
	const updateExpenseWindowHandler = (forceState: boolean, expenses?: any) => {
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
			<Sidebar permissionsWindowHandler={permissionsWindowHandler} />
			{/*	- Used to switch the update-expense state boolean and lift up the state from the item component
				- Used to switch the add-expense state boolean */}
			<ExpenseList
				appPermissionsState={appPermissionsState}
				updateExpenseWindowHandler={updateExpenseWindowHandler}
				addExpenseWindowHandler={addExpenseWindowHandler}
			/>
			{/*- Pass the windows state for the add expense component so we can show the slider conditionally
			   - Pass the add expense handler to be used for closing the slider by pressing the "X" button */}
			<ExpenseAdd
				appPermissionsState={appPermissionsState}
				windowState={windowState}
				addExpenseWindowHandler={addExpenseWindowHandler}></ExpenseAdd>

			{/* - Pass the current expense to the update component 
				- Pass the state of the window slider
				- Pass the update expense handler to be used for closing the slider by pressing the "X" button*/}
			<ExpenseUpdate
				appPermissionsState={appPermissionsState}
				getExpenses={getExpenses}
				updateWindowState={updateWindowState}
				updateExpenseWindowHandler={updateExpenseWindowHandler}></ExpenseUpdate>
			<ExpensePermissions
				permissionsStateHandler={permissionsStateHandler}
				permissionsWindowState={permissionsWindowState}
				permissionsWindowHandler={permissionsWindowHandler}></ExpensePermissions>
			<NotificationContainer />
		</div>
	);
}

export default App;
