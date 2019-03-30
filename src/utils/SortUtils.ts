import { Message } from '@models/Message';

export function compareString(a?: string, b?: string) {
	return a || b ? (!a ? 1 : !b ? -1 : a.localeCompare(b)) : 0;
}

export function compareBoolean(a?: boolean, b?: boolean) {
	return a || b ? (!a ? 1 : !b ? -1 : a === b ? 0 : a ? -1 : 1) : 0;
}

export function compareMessageDates(a?: Message, b?: Message) {
	return a || b
		? !a
			? 1
			: !b
			? -1
			: a.formattedDate.getTime() > b.formattedDate.getTime()
			? -1
			: 1
		: 0;
}
