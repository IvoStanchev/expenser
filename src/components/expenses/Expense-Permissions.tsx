import './Expense-Permissions.css';
import { useState, useEffect } from 'react';
import { onUpdate, fetchPermissionState } from '../hooks/database';
import { onSuccess, onError, onValidate } from '../hooks/notifications';

interface permissionsProps {
	permissionsWindowHandler(forceState: boolean);
	permissionsWindowState: boolean;
	permissionsStateHandler(allPermissions: any);
}

const ExpensePermissions: React.FC<permissionsProps> = (props) => {
	//Permission states
	const [createState, setCreateState] = useState(false);
	const [readState, setReadState] = useState(false);
	const [updateState, setUpdateState] = useState(false);
	const [deleteState, setDeleteState] = useState(false);

	//Handlers for each permission button.
	const createHandler = (permission: boolean) => {
		setCreateState(permission);
		updatePermissionData('CREATE', permission, createState);
	};
	const readHandler = (permission: boolean) => {
		setReadState(readState);
		updatePermissionData('READ', permission, readState);
	};
	const updateHandler = (permission: boolean) => {
		setUpdateState(permission);
		updatePermissionData('UPDATE', permission, updateState);
	};
	const deleteHandler = (permission: boolean) => {
		setDeleteState(permission);
		updatePermissionData('DELETE', permission, deleteState);
	};

	//Update the database with the desired permission.
	const updatePermissionData = (
		type: string,
		desiredState: boolean,
		currentState: boolean | undefined,
	) => {
		if (desiredState !== currentState) {
			//Check if this permission is already set
			try {
				onUpdate(type, desiredState); //Update the database with the new permission
				desiredState
					? onSuccess('specific_permission', type)
					: onError('specific_permission', undefined, type);
			} catch (err) {
				onError('db_issue', err);
			}
		} else {
			onValidate('specific_permission', type);
		}
	};

	let allPermissions = {
		create: createState,
		read: readState,
		update: updateState,
		delete: deleteState,
	};

	//Fetch all permissions from the database and set them in state.
	useEffect(() => {
		fetchPermissionState(
			setCreateState,
			setReadState,
			setUpdateState,
			setDeleteState,
		);
		props.permissionsStateHandler(allPermissions); //Used to lift the permission state up the parent component and distribute it to other components.
	}, [createState, readState, updateState, deleteState]);

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
