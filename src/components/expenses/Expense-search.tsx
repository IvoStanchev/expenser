import './Expense-Search.css';
import { useState, useEffect } from 'react';

interface search {
	searchStateHandler: any;
}

const ExpenseSearch: React.FC<search> = (props) => {
	const [searchTerm, setSearchTerm] = useState('');

	const searchHandler = (event) => {
		setSearchTerm(event.target.value);
	};

	useEffect(() => {
		props.searchStateHandler(searchTerm);
	}, [searchTerm]);

	return (
		<div className='form-container'>
			<form className='form-group' action=''>
				<input
					placeholder='Search your expense here...'
					id='form-input'
					type='text'
					value={searchTerm}
					onChange={searchHandler}
					autoComplete='off'
				/>
			</form>
		</div>
	);
};

export default ExpenseSearch;
