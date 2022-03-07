import './Expense-Search.css';
import { useState, useEffect } from 'react';

interface search {
	searchStateHandler: any;
}

const ExpenseSearch: React.FC<search> = (props) => {
	//Search term state
	const [searchTerm, setSearchTerm] = useState('');

	//Fetch the search term from the input box
	const searchHandler = (event) => {
		setSearchTerm(event.target.value);
	};
	//Lift the state to the parent.
	useEffect(() => {
		props.searchStateHandler(searchTerm);
	}, [searchTerm]);

	return (
		<div>
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
		</div>
	);
};

export default ExpenseSearch;
