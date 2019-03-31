import { RootStore } from '../src/store/RootStore';
import { RouterStore } from '../src/store/RouterStore';

describe('RouterStore', () => {
	it('activate and deactivate routes', () => {
		const rootStore = new RootStore();
		const store = new RouterStore(rootStore);
		expect(store.activeRouteName).toEqual('/');
		store.activatedRouteName('/home');
		expect(store.activeRouteName).toEqual('/home');
		store.activatedRouteName('/');
		expect(store.activeRouteName).toEqual('/');
	});

	it('navigate method should be defined', () => {
		const rootStore = new RootStore();
		const store = new RouterStore(rootStore);
		expect(store.navigate).toBeDefined();
	});
});
