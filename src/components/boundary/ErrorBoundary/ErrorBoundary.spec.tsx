import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import { RootStore } from '@store/RootStore';
import { RouterStore } from '@store/RouterStore';

import ErrorBoundary from './ErrorBoundary';

import { observable } from 'mobx';

Enzyme.configure({
	adapter: new Adapter()
});

describe('ErrorBoundary component', () => {
	let store: RootStore;
	let routerStore: RouterStore;

	// tslint:disable-next-line
	const ErrorComponent = () => null;

	beforeEach(() => {
		store = new RootStore();
		routerStore = new RouterStore(store);
	});

	it('renders', () => {
		const wrapper = Enzyme.shallow(
			<ErrorBoundary routerStore={routerStore}>
				<div />
			</ErrorBoundary>
		);
		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find('ErrorBoundary').html()).toMatch('<div></div>');
	});

	it('renders snapshot correctly', () => {
		const wrapper = Enzyme.shallow(
			<ErrorBoundary routerStore={routerStore}>
				<div />
			</ErrorBoundary>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should mount component', () => {
		const wrapper = Enzyme.mount(
			<ErrorBoundary routerStore={routerStore}>
				<div />
			</ErrorBoundary>
		);

		expect(wrapper.find('ErrorBoundary').children().length).toEqual(1);
	});

	it('should display an error message if wrapped component throws', () => {
		const wrapper = Enzyme.mount(
			<ErrorBoundary routerStore={routerStore}>
				<ErrorComponent />
			</ErrorBoundary>
		);
		const error = new Error('Error Component Test');
		wrapper.find(ErrorComponent).simulateError(error);
	});
});
