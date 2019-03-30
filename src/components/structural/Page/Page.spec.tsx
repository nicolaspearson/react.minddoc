import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Page from './Page';

Enzyme.configure({
	adapter: new Adapter()
});

describe('Page component', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders', () => {
		const wrapper = Enzyme.shallow(
			<div>
				<Page />
			</div>
		);
		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find('Page')).toHaveLength(1);
	});

	it('renders snapshot correctly', () => {
		const wrapper = Enzyme.shallow(<Page />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should mount component with children', () => {
		const wrapper = Enzyme.mount(
			<Page>
				<div />
			</Page>
		);
		expect(wrapper.find('Page').length).toEqual(1);
		expect(wrapper.find('Page').children().length).toEqual(1);
	});
});
