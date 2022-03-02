import './Expense-Search.css';

const ExpenseSearch = () => {
	return (
		<div className='form-container'>
			<form className='form-group' action=''>
				<input
					placeholder='Search your expense here...'
					id='form-input'
					type='text'
				/>
				<button id='form-button'>Search</button>
			</form>
		</div>
	);
};

export default ExpenseSearch;
