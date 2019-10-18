export const calcSum = (arr = [], digit = 2) => {
	const base = Math.pow(10, digit);
	const sumTotal = arr.reduce((sum, next) => {
		if (typeof next == "string") {
			next = !isNaN(next) ? Number(next) : 0;
		}

		sum += next * base;
		return Math.round(sum);
	}, 0);
	return parseInt(sumTotal) / base;
};
