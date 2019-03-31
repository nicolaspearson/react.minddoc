import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Tab from '@components/ui/Tab';

import Tabs from './Tabs';

Enzyme.configure({
	adapter: new Adapter()
});

describe('Tabs component', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders', () => {
		const wrapper = Enzyme.shallow(
			<div>
				<Tabs>
					<Tab label="Test">
						<div />
					</Tab>
				</Tabs>
			</div>
		);
		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find('Tabs')).toHaveLength(1);
	});

	it('renders snapshot correctly', () => {
		const wrapper = Enzyme.shallow(
			<Tabs>
				<Tab label="Test">
					<div />
				</Tab>
			</Tabs>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should mount component', () => {
		const wrapper = Enzyme.mount(
			<div>
				<Tabs>
					<Tab label="Test">
						<div />
					</Tab>
				</Tabs>
			</div>
		);
		expect(wrapper.children(Tabs).length).toEqual(1);
	});
});
