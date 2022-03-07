export const usd = 1.79;
export const eur = 1.96;

export const totalExpenses = (expenses) => {
	return expenses.reduce(
		(
			sum: number,
			expense: { data: { currency: string; price: string | number } },
			_index: any,
			_allExpenses: any,
		) => {
			if (expense.data.currency === 'USD') {
				sum += +expense.data.price * usd;
			} else if (expense.data.currency === 'EUR') {
				sum += +expense.data.price * eur;
			} else {
				sum += +expense.data.price;
			}

			return sum;
		},
		0,
	);
};
