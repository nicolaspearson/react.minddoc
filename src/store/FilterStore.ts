import { action, observable } from 'mobx';

import { FilterNames } from '@enums/FilterNames';
import { Filter } from '@models/Filter';
import { RootStore } from '@store/RootStore';

export class FilterStore {
	public rootStore: RootStore;

	@observable
	public filters: Filter[] = [];

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
		this.initState();
	}

	@action
	public initState() {
		this.filters = [];
	}

	@action
	public buildFilters() {
		if (this.getFilters().length < 1) {
			// Create the filters
			this.addFilter({ name: FilterNames.LINKED, isChecked: false });
			this.addFilter({ name: FilterNames.ONLINE, isChecked: false });
			this.addFilter({ name: FilterNames.UNREAD, isChecked: false });
		}
	}

	@action
	public getFilters() {
		return this.filters;
	}

	@action
	public addFilter(filter: Filter) {
		return this.filters.push(filter);
	}

	@action
	public deleteFilter(deleteFilterName: string) {
		return (this.filters = this.filters.filter((filter) => filter.name !== deleteFilterName));
	}

	@action
	public updateFilterCheckedState(filterName: string, isChecked: boolean) {
		const filterItem: Filter | undefined = this.filters.find(
			(filter) => filter.name === filterName
		);
		if (filterItem) {
			filterItem.isChecked = isChecked;
		}
		return filterItem;
	}
}
