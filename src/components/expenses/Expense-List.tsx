import React from 'react';
import ExpenseItem from './Expense-Item';
import './Expense-List.css';
import ExpenseSearch from './Expense-Search';

interface expenseProps {
	expenses: {
		id: string;
		name: string;
		price: number;
		currency: string;
	}[];
	addExpenseWindowHandler(forceState: Boolean | any): any;
}

const ExpenseList: React.FC<expenseProps> = (props) => {
	return (
		<div className='product-list-container'>
			<ExpenseSearch></ExpenseSearch>
			<button onClick={props.addExpenseWindowHandler} id='add-expense-button'>
				Add Expense
			</button>
			{props.expenses.map((expense) => {
				return (
					<ExpenseItem
						key={expense.id}
						name={expense.name}
						currency={expense.currency}
						price={expense.price}
						id={expense.id}></ExpenseItem>
				);
			})}
		</div>
	);
};
export default ExpenseList;
