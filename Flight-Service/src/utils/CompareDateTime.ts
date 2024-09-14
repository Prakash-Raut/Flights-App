export function compareTime(
	firstTimeString: string,
	secondTimeString: string
): boolean {
	const dateTimeOne = new Date(firstTimeString);
	const dateTimeTwo = new Date(secondTimeString);

	return dateTimeOne.getTime() > dateTimeTwo.getTime();
}
