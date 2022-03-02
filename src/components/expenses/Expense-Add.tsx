import './Expense-Add.css';
import React, { useState } from 'react';
import { ExpenseData } from '../interface/interface';
import { db } from '../../storage/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

interface ExpenseAddProps {
	windowState: Boolean;
	addExpenseWindowHandler(forceState: Boolean | any): any;
}

const ExpenseAdd: React.FC<ExpenseAddProps> = (props) => {
	//Set state for the form input
	const [expenseName, setExpenseName] = React.useState('');
	const [expensePrice, setExpensePrice] = React.useState('');
	const [expenseCurrency, setExpenseCurrency] = React.useState('');

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

	//Don't close the slider until all fields are filled.
	const windowValidation = () => {
		if (expenseName && expensePrice && expenseCurrency) {
			return props.addExpenseWindowHandler(false);
		}
	};

	//Handle form submission
	const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		//Gather expenses
		const expenseData: ExpenseData = {
			name: expenseName,
			price: expensePrice,
			currency: expenseCurrency,
		};
		try {
			await addDoc(collection(db, 'expenses'), expenseData);
			console.log('Expense has been added to the database');
		} catch (err) {
			alert(err);
		}

		//?Form reset
		setExpenseName('');
		setExpensePrice('');
		setExpenseCurrency('');
	};

	return (
		<div className={props.windowState ? 'slider' : 'slider close'}>
			<div id='close-item' onClick={() => props.addExpenseWindowHandler(false)}>
				<svg
					width='35'
					height='60'
					viewBox='12 8 40 40'
					className='svg-cross'
					fill='none'
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
			<h3 id='title-add-expense'>Complete the form to add a new expense.</h3>
			<form onSubmit={submitHandler} className='add-item-form-group'>
				<label htmlFor='form-name'>Name</label>
				<input
					value={expenseName}
					onChange={nameInputHandler}
					placeholder='Please enter expense name.'
					type='text'
					required
					id='form-name'
					name='form-name'
					className='add-item-form-control'
				/>
				<label htmlFor='form-price'>Price</label>
				<input
					value={String(expensePrice)}
					onChange={priceInputHandler}
					placeholder='Please enter expense price.'
					type='number'
					required
					id='form-price'
					name='form-price'
					className='add-item-form-control'
				/>
				<label htmlFor='form-currency'>Currency</label>
				<input
					value={expenseCurrency}
					onChange={currencyInputHandler}
					placeholder='Please enter your currency.'
					type='text'
					required
					id='form-currency'
					name='form-currency'
					className='add-item-form-control'
				/>
				<button
					type='submit'
					onClick={windowValidation}
					id='add-expense-button-form'>
					Add Expense
				</button>
			</form>
		</div>
	);
};

export default ExpenseAdd;
