import { FilterNames } from '../src/enums/FilterNames';
import { Filter } from '../src/models/Filter';
import { FilterStore } from '../src/store/FilterStore';
import { RootStore } from '../src/store/RootStore';

describe('FilterStore', () => {
	it('get filters', () => {
		const rootStore = new RootStore();
		const store = new FilterStore(rootStore);
		expect(store.getFilters().length).toBe(0);
	});

	it('create filters', () => {
		const rootStore = new RootStore();
		const store = new FilterStore(rootStore);
		const first: Filter = {
			name: 'First Filter',
			isChecked: false
		};
		const second: Filter = {
			name: 'Second Filter',
			isChecked: true
		};
		store.addFilter(first);
		store.addFilter(second);
		expect(store.filters.length).toBe(2);
		expect(store.filters[0].name).toBe('First Filter');
		expect(store.filters[1].name).toBe('Second Filter');
	});

	it('delete filters', () => {
		const rootStore = new RootStore();
		const store = new FilterStore(rootStore);
		const first: Filter = {
			name: 'First Filter',
			isChecked: false
		};
		const second: Filter = {
			name: 'Second Filter',
			isChecked: true
		};
		store.addFilter(first);
		store.addFilter(second);
		expect(store.filters.length).toBe(2);
		expect(store.filters[0].name).toBe('First Filter');
		expect(store.filters[1].name).toBe('Second Filter');

		store.deleteFilter(first.name);
		expect(store.filters.length).toBe(1);

		store.deleteFilter(second.name);
		expect(store.filters.length).toBe(0);
	});

	it('update filter checked state', () => {
		const rootStore = new RootStore();
		const store = new FilterStore(rootStore);
		const first: Filter = {
			name: 'First Filter',
			isChecked: false
		};
		const second: Filter = {
			name: 'Second Filter',
			isChecked: true
		};
		store.addFilter(first);
		store.addFilter(second);
		expect(store.filters.length).toBe(2);
		expect(store.filters[0].isChecked).toBe(false);
		expect(store.filters[1].isChecked).toBe(true);

		store.updateFilterCheckedState(first.name, true);
		expect(store.filters[0].isChecked).toBe(true);

		store.updateFilterCheckedState(second.name, false);
		expect(store.filters[1].isChecked).toBe(false);
	});

	it('build filters', () => {
		const rootStore = new RootStore();
		const store = new FilterStore(rootStore);
		store.buildFilters();
		expect(store.filters.length).toBe(3);
		expect(store.filters[0].name).toBe(FilterNames.LINKED);
		expect(store.filters[1].name).toBe(FilterNames.ONLINE);
		expect(store.filters[2].name).toBe(FilterNames.UNREAD);
	});
});
