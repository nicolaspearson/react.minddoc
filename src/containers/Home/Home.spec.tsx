import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Home from './Home';

Enzyme.configure({
	adapter: new Adapter()
});

describe('Home component', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders', () => {
		const wrapper = Enzyme.shallow(
			<div>
				<Home />
			</div>
		);
		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find('Home')).toHaveLength(1);
	});

	it('renders snapshot correctly', () => {
		const wrapper = Enzyme.shallow(<Home />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should mount component', () => {
		const wrapper = Enzyme.mount(<Home />);
		expect(wrapper.find('Home').length).toEqual(1);
	});
});
