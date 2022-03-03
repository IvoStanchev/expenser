import { ExpenseData } from '../interface/interface';
import './Expense-Update.css';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../storage/firebase';
import React, { useEffect, useState } from 'react';

interface ExpenseUpdateProps {
	updateWindowState: Boolean;
	updateExpenseWindowHandler(forceState: Boolean | any, expenses?: any): any;
	getExpenses: any;
}

const ExpenseUpdate: React.FC<ExpenseUpdateProps> = (props) => {
	//Set state for the form input
	const [expenseName, setExpenseName]: any = useState('');
	const [expensePrice, setExpensePrice]: any = useState('');
	const [expenseCurrency, setExpenseCurrency]: any = useState('');

	//Expense data is fetched when the gear icon is pressed in the ExpenseItem component, however, before that we will receive an empty object.
	//useEffect will force set the initial input values when the getExpensees props populate with data.
	useEffect(() => {
		setExpenseName(props.getExpenses.name);
		setExpensePrice(props.getExpenses.price);
		setExpenseCurrency(props.getExpenses.currency);
	}, [props.getExpenses]);

	//Handlers for the form input
	const nameInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setExpenseName(event.target.value);
	};
	const priceInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setExpensePrice(event.target.value);
	};
	const currencyInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setExpenseCurrency(event.target.value);
	};

	//
	const handleUpdate = async (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		const taskDocRef = doc(db, 'expenses', props.getExpenses.id);
		try {
			await updateDoc(taskDocRef, {
				name: expenseName,
				price: expensePrice,
				currency: expenseCurrency,
			});
		} catch (err) {
			alert(err);
		}
	};
	return (
		<div
			className={
				props.updateWindowState ? 'update-slider' : 'update-slider update-close'
			}>
			<div
				onClick={() => {
					props.updateExpenseWindowHandler(false);
				}}>
				<svg
					width='35'
					height='60'
					viewBox='12 8 40 40'
					className='svg-cross'
					fill='none'
					id='close-item'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M22.9245 38.8389L42.0753 21.1612'
						stroke='black'
						strokeWidth='1.58434'
						strokeLinecap='round'
					/>
					<path
						d='M22.9245 21.1612L42.0753 38.8389'
						stroke='black'
						strokeWidth='1.58434'
						strokeLinecap='round'
					/>
				</svg>
			</div>
			<h3 id='title-update-expense'>Edit expense</h3>
			<form onSubmit={handleUpdate} className='update-item-form-group'>
				<label htmlFor='form-name'>Name</label>
				<input
					onChange={nameInputHandler}
					value={expenseName}
					placeholder='Please enter expense name.'
					type='text'
					required
					id='form-name'
					name='form-name'
					className='update-item-form-control'
				/>
				<label htmlFor='form-price'>Price</label>
				<input
					onChange={priceInputHandler}
					value={expensePrice}
					placeholder='Please enter expense price.'
					type='number'
					required
					id='form-price'
					name='form-price'
					className='update-item-form-control'
				/>
				<label htmlFor='form-currency'>Currency</label>
				<input
					onChange={currencyInputHandler}
					value={expenseCurrency}
					placeholder='Please enter your currency.'
					type='text'
					required
					id='form-currency'
					name='form-currency'
					className='update-item-form-control'
				/>
				<button
					onClick={() => {
						props.updateExpenseWindowHandler(false);
					}}
					type='submit'
					id='update-expense-button-form'>
					Update Expense
				</button>
			</form>
		</div>
	);
};

export default ExpenseUpdate;
