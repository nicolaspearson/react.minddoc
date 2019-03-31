import { PatientStore } from '../src/store/PatientStore';
import { RootStore } from '../src/store/RootStore';

describe('PatientStore', () => {
	it('check initial state', () => {
		const rootStore = new RootStore();
		const store = new PatientStore(rootStore);
		expect(store.data).toBeUndefined();
		expect(store.errors).toBeUndefined();
		expect(store.dataList).toEqual([]);
		expect(store.loading).toEqual(false);
	});

	it('handleResponse method should be defined', () => {
		const rootStore = new RootStore();
		const store = new PatientStore(rootStore);
		expect(store.handleResponse).toBeDefined();
	});

	it('handleError method should be defined', () => {
		const rootStore = new RootStore();
		const store = new PatientStore(rootStore);
		expect(store.handleError).toBeDefined();
	});

	it('fetchPatientStatusList method should be defined', () => {
		const rootStore = new RootStore();
		const store = new PatientStore(rootStore);
		expect(store.fetchPatientStatusList).toBeDefined();
	});
});
