import React from 'react';
import ExpenseItem from './Expense-Item';
import './Expense-List.css';
import ExpenseSearch from './Expense-Search';
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../storage/firebase';

interface expenseProps {
	addExpenseWindowHandler(forceState: Boolean | any): any;
	updateExpenseWindowHandler(forceState: Boolean | any, expense?: any): any;
}

const ExpenseList: React.FC<expenseProps> = (props) => {
	//State for all expenses, only god knows the types that we are receiving here?!
	const [expenses, setExpenses] = useState([] as any);

	//Fetch all expenses from the database and set them in state
	useEffect(() => {
		//Define the query to be used in firestore
		const q = query(collection(db, 'expenses'));

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
	}, []);

	return (
		<div className='product-list-container'>
			<ExpenseSearch></ExpenseSearch>
			<button onClick={props.addExpenseWindowHandler} id='add-expense-button'>
				Add Expense
			</button>
			{expenses.map((expense: any) => {
				return (
					<ExpenseItem
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
