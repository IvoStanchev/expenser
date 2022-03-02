import './Expense-Add.css';

interface ExpenseAddProps {
	windowState: Boolean;
}

const ExpenseAdd: React.FC<ExpenseAddProps> = (props) => {
	return (
		<div className={props.windowState ? 'slider' : 'slider close'}>
			HELLO FROM THIS AMAZING PAGE
		</div>
	);
};

export default ExpenseAdd;
