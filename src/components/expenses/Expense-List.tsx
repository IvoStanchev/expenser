import React, { FC } from 'react';
import ExpenseItem from './Expense-Item';
import './Expense-List.css';
import ExpenseSearch from './Expense-search';

interface expenseProps {
	expenses: {
		id: string;
		name: string;
		price: number;
		currency: string;
	}[];
}

const ExpenseList: React.FC<expenseProps> = (props) => {
	return (
		<div className='product-list-container'>
			<ExpenseSearch></ExpenseSearch>
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
