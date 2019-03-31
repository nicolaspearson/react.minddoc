import { compareBoolean, compareMessageDates, compareString } from '../src/utils/SortUtils';

describe('SortUtils', () => {
	it('sort alphabetically by comparing two strings', () => {
		expect(compareString).toBeDefined();
		const first = 'abc';
		const second = 'cba';
		const third = 'cba';
		expect(compareString(first, second)).toEqual(-1);
		expect(compareString(second, third)).toEqual(0);
		expect(compareString(second, first)).toEqual(1);
		expect(compareString(first, undefined)).toEqual(-1);
	});

	it('sort by comparing two boolean values', () => {
		expect(compareBoolean).toBeDefined();
		const first = true;
		const second = false;
		const third = true;
		expect(compareBoolean(first, second)).toEqual(-1);
		expect(compareBoolean(second, third)).toEqual(1);
		expect(compareBoolean(second, first)).toEqual(1);
		expect(compareBoolean(first, undefined)).toEqual(-1);
	});

	it('sort by comparing two boolean values', () => {
		expect(compareMessageDates).toBeDefined();
		const first = {
			text: 'first',
			read: true,
			date: '',
			formattedDate: new Date()
		};
		const second = {
			text: 'second',
			read: true,
			date: '',
			formattedDate: new Date()
		};
		second.formattedDate.setDate(second.formattedDate.getDate() + 1);
		expect(compareMessageDates(first, second)).toEqual(1);
		expect(compareMessageDates(second, first)).toEqual(-1);
		expect(compareMessageDates(first, undefined)).toEqual(-1);
	});
});
