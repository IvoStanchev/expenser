import React from 'react';
import ExpenseItem from './Expense-Item';
import './Expense-List.css';
import ExpenseSearch from './Expense-Search';
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../storage/firebase';
import { NotificationManager } from 'react-notifications';

interface expenseProps {
	addExpenseWindowHandler;
	updateExpenseWindowHandler: (forceState: boolean, expenses?: any) => any;
	appPermissionsState: { read: any } | undefined;
}

const ExpenseList: React.FC<expenseProps> = (props) => {
	//State for all expenses, only god knows the types that we are receiving here?!
	const [expenses, setExpenses] = useState([] as any);
	const [searchTerm, setSearchTerm] = useState('');

	const searchStateHandler = (searchString) => {
		setSearchTerm(searchString);
	};

	//Fetch all expenses from the database and set them in state
	useEffect(() => {
		//Define the query to be used in firestore and retrieve as descending.
		const q = query(collection(db, 'expenses'), orderBy('created', 'desc'));
		function waitForElement() {
			if (props.appPermissionsState !== undefined) {
				if (props.appPermissionsState.read) {
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
					NotificationManager.error(
						'You have no permissions to list expenses.',
						'Denied',
					);
				}
			} else {
				setTimeout(waitForElement);
			}
		}
		if (searchTerm === '') {
			waitForElement();
		} else {
			setExpenses(
				expenses.filter((expense) =>
					expense.data.name.toLowerCase().includes(searchTerm.toLowerCase()),
				),
			);
		}
	}, [props.appPermissionsState, searchTerm]);

	return (
		<div className='product-list-container'>
			<ExpenseSearch searchStateHandler={searchStateHandler}></ExpenseSearch>
			<button onClick={props.addExpenseWindowHandler} id='add-expense-button'>
				Add Expense
			</button>
			{expenses.map((expense: any) => {
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
			})}
		</div>
	);
};
export default ExpenseList;
