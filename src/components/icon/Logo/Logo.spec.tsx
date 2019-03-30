import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Logo from './Logo';

Enzyme.configure({
	adapter: new Adapter()
});

describe('Logo component', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders', () => {
		const wrapper = Enzyme.shallow(
			<div>
				<Logo />
			</div>
		);
		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find('Logo')).toHaveLength(1);
	});

	it('renders snapshot correctly', () => {
		const wrapper = Enzyme.shallow(<Logo />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should mount component', () => {
		const wrapper = Enzyme.mount(<Logo />);
		expect(wrapper.find('Logo').length).toEqual(1);
	});
});
