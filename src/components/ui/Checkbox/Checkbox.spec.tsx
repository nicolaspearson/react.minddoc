import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Checkbox from './Checkbox';

Enzyme.configure({
	adapter: new Adapter()
});

describe('Checkbox component', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders', () => {
		const wrapper = Enzyme.shallow(
			<div>
				<Checkbox label="Test" name="Test" onChange={() => undefined} />
			</div>
		);
		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find('Checkbox')).toHaveLength(1);
	});

	it('renders snapshot correctly', () => {
		const wrapper = Enzyme.shallow(
			<Checkbox label="Test" name="Test" onChange={() => undefined} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should mount component', () => {
		const wrapper = Enzyme.mount(
			<div>
				<Checkbox label="Test" name="Test" onChange={() => undefined} />
			</div>
		);
		expect(wrapper.children(Checkbox).length).toEqual(1);
	});
});
