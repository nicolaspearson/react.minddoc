import React from 'react';

import Checkbox from '@components/ui/Checkbox';
import { CheckboxItem } from '@models/CheckboxItem';

import './style.scss';

const filters: CheckboxItem[] = [
	{
		key: 'linked',
		label: 'Linked',
		name: 'check-box-linked'
	},
	{
		key: 'online',
		label: 'Online',
		name: 'check-box-online'
	},
	{
		key: 'unread',
		label: 'Unread Messages',
		name: 'check-box-unread'
	}
];

export interface OverflowMenuProps {
	onCloseOverflowMenu: () => void;
	onFilterChange: () => void;
}

interface State {
	checkedItems: Map<string, boolean>;
}

class OverflowMenu extends React.Component<OverflowMenuProps, State> {
	public state: State = {
		checkedItems: new Map()
	};

	private rootRef = React.createRef<HTMLDivElement>();

	public componentWillMount() {
		document.addEventListener('mousedown', this.handleOnClick, false);
	}

	public componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleOnClick, false);
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
		const item = event.target.name;
		const isChecked = event.target.checked;
		this.setState((prevState) => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
	};

	private renderFilters = (): JSX.Element[] => {
		return filters.map((item) => (
			<label key={item.key}>
				<Checkbox
					checked={this.state.checkedItems.get(item.name)}
					label={item.label}
					onChange={this.handleOnChange}
					name={item.name}
				/>
			</label>
		));
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
