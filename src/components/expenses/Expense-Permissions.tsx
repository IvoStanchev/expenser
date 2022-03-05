import './Expense-Permissions.css';
import { useState, useEffect } from 'react';
import {
	collection,
	doc,
	onSnapshot,
	query,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../../storage/firebase';
import { NotificationManager } from 'react-notifications';

interface permissionsProps {
	permissionsWindowHandler(forceState: boolean);
	permissionsWindowState: boolean;
	permissionsStateHandler(allPermissions: any);
}

const ExpensePermissions: React.FC<permissionsProps> = (props) => {
	const [createState, setCreateState] = useState(true);
	const [readState, setReadState] = useState(undefined);
	const [updateState, setUpdateState] = useState(true);
	const [deleteState, setDeleteState] = useState(true);

	let allPermissions = {
		create: createState,
		read: readState,
		update: updateState,
		delete: deleteState,
	};

	const createHandler = (permission: boolean) => {
		updateData('CREATE', permission, createState);
	};
	const readHandler = (permission: boolean) => {
		updateData('READ', permission, readState);
	};
	const updateHandler = (permission: boolean) => {
		updateData('UPDATE', permission, updateState);
	};
	const deleteHandler = (permission: boolean) => {
		updateData('DELETE', permission, deleteState);
	};

	//Fetch all permissions from the database and set them in state
	useEffect(() => {
		function fetchInitState() {
			//Define the query to be used in firestore.
			const q = query(collection(db, 'CRUD'));

			//Get a dynamic snapshot of the current database
			onSnapshot(q, (querySnapshot) => {
				//Set all expenses in state
				querySnapshot.docs.map((doc) => {
					setCreateState(doc.data().CREATE);
					setReadState(doc.data().READ);
					setUpdateState(doc.data().UPDATE);
					setDeleteState(doc.data().DELETE);
				});
			});
			props.permissionsStateHandler(allPermissions);
		}
		fetchInitState();
	}, [createState, readState, updateState, deleteState]);

	const updateData = async (
		type: string,
		desiredState: boolean,
		currentState: boolean | undefined,
	) => {
		const taskDocRef = doc(db, 'CRUD', 'FQWwb7ntGMfccmwU78S8');
		if (desiredState !== currentState) {
			try {
				updateDoc(taskDocRef, {
					//Pass the reference with the updates from the buttons.
					[type]: desiredState,
				});
				desiredState
					? NotificationManager.success(`Allowed`, `${type} permissions`)
					: NotificationManager.error(`Denied`, `${type} permissions`);
			} catch (err) {
				NotificationManager.error('Could not update', 'Click me!', 5000, () => {
					alert(err);
				});
			}
		} else {
			NotificationManager.warning(`Already set`, `${type} permissions`);
		}
	};

	return (
		<div
			className={
				props.permissionsWindowState
					? 'permissions-container'
					: 'permissions-container permissions-closed'
			}>
			<div
				onClick={() => {
					props.permissionsWindowHandler(false);
				}}
				id='close-permissions-item'>
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
			<h3 id='title-permissions-expense'>Modify expense permissions.</h3>
			<div className='single-permission'>
				<div id='permission-name'>
					<p id='name'>CREATE</p>
				</div>
				<button
					onClick={() => {
						createHandler(true);
					}}
					id='permission-allow-button'
					className={createState ? 'btn-on' : 'btn-off'}>
					Allow
				</button>
				<button
					onClick={() => {
						createHandler(false);
					}}
					className={createState ? 'btn-on' : 'btn-off'}
					id='permission-deny-button'>
					Deny
				</button>
			</div>
			<div className='single-permission'>
				<div id='permission-name'>
					<p id='name'>READ</p>
				</div>
				<button
					onClick={() => {
						readHandler(true);
					}}
					id='permission-allow-button'
					className={readState ? 'btn-on' : 'btn-off'}>
					Allow
				</button>
				<button
					onClick={() => {
						readHandler(false);
					}}
					id='permission-deny-button'
					className={readState ? 'btn-on' : 'btn-off'}>
					Deny
				</button>
			</div>
			<div className='single-permission'>
				<div id='permission-name'>
					<p id='name'>UPDATE</p>
				</div>
				<button
					onClick={() => {
						updateHandler(true);
					}}
					id='permission-allow-button'
					className={updateState ? 'btn-on' : 'btn-off'}>
					Allow
				</button>
				<button
					onClick={() => {
						updateHandler(false);
					}}
					id='permission-deny-button'
					className={updateState ? 'btn-on' : 'btn-off'}>
					Deny
				</button>
			</div>
			<div className='single-permission'>
				<div id='permission-name'>
					<p id='name'>DELETE</p>
				</div>
				<button
					onClick={() => {
						deleteHandler(true);
					}}
					id='permission-allow-button'
					className={deleteState ? 'btn-on' : 'btn-off'}>
					Allow
				</button>
				<button
					onClick={() => {
						deleteHandler(false);
					}}
					id='permission-deny-button'
					className={deleteState ? 'btn-on' : 'btn-off'}>
					Deny
				</button>
			</div>
		</div>
	);
};

export default ExpensePermissions;
