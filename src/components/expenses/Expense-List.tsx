import React from 'react';
import ExpenseItem from './Expense-Item';
import './Expense-List.css';
import ExpenseSearch from './Expense-Search';
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../storage/firebase';
import { NotificationManager } from 'react-notifications';
import ExpenseTotal from './Expense-Total';

interface expenseProps {
	addExpenseWindowHandler;
	updateExpenseWindowHandler: (forceState: boolean, expenses?: any) => any;
	appPermissionsState: { read: any } | undefined;
}

const ExpenseList: React.FC<expenseProps> = (props) => {
	//State for all expenses, only god knows the types that we are receiving here?!
	const [expenses, setExpenses] = useState([] as any);
	const [searchTerm, setSearchTerm] = useState('');
	const [message, setMessage] = useState('New expenses will appear here.');

	const searchStateHandler = (searchString: React.SetStateAction<string>) => {
		setSearchTerm(searchString);
	};

	const waitForElement = () => {
		//Define the query to be used in firestore and retrieve as descending.
		const q = query(collection(db, 'expenses'), orderBy('created', 'desc'));
		if (props.appPermissionsState?.read !== undefined) {
			if (props.appPermissionsState.read) {
				setMessage('New expenses will appear here.');
				//Get a dynamic snapshot of the current database
				onSnapshot(q, (querySnapshot) => {
					//Set all expenses in state
					setExpenses(
						querySnapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						})),
					);
				});
			} else {
				setExpenses([]);
				setMessage('You have no permission to list expenses.');
			}
		} else {
			setTimeout(waitForElement);
		}
	};

	//Fetch all expenses from the database and set them in state
	useEffect(() => {
		waitForElement();
	}, [props.appPermissionsState]);

	return (
		<div className='product-list-container'>
			<ExpenseSearch searchStateHandler={searchStateHandler}></ExpenseSearch>
			<ExpenseTotal
				expenses={expenses}
				appPermissionsState={props.appPermissionsState}></ExpenseTotal>
			<button onClick={props.addExpenseWindowHandler} id='add-expense-button'>
				Add Expense
			</button>
			{expenses.length === 0 ? (
				<p id='availability-message'>{message}</p>
			) : (
				expenses
					.filter((expense: { data: { name: string } }) =>
						expense.data.name.toLowerCase().includes(searchTerm.toLowerCase()),
					)
					.map((expense: any) => {
						//Map over all expenses and provide their data.
						return (
							<ExpenseItem
								appPermissionsState={props.appPermissionsState}
								updateExpenseWindowHandler={props.updateExpenseWindowHandler}
								key={expense.id}
								name={expense.data.name}
								currency={expense.data.currency}
								price={expense.data.price}
								id={expense.id}></ExpenseItem>
						);
					})
			)}
		</div>
	);
};
export default ExpenseList;
