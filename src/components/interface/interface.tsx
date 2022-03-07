export interface ExpenseData {
	id: string;
	name: string;
	price: string;
	currency: string;
	created: { seconds: number; nanoseconds: number };
}
