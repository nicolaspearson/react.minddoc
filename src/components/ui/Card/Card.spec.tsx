import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Card from './Card';

Enzyme.configure({
	adapter: new Adapter()
});

describe('Card component', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders', () => {
		const wrapper = Enzyme.shallow(
			<div>
				<Card />
			</div>
		);
		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find('Card')).toHaveLength(1);
	});

	it('renders snapshot correctly', () => {
		const wrapper = Enzyme.shallow(<Card />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should mount component with children', () => {
		const wrapper = Enzyme.mount(
			<Card>
				<div />
			</Card>
		);
		expect(wrapper.find('Card').length).toEqual(1);
		expect(wrapper.find('Card').children().length).toEqual(1);
	});
});
