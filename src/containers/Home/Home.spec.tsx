import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import { PatientStore } from '@store/PatientStore';
import { RootStore } from '@store/RootStore';

import Home from './Home';

Enzyme.configure({
	adapter: new Adapter()
});

describe('Home component', () => {
	let store: RootStore;
	let patientStore: PatientStore;

	beforeEach(() => {
		store = new RootStore();
		patientStore = new PatientStore(store);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders', () => {
		const wrapper = Enzyme.shallow(<Home patientStore={patientStore} />);
		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find('Home')).toHaveLength(1);
	});

	it('renders snapshot correctly', () => {
		const wrapper = Enzyme.shallow(<Home patientStore={patientStore} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should mount component', () => {
		const wrapper = Enzyme.mount(<Home patientStore={patientStore} />);
		expect(wrapper.find('Home').length).toEqual(1);
	});
});
