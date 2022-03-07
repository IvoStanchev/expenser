import './Expense-Item.css';
import { ExpenseProps } from '../interface/interface';
import { onDelete } from '../hooks/database';
import { onError } from '../hooks/notifications';
import { Timestamp } from 'firebase/firestore';

interface ExpenseItemProps extends ExpenseProps {
	updateExpenseWindowHandler(forceState: boolean, expenses?: any);
	appPermissionsState: any;
	created: any;
}

const ExpenseItem: React.FC<ExpenseItemProps> = (props) => {
	//Delete an item from the database.
	const handleDelete = () => {
		if (props.appPermissionsState.delete) {
			onDelete(props.id, props.name);
		} else {
			onError('denied');
		}
	};

	return (
		<div className='product-container'>
			<div id='product-name' className='product-item'>
				<p>{props.name}</p>
			</div>
			<div id='product-price' className='product-item'>
				<p>{props.price + ' ' + props.currency}</p>
			</div>
			<div
				onClick={() => {
					if (props.appPermissionsState.update) {
						props.updateExpenseWindowHandler(true, props);
					} else {
						onError('denied');
					}
				}}
				id='product-gear-icon'
				className='product-item'>
				<svg
					width='40'
					className='svg-gear '
					id='svg-gear-product'
					height='40'
					viewBox='0 0 60 60'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M30 4.5859L23.696 11.1084C23.0251 11.8026 22.101 12.1946 21.1355 12.1946H12.1946V21.1355C12.1946 22.101 11.8026 23.0251 11.1084 23.696L4.5859 30L11.1084 36.304C11.8026 36.9749 12.1946 37.899 12.1946 38.8645V47.8054H21.1355C22.101 47.8054 23.0251 48.1974 23.696 48.8916L30 55.4141L36.3039 48.8916C36.9749 48.1974 37.899 47.8054 38.8645 47.8054H47.8054V38.8645C47.8054 37.899 48.1974 36.9749 48.8916 36.3039L55.4141 30L48.8916 23.6961C48.1974 23.0251 47.8054 22.101 47.8054 21.1355V12.1946H38.8645C37.899 12.1946 36.9749 11.8026 36.3039 11.1084L30 4.5859ZM27.4394 1.08627C28.8392 -0.362092 31.1607 -0.362089 32.5606 1.08627L39.1667 7.92135H48.5176C50.4843 7.92135 52.0787 9.5157 52.0787 11.4824V20.8333L58.9137 27.4394C60.3621 28.8393 60.3621 31.1607 58.9137 32.5606L52.0787 39.1667V48.5176C52.0787 50.4843 50.4843 52.0787 48.5176 52.0787H39.1667L32.5606 58.9137C31.1607 60.3621 28.8392 60.3621 27.4394 58.9137L20.8333 52.0787H11.4824C9.51569 52.0787 7.92135 50.4843 7.92135 48.5176V39.1667L1.08627 32.5606C-0.362089 31.1607 -0.362091 28.8393 1.08627 27.4394L7.92135 20.8333V11.4824C7.92135 9.51569 9.5157 7.92135 11.4824 7.92135H20.8333L27.4394 1.08627Z'
						fill='black'
					/>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M16.4679 30C16.4679 22.5264 22.5264 16.4679 30 16.4679C37.4736 16.4679 43.5321 22.5264 43.5321 30C43.5321 37.4736 37.4736 43.5321 30 43.5321C22.5264 43.5321 16.4679 37.4736 16.4679 30ZM30 20.7412C24.8865 20.7412 20.7412 24.8865 20.7412 30C20.7412 35.1135 24.8865 39.2588 30 39.2588C35.1135 39.2588 39.2588 35.1135 39.2588 30C39.2588 24.8865 35.1135 20.7412 30 20.7412Z'
						fill='black'
					/>
				</svg>
			</div>
			<div onClick={handleDelete} id='product-cross-icon' className='product-item'>
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
		</div>
	);
};

export default ExpenseItem;
