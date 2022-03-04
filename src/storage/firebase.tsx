import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCLXlwExuIFrBAffFQfMGEXyuM21fdoOug',
	authDomain: 'expenser-50bc1.firebaseapp.com',
	projectId: 'expenser-50bc1',
	storageBucket: 'expenser-50bc1.appspot.com',
	messagingSenderId: '884318283082',
	appId: '1:884318283082:web:63fc4dad6aaca3f4708db3',
	measurementId: 'G-ER29BRFNZX',
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

export { db };
