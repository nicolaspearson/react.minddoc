import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Loader from './Loader';

Enzyme.configure({
	adapter: new Adapter()
});

describe('Loader component', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders', () => {
		const wrapper = Enzyme.shallow(
			<div>
				<Loader />
			</div>
		);
		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find('Loader')).toHaveLength(1);
	});

	it('renders snapshot correctly', () => {
		const wrapper = Enzyme.shallow(<Loader />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should mount component', () => {
		const wrapper = Enzyme.mount(
			<div>
				<Loader />
			</div>
		);
		expect(wrapper.children(Loader).length).toEqual(1);
	});
});
