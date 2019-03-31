import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import { FilterStore } from '@store/FilterStore';
import { RootStore } from '@store/RootStore';

import OverflowMenu from './OverflowMenu';

Enzyme.configure({
	adapter: new Adapter()
});

describe('OverflowMenu component', () => {
	let store: RootStore;
	let filterStore: FilterStore;

	beforeEach(() => {
		store = new RootStore();
		filterStore = new FilterStore(store);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders', () => {
		const wrapper = Enzyme.shallow(
			<OverflowMenu
				filterStore={filterStore}
				onCloseOverflowMenu={() => undefined}
				onFilterChange={() => undefined}
			/>
		);
		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find('OverflowMenu')).toHaveLength(1);
	});

	it('renders snapshot correctly', () => {
		const wrapper = Enzyme.shallow(
			<OverflowMenu
				filterStore={filterStore}
				onCloseOverflowMenu={() => undefined}
				onFilterChange={() => undefined}
			/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should mount component', () => {
		const wrapper = Enzyme.mount(
			<div>
				<OverflowMenu
					filterStore={filterStore}
					onCloseOverflowMenu={() => undefined}
					onFilterChange={() => undefined}
				/>
			</div>
		);
		expect(wrapper.children(OverflowMenu).length).toEqual(1);
	});
});
