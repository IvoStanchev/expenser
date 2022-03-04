import './Expense-Permissions.css';

interface deleteProps {
	deleteExpenseWindowHandler(forceState?: Boolean | any): any;
	deleteWindowState: Boolean;
}

const ExpensePermissions: React.FC<deleteProps> = (props) => {
	return (
		<div
			className={
				props.deleteWindowState
					? 'permissions-container'
					: 'permissions-container permissions-closed'
			}>
			<div id='close-permissions-item'>
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
			<div className='single-permission'>
				<div id='permission-name'>
					<p id='name'>CREATE</p>
				</div>
				<button id='permission-allow-button'>Allow</button>
				<button id='permission-deny-button'>Deny</button>
			</div>
			<div className='single-permission'>
				<div id='permission-name'>
					<p id='name'>READ</p>
				</div>
				<button id='permission-allow-button'>Allow</button>
				<button id='permission-deny-button'>Deny</button>
			</div>
			<div className='single-permission'>
				<div id='permission-name'>
					<p id='name'>UPDATE</p>
				</div>
				<button id='permission-allow-button'>Allow</button>
				<button id='permission-deny-button'>Deny</button>
			</div>
			<div className='single-permission'>
				<div id='permission-name'>
					<p id='name'>DELETE</p>
				</div>
				<button id='permission-allow-button'>Allow</button>
				<button id='permission-deny-button'>Deny</button>
			</div>
		</div>
	);
};

export default ExpensePermissions;
