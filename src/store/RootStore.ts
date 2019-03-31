import { MindDocApi } from '@api/MindDocApi';

import { FilterStore } from '@store/FilterStore';
import { PatientStore } from '@store/PatientStore';
import { RouterStore } from '@store/RouterStore';

export class RootStore {
	public mindDocApi: MindDocApi;

	public filterStore: FilterStore;
	public patientStore: PatientStore;
	public routerStore: RouterStore;

	constructor() {
		this.mindDocApi = new MindDocApi();

		this.filterStore = new FilterStore(this);
		this.patientStore = new PatientStore(this);
		this.routerStore = new RouterStore(this);
	}
}
