import './Expense-Total.css';
import { useState, useEffect } from 'react';
import { eur, totalExpenses, usd } from '../hooks/calculations';
import { onError, onValidate } from '../hooks/notifications';
import { manageBudget } from '../hooks/database';

const ExpenseTotal = (props: any) => {
	//State related to the three info boxes
	const [budget, setBudget] = useState('');
	const [expenseCurrency, setExpenseCurrency] = useState('BGN');
	const [totalExpensesState, setTotalExpensesState] = useState(0);

	//Fetch the budget from the input form
	const inputBudget = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target.value;
		if (input.length <= 9) {
			setBudget(input);
		} else {
			onValidate('long_number');
		}
	};

	//Converts the funds to the various currencies.
	const currencyChangeHandler = (currency: string) => {
		setExpenseCurrency(currency);
		if (currency === 'USD') {
			setTotalExpensesState(totalExpenses(props.expenses) / usd); //The total amount in lev divided by currency
		} else if (currency === 'EUR') {
			setTotalExpensesState(totalExpenses(props.expenses) / eur); //The total amount in lev divided by currency
		} else {
			setTotalExpensesState(totalExpenses(props.expenses)); //Lev is the base currency
		}
	};

	//Submits the funds form and sets the budget in the database.
	const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		props.appPermissionsState.update //Check if we have update permissions
			? manageBudget(budget, 'add')
			: onError('denied');
		//Form field reset
		setBudget('');
	};

	//Reset the funds in state and database
	const reset = () => {
		if (props.appPermissionsState.update) {
			setBudget('0');
			manageBudget(budget, 'reset');
		}
	};

	useEffect(() => {
		//If the budget is 0 fetch it.
		if (budget === '') {
			manageBudget(budget, 'fetch', setBudget);
		}
		//Set the total to the state.
		setTotalExpensesState(totalExpenses(props.expenses));
	}, [props.expenses]);

	return (
		<div className='total-box-container'>
			<div className='card-container'>
				<h1 className='card-title'>Current balance</h1>
				<h2 className='card-money'>
					{expenseCurrency === 'USD'
						? (Number(budget) / usd - totalExpensesState).toFixed(2)
						: expenseCurrency === 'EUR'
						? (Number(budget) / eur - totalExpensesState).toFixed(2)
						: (Number(budget) - totalExpensesState).toFixed(2)}{' '}
					{expenseCurrency}
				</h2>
				<div id='currency-convert-buttons'>
					<a
						href='/#'
						onClick={() => {
							currencyChangeHandler('BGN');
						}}>
						BGN
					</a>
					<a
						href='/#'
						onClick={() => {
							currencyChangeHandler('EUR');
						}}>
						EUR
					</a>
					<a
						href='/#'
						onClick={() => {
							currencyChangeHandler('USD');
						}}>
						USD
					</a>
				</div>
			</div>
			<div className='card-container'>
				<div className='flip-card-inner'>
					<div className='flip-card-front'>
						<h1 className='card-title'>Monthly budget</h1>
						<h2 className='card-money'>
							{expenseCurrency === 'USD'
								? (Number(budget) / usd).toFixed(2)
								: expenseCurrency === 'EUR'
								? (Number(budget) / eur).toFixed(2)
								: Number(budget).toFixed(2)}{' '}
							{expenseCurrency}
						</h2>
						<a href='/#' id='card-info'>
							hover to add budget
						</a>
					</div>
					<div className='flip-card-back'>
						<form id='form-group' onSubmit={submitHandler}>
							<label id='income-input-label' htmlFor='income-input'>
								Enter your current budget in BGN.
							</label>
							<input
								value={budget}
								onChange={inputBudget}
								id='income-input'
								name='income-input'
								type='number'
							/>
							<div id='button-combo'>
								<button id='add-funds-button'>Add</button>
								<button onClick={reset} id='add-funds-button'>
									Reset
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div className='card-container'>
				<h1 className='card-title'>Total expenses</h1>
				<h2 className='card-money'>
					{totalExpensesState.toFixed(2)} {expenseCurrency}
				</h2>
				<div id='sort'>
					<a
						href='/#'
						onClick={() => {
							props.sortHandler('price', 'asc');
						}}>
						price{' '}
						<span className='arrow'>
							<>&uarr;</>
						</span>
					</a>
					<a
						href='/#'
						onClick={() => {
							props.sortHandler('price', 'desc');
						}}>
						price{' '}
						<span className='arrow'>
							<>&darr;</>
						</span>
					</a>
					<a
						href='/#'
						onClick={() => {
							props.sortHandler('date', 'asc');
						}}>
						date{' '}
						<span className='arrow'>
							<>&uarr;</>
						</span>
					</a>
					<a
						onClick={() => {
							props.sortHandler('date', 'desc');
						}}
						href='/#'>
						date{' '}
						<span className='arrow'>
							<>&darr;</>
						</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default ExpenseTotal;
