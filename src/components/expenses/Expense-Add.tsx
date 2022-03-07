import './Expense-Add.css';
import React, { useState } from 'react';
import { ExpenseData } from '../interface/interface';
import { Timestamp } from 'firebase/firestore';
import { onPopulate } from '../hooks/database';
import { onValidate } from '../hooks/notifications';

interface ExpenseAddProps {
	windowState: Boolean;
	addExpenseWindowHandler(forceState: boolean);
}
const ExpenseAdd: React.FC<ExpenseAddProps> = (props) => {
	//Set state for the form input
	const [expenseName, setExpenseName] = useState('');
	const [expensePrice, setExpensePrice] = useState('');
	const [expenseCurrency, setExpenseCurrency] = useState('BGN');

	//Handlers for the input form
	const nameInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		let input = event.target.value;
		input.length <= 20 ? setExpenseName(input) : onValidate('long_name');
	};
	const priceInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		let input = event.target.value;
		!isNaN(+input) // Allow input only if the string can be converted to a number.
			? input.toString().length <= 9 //Even 9 digits are overboard for this no-budget app.
				? setExpensePrice(input)
				: onValidate('long_number')
			: onValidate('is_number');
	};
	const currencyInputHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setExpenseCurrency(event.target.value);
	};
	//Don't close the add-item slider until all input fields are filled.
	const windowValidation = () => {
		if (expenseName && expensePrice && expenseCurrency) {
			return props.addExpenseWindowHandler(false);
		}
	};
	//Handle form submission
	const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		//Prepare all expense data from state into an object
		const expenseData: ExpenseData = {
			name: expenseName,
			price: Math.abs(+expensePrice).toFixed(2), //Remove negative values, fix the number to 2nd decimal.
			currency: expenseCurrency.toUpperCase(),
			created: Timestamp.now(),
		};
		//Add the expenseData to the database

		onPopulate(expenseData, expenseName); // Add to database

		//Form field reset
		setExpenseName('');
		setExpensePrice('');
		setExpenseCurrency('BGN');
	};

	return (
		<div className={props.windowState ? 'slider' : 'slider close'}>
			<div onClick={() => props.addExpenseWindowHandler(false)}>
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
			<h3 id='title-add-expense'>Complete the form to add a new expense.</h3>
			<form onSubmit={submitHandler} className='add-item-form-group'>
				<label htmlFor='form-name'>Name</label>
				<input
					value={expenseName}
					onChange={nameInputHandler}
					placeholder='Enter expense name.'
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
					placeholder='Enter expense price.'
					type='text'
					required
					id='form-price'
					name='form-price'
					className='add-item-form-control'
				/>
				<label htmlFor='form-currency'>Currency</label>
				<select
					value={expenseCurrency}
					onChange={currencyInputHandler}
					required
					name='form-currency'
					id='form-currency'
					className='add-item-form-control'>
					<option value='BGN'>BGN</option>
					<option value='USD'>USD</option>
					<option value='EUR'>EUR</option>
				</select>
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
