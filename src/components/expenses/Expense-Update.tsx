import './Expense-Update.css';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../storage/firebase';
import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';

interface ExpenseUpdateProps {
	updateWindowState: boolean;
	updateExpenseWindowHandler(forceState: boolean | any, expenses?: any): any;
	getExpenses: any;
	appPermissionsState;
}

const ExpenseUpdate: React.FC<ExpenseUpdateProps> = (props) => {
	//Set state for the form input
	const [expenseName, setExpenseName] = useState('');
	const [expensePrice, setExpensePrice] = useState('');
	const [expenseCurrency, setExpenseCurrency] = useState('');

	//Expense data is fetched when the gear icon on the respective expense is clicked in the ExpenseItem component, however, before that we will receive an empty object here.
	//useEffect will force-set the initial input values when the getExpensees props populate with data or set them as an empty string until the data is received.
	useEffect(() => {
		setExpenseName(props.getExpenses.name || '');
		setExpensePrice(props.getExpenses.price || '');
		setExpenseCurrency(props.getExpenses.currency || '');
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

	//Form handler
	const handleUpdate = async (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		//Define the reference to the item we want to update in the database
		const taskDocRef = doc(db, 'expenses', props.getExpenses.id);
		if (props.appPermissionsState.update) {
			try {
				await updateDoc(taskDocRef, {
					//Pass the reference with the updates from the form.
					name: expenseName,
					price: expensePrice,
					currency: expenseCurrency,
				});
				NotificationManager.success('Has been updated!', `${expenseName}`);
			} catch (err) {
				NotificationManager.error('Could not update', 'Click me!', 5000, () => {
					alert(err);
				});
			}
		} else {
			NotificationManager.error(
				'You have no permissions to edit expenses.',
				'Denied',
			);
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
				<label htmlFor='form-update-name'>Name</label>
				<input
					onChange={nameInputHandler}
					value={expenseName}
					placeholder='Please enter expense name.'
					type='text'
					required
					id='form-update-name'
					name='form-update-name'
					className='update-item-form-control'
				/>
				<label htmlFor='form-update-price'>Price</label>
				<input
					onChange={priceInputHandler}
					value={expensePrice}
					placeholder='Please enter expense price.'
					type='number'
					required
					id='form-update-price'
					name='form-update-price'
					className='update-item-form-control'
				/>
				<label htmlFor='form-update-currency'>Currency</label>
				<input
					onChange={currencyInputHandler}
					value={expenseCurrency}
					placeholder='Please enter your currency.'
					type='text'
					required
					id='form-update-currency'
					name='form-update-currency'
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
