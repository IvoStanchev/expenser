import { db } from '../../storage/firebase';
import {
	collection,
	addDoc,
	doc,
	deleteDoc,
	query,
	onSnapshot,
	orderBy,
	updateDoc,
} from 'firebase/firestore';
import { onSuccess, onError } from './notifications';
import { ExpenseData } from '../interface/interface';

//Add expense to the database
export const onPopulate = (expenseData: ExpenseData, expenseName: string) => {
	try {
		addDoc(collection(db, 'expenses'), expenseData);
		onSuccess('add', expenseName);
	} catch (err) {
		onError('db_issue', err);
	}
};

//Delete expense from the database
export const onDelete = (id: string, property: string) => {
	const documentReference = doc(db, 'expenses', id);
	try {
		//Delete the reference
		deleteDoc(documentReference);
		onSuccess('delete', property);
	} catch (err) {
		onError('db_issue', err);
	}
};

//Fetch all expenses from the database
export const onRetrieve = (setExpenses: any) => {
	const q = query(collection(db, 'expenses'), orderBy('created', 'desc'));
	//Get a dynamic snapshot of the current database

	onSnapshot(q, (querySnapshot) => {
		//Set all expenses in state
		setExpenses(
			querySnapshot.docs.map((doc) => ({
				id: doc.id,
				data: doc.data(),
			})),
		);
	});
};

//Edit expense in the database
export const onEdit = (
	expenseName: string,
	expensePrice: string,
	expenseCurrency: string,
	id: string,
) => {
	const taskDocRef = doc(db, 'expenses', id);
	try {
		updateDoc(taskDocRef, {
			//Pass the reference with the updates from the form.
			name: expenseName,
			price: expensePrice,
			currency: expenseCurrency,
		});
		onSuccess('update', expenseName);
	} catch (err) {
		onError('db_issue');
	}
};

//Update permission in the database
export const onUpdate = (type: string, desiredState?: boolean) => {
	const taskDocRef = doc(db, 'CRUD', 'FQWwb7ntGMfccmwU78S8');

	updateDoc(taskDocRef, {
		//Pass the reference with the updates from the buttons.
		[type]: desiredState,
	});
};

//Fetch permissions from the database
export const fetchPermissionState = (
	setCreateState,
	setReadState,
	setUpdateState,
	setDeleteState,
) => {
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
};

//Manage budget in the database
export const manageBudget = (
	budget: string,
	action: string,
	setBudget?: any,
) => {
	const taskDocRef = doc(db, 'budget', 'qkwchA3krxNADr8dRGBP');
	const q = query(collection(db, 'budget'));

	if (action === 'reset') {
		try {
			updateDoc(taskDocRef, {
				//reset the budget
				//Pass the reference with the updates from the form.
				budget: budget,
			});
			onSuccess('reset');
		} catch (err) {
			onError('db_issue');
		}
	} else if (action === 'add') {
		try {
			updateDoc(taskDocRef, {
				//Update the budget
				//Pass the reference with the updates from the form.
				budget: budget,
			});
			if (+budget !== 0) {
				onSuccess('add', budget);
			}
		} catch (err) {
			onError('db_issue', err);
		}
	} else if (action === 'fetch') {
		onSnapshot(q, (querySnapshot) => {
			//fetch the budget
			//Set all expenses in state
			setBudget(querySnapshot.docs.map((doc) => doc.data().budget).toString());
		});
	}
};
