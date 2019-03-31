import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import OverflowMenu from './OverflowMenu';

Enzyme.configure({
	adapter: new Adapter()
});

describe('OverflowMenu component', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders', () => {
		const wrapper = Enzyme.shallow(
			<div>
				<OverflowMenu onCloseOverflowMenu={() => undefined} onFilterChange={() => undefined} />
			</div>
		);
		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find('OverflowMenu')).toHaveLength(1);
	});

	it('renders snapshot correctly', () => {
		const wrapper = Enzyme.shallow(
			<OverflowMenu onCloseOverflowMenu={() => undefined} onFilterChange={() => undefined} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should mount component', () => {
		const wrapper = Enzyme.mount(
			<div>
				<OverflowMenu onCloseOverflowMenu={() => undefined} onFilterChange={() => undefined} />
			</div>
		);
		expect(wrapper.children(OverflowMenu).length).toEqual(1);
	});
});
