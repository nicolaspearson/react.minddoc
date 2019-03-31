import { inject, observer } from 'mobx-react';
import React from 'react';

import Checkbox from '@components/ui/Checkbox';

import { FilterNames } from '@enums/FilterNames';
import { StoreNames } from '@enums/StoreNames';

import { CheckboxItem } from '@models/CheckboxItem';
import { Filter } from '@models/Filter';

import { FilterStore } from '@store/FilterStore';

import './style.scss';

const filters: CheckboxItem[] = [
	{
		key: 'linked',
		label: 'Linked',
		name: FilterNames.LINKED
	},
	{
		key: 'online',
		label: 'Online',
		name: FilterNames.ONLINE
	},
	{
		key: 'unread',
		label: 'Unread Messages',
		name: FilterNames.UNREAD
	}
];

export interface OverflowMenuProps {
	filterStore?: FilterStore;
	onCloseOverflowMenu: () => void;
	onFilterChange: () => void;
}

@inject(StoreNames.FILTER)
@observer
class OverflowMenu extends React.Component<OverflowMenuProps> {
	private rootRef = React.createRef<HTMLDivElement>();

	public componentDidMount() {
		document.addEventListener('mousedown', this.handleOnClick, false);
	}

	public componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleOnClick, false);
	}

	private getStoreFilters(): Filter[] {
		const { filterStore } = this.props;
		// Get the filters from the store
		if (filterStore) {
			return filterStore.getFilters();
		}
		return [];
	}

	private handleOnClick = (event: any) => {
		if (
			this.rootRef !== null &&
			this.rootRef.current !== null &&
			this.rootRef.current.contains(event.target)
		) {
			// Clicked inside of div element
			return;
		}
		// Clicked outside of div element
		this.props.onCloseOverflowMenu();
	};

	private handleOnChange = (event: any) => {
		const { filterStore } = this.props;
		const filterName = event.target.name;
		const isChecked = event.target.checked;
		if (filterStore) {
			// Update the item in the store
			filterStore.updateFilterCheckedState(filterName, isChecked);
		}
	};

	private renderFilters = (): JSX.Element[] => {
		return filters.map((item) => {
			const filterItem: Filter | undefined = this.getStoreFilters().find(
				(filter) => filter.name === item.name
			);
			return (
				<label key={item.key}>
					<Checkbox
						checked={filterItem ? filterItem.isChecked : false}
						label={item.label}
						onChange={this.handleOnChange}
						name={item.name}
					/>
				</label>
			);
		});
	};

	public render() {
		return (
			<div ref={this.rootRef} className="OverflowMenu__Main">
				<label className="Title">Filters</label>
				<div className="Filter__Menu">{this.renderFilters()}</div>
			</div>
		);
	}
}

export default OverflowMenu;
