import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Tab from './Tab';

Enzyme.configure({
	adapter: new Adapter()
});

describe('Tab component', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders', () => {
		const wrapper = Enzyme.shallow(
			<div>
				<Tab label="Test" />
			</div>
		);
		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find('Tab')).toHaveLength(1);
	});

	it('renders snapshot correctly', () => {
		const wrapper = Enzyme.shallow(<Tab label="Test" />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should mount component', () => {
		const wrapper = Enzyme.mount(
			<div>
				<Tab label="Test" />
			</div>
		);
		expect(wrapper.children(Tab).length).toEqual(1);
	});
});
