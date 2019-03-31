import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import ImageWrapper from './ImageWrapper';

Enzyme.configure({
	adapter: new Adapter()
});

describe('ImageWrapper component', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders', () => {
		const wrapper = Enzyme.shallow(
			<div>
				<ImageWrapper className="Test" />
			</div>
		);
		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find('ImageWrapper')).toHaveLength(1);
	});

	it('renders snapshot correctly', () => {
		const wrapper = Enzyme.shallow(<ImageWrapper className="Test" />);
		expect(wrapper).toMatchSnapshot();
	});
});
