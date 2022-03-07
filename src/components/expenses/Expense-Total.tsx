import './Expense-Total.css';
import { useState, useEffect } from 'react';
import { db } from '../../storage/firebase';
import { NotificationManager } from 'react-notifications';
import {
	collection,
	doc,
	onSnapshot,
	query,
	updateDoc,
} from 'firebase/firestore';

const ExpenseTotal = (props: any) => {
	const [budget, setBudget] = useState('');
	const [expenseCurrency, setExpenseCurrency] = useState('BGN');
	const [totalExpensesState, setTotalExpensesState] = useState(0);

	const q = query(collection(db, 'budget'));
	const taskDocRef = doc(db, 'budget', 'qkwchA3krxNADr8dRGBP');
	const usd = 1.79;
	const eur = 1.96;

	const totalExpenses = props.expenses.reduce(
		(
			sum: number,
			expense: { data: { currency: string; price: string | number } },
			_index: any,
			_allExpenses: any,
		) => {
			if (expense.data.currency === 'USD') {
				sum += +expense.data.price * 1.79;
			} else if (expense.data.currency === 'EUR') {
				sum += +expense.data.price * 1.96;
			} else {
				sum += +expense.data.price;
			}

			return sum;
		},
		0,
	);

	useEffect(() => {
		setTotalExpensesState(totalExpenses);
	}, [props.expenses]);

	const getPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value.length <= 9) {
			setBudget(event.target.value);
		} else {
			NotificationManager.warning('Number too large!', 'Warning');
		}
	};
	const reset = async () => {
		setBudget('0');
		try {
			await updateDoc(taskDocRef, {
				//Pass the reference with the updates from the form.
				budget: budget,
			});
			NotificationManager.success('Has been reset!', `Budget`);
		} catch (err) {
			NotificationManager.error('Could not update', 'Click me!', 5000, () => {
				alert(err);
			});
		}
	};
	const currencyChangeHandler = (currency: string) => {
		setExpenseCurrency(currency);
		if (currency === 'USD') {
			setTotalExpensesState(totalExpenses / usd);
		} else if (currency === 'EUR') {
			setTotalExpensesState(totalExpenses / eur);
		} else {
			setTotalExpensesState(totalExpenses);
		}
	};

	const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		//Define the reference to the item we want to update in the database

		if (props.appPermissionsState.update) {
			try {
				await updateDoc(taskDocRef, {
					//Pass the reference with the updates from the form.
					budget: budget,
				});
				NotificationManager.success('Has been added!', `${budget}`);
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
		//Get a dynamic snapshot of the current database
		onSnapshot(q, (querySnapshot) => {
			//Set all expenses in state
			setBudget(querySnapshot.docs.map((doc) => doc.data().budget).toString());
		});
		//Form field reset
		setBudget('');
	};
	useEffect(() => {
		if (budget === '') {
			onSnapshot(q, (querySnapshot) => {
				//Set all expenses in state
				setBudget(querySnapshot.docs.map((doc) => doc.data().budget).toString());
			});
		}
	}, []);

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
			<div className='flip-card'>
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
								onChange={getPrice}
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
							props.sortHandler('name', 'asc');
						}}>
						name{' '}
						<span className='arrow'>
							<>&uarr;</>
						</span>
					</a>
					<a
						onClick={() => {
							props.sortHandler('name', 'desc');
						}}
						href='/#'>
						name{' '}
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
