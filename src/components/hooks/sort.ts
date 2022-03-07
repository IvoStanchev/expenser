export const sortList = (
	type: string,
	sortDirection: string,
	expenses: any,
) => {
	if (type === 'date') {
		if (sortDirection === 'asc') {
			expenses.sort((a, b) => {
				return a.data.name.localeCompare(b.data.name);
			});
		} else if (sortDirection === 'desc') {
			expenses.sort((a, b) => {
				return b.data.name.localeCompare(a.data.name);
			});
		}
	} else {
		if (sortDirection === 'desc') {
			expenses.sort((a, b) => {
				return b.data.price - a.data.price;
			});
		} else if (sortDirection === 'asc') {
			expenses.sort((a, b) => {
				return a.data.price - b.data.price;
			});
		}
	}
};
