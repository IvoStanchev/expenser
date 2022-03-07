import { NotificationManager } from 'react-notifications';

//Warnings
export const onValidate = (messageType: string, property?: string) => {
	switch (messageType) {
		case 'long_name':
			NotificationManager.warning('Name too large!', 'Warning');
			break;
		case 'long_number':
			NotificationManager.warning('Number too large!', 'Warning');
			break;
		case 'is_number':
			NotificationManager.warning('Please enter a number.', 'Warning');
			break;
		case 'specific_permission':
			NotificationManager.warning(`Already set`, `${property} permissions`);
			break;
		default:
			break;
	}
};
//Success
export const onSuccess = (messageType: string, property?: string | number) => {
	switch (messageType) {
		case 'add':
			NotificationManager.success('Added successfully', `${property}`);
			break;
		case 'delete':
			NotificationManager.success('Deleted successfully', `${property}`);
			break;
		case 'update':
			NotificationManager.success('Has been updated!', `${property}`);
			break;
		case 'specific_permission':
			NotificationManager.success(`Allowed`, `${property} permissions`);
			break;
		case 'reset':
			NotificationManager.success('Has been reset!', `Budget`);
			break;
		default:
			break;
	}
};
//Error
export const onError = (
	messageType: string,
	err?: any,
	property?: string | number,
) => {
	switch (messageType) {
		case 'denied':
			NotificationManager.error('You have no permission', 'Denied!');
			break;
		case 'db_issue':
			NotificationManager.error(
				'Could not perform database query successfully.',
				'Click me!',
				5000,
				(err: string) => {
					alert(err);
				},
			);
			break;
		case 'specific_permission':
			NotificationManager.error(`Denied`, `${property} permissions`);
			break;
		default:
			break;
	}
};
