import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import Button from './Button';

Enzyme.configure({
	adapter: new Adapter()
});

describe('Button component', () => {
	it('renders', () => {
		const wrapper = Enzyme.shallow(
			<div>
				<Button>Hello</Button>
			</div>
		);
		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find('Button').html()).toMatch(/Hello/);
	});

	it('renders snapshot correctly', () => {
		const wrapper = Enzyme.shallow(<Button>Hello</Button>);
		expect(wrapper).toMatchSnapshot();
	});

	it('should mount component', () => {
		const wrapper = Enzyme.mount(
			<div>
				<Button>Hello</Button>
			</div>
		);

		expect(wrapper.children(Button).length).toEqual(1);
	});
});
