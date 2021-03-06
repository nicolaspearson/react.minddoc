import { action } from 'mobx';
import React from 'react';
import { Route, State } from 'router5';

import Home from '@containers/Home';
import { RouteNames } from '@enums/RouteNames';
import { RouterStore } from '@store/RouterStore';

export interface LinkData {
	name: string;
	params?: object;
}

export type DoneFn = (err?: any, state?: State) => void;
export type Params = Record<string, any>;

export interface AdvRoute extends Route {
	link: (...args: any[]) => LinkData;
	component: (next?: Params) => any;
	activate?: (store: RouterStore, current?: Params, prev?: State) => void;
	deactivate?: (store: RouterStore, current?: Params, next?: State) => void;
}

export interface Routes {
	[name: string]: AdvRoute;
}

export const routes: Routes = {};

export const HomeRoute: AdvRoute = {
	name: RouteNames.HOME,
	path: '/',

	link: () => ({
		name: HomeRoute.name
	}),

	component: () => <Home />,

	activate: action((store: RouterStore) => {
		store.activatedRouteName(HomeRoute.name);
	}),

	deactivate: (store: RouterStore) => {
		store.deActivatedRouteName(HomeRoute.name);
	}
};
routes[HomeRoute.name] = HomeRoute;
