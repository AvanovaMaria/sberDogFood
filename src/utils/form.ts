export const formHandler = (formValues: object, ms: number) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const rndNumber = Math.random();
			if (rndNumber > 0.5) {
				resolve(formValues);
			} else {
				reject();
			}
		}, ms);
	});
};