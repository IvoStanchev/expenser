export interface ExpenseData {
	name: string;
	price: number;
	currency: string;
	created: { seconds: number; nanoseconds: number };
}
export interface ExpenseProps {
	id: string;
	name: string;
	price: number;
	currency: string;
}
