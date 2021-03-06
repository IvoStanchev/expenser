import './Expense-List.css';
//Nested components
import ExpenseItem from './Expense-Item';
import ExpenseSearch from './Expense-Search';
import ExpenseTotal from './Expense-Total';
//Hooks
import { useState, useEffect } from 'react';
import { onRetrieve } from '../hooks/database';
import { onError } from '../hooks/notifications';

interface expenseProps {
	addExpenseWindowHandler: any;
	updateExpenseWindowHandler: (forceState: boolean, expenses?: any) => any;
	appPermissionsState: any;
}

const ExpenseList: React.FC<expenseProps> = (props) => {
	//State for all expenses, only god knows the types that we are receiving here?!
	const [expenses, setExpenses] = useState([] as any);
	const [searchTerm, setSearchTerm] = useState('');
	const [message, setMessage] = useState('New expenses will appear here.');
	const [sortState, setSortState] = useState([] as any);

	useEffect(() => {
		setMessage('New expenses will appear here.');
		onRetrieve(setExpenses);

		if (props.appPermissionsState.read) {
			setMessage('You have no permission to list expenses.');
		}
	}, [props.appPermissionsState]);

	//Sets a state for the sort and sort direction. !! This needs work.
	let sortHandler = (sortBy: string, sortDirection: string) => {
		setSortState([sortBy, sortDirection]);
	};

	//The search handler fetches the input from the SearchComponent and sets a state which is then used to filter the original expense list in JSX
	const searchStateHandler = (searchString: React.SetStateAction<string>) => {
		setSearchTerm(searchString);
	};

	return (
		<div className='product-list-container'>
			<ExpenseSearch searchStateHandler={searchStateHandler}></ExpenseSearch>
			<ExpenseTotal
				sortHandler={sortHandler}
				expenses={expenses}
				appPermissionsState={props.appPermissionsState}></ExpenseTotal>
			<button
				onClick={() => {
					props.appPermissionsState?.create
						? props.addExpenseWindowHandler()
						: onError('denied');
				}}
				id='add-expense-button'>
				Add Expense
			</button>
			{expenses.length === 0 ? (
				<p id='availability-message'>{message}</p>
			) : (
				props.appPermissionsState.read &&
				expenses
					.filter((expense: { data: { name: string } }) =>
						expense.data.name.toLowerCase().includes(searchTerm.toLowerCase()),
					)
					.sort(
						(
							a: { data: { created: { seconds: number }; price: number } },
							b: { data: { created: { seconds: number }; price: number } },
						) => {
							if (sortState[0] === 'date') {
								if (sortState[1] === 'asc') {
									return a.data.created.seconds - b.data.created.seconds;
								} else if (sortState[1] === 'desc') {
									return b.data.created.seconds - a.data.created.seconds;
								}
							} else {
								if (sortState[1] === 'desc') {
									return b.data.price - a.data.price;
								} else if (sortState[1] === 'asc') {
									return a.data.price - b.data.price;
								}
							}
						},
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
								created={expense.data.created}
								id={expense.id}></ExpenseItem>
						);
					})
			)}
		</div>
	);
};
export default ExpenseList;
