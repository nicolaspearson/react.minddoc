import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import { RootStore } from '@store/RootStore';
import { RouterStore } from '@store/RouterStore';

import RouterLink from './RouterLink';

Enzyme.configure({
	adapter: new Adapter()
});

describe('RouterLink component', () => {
	let store: RootStore;
	let routerStore: RouterStore;

	beforeEach(() => {
		store = new RootStore();
		routerStore = new RouterStore(store);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders', () => {
		const wrapper = Enzyme.shallow(<RouterLink routerStore={routerStore} routeName="Test" />);
		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find('RouterLink')).toHaveLength(1);
	});

	it('renders snapshot correctly', () => {
		const wrapper = Enzyme.shallow(<RouterLink routerStore={routerStore} routeName="Test" />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should mount component with children', () => {
		const wrapper = Enzyme.mount(
			<RouterLink routerStore={routerStore} routeName="Test">
				<div />
			</RouterLink>
		);
		expect(wrapper.find('RouterLink').length).toEqual(1);
		expect(wrapper.find('RouterLink').children().length).toEqual(1);
	});
});
