import './Expense-Add.css';

interface ExpenseAddProps {
	windowState: Boolean;
	addExpenseWindowHandler(forceState: Boolean | any): any;
}

const ExpenseAdd: React.FC<ExpenseAddProps> = (props) => {
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
			<form className='add-item-form-group'>
				<label htmlFor='form-name'>Name</label>
				<input
					type='text'
					required
					id='form-name'
					name='form-name'
					className='add-item-form-control'
				/>
				<label htmlFor='form-price'>Price</label>
				<input
					type='number'
					required
					id='form-price'
					name='form-price'
					className='add-item-form-control'
				/>
				<label htmlFor='form-currency'>Currency</label>
				<input
					type='text'
					required
					id='form-currency'
					name='form-currency'
					className='add-item-form-control'
				/>
				<button id='add-expense-button-form'>Add Expense</button>
			</form>
		</div>
	);
};

export default ExpenseAdd;
