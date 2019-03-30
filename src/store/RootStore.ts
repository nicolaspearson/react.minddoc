import { MindDocApi } from '@api/MindDocApi';
import { PatientStore } from '@store/PatientStore';
import { RouterStore } from '@store/RouterStore';

export class RootStore {
	public mindDocApi: MindDocApi;

	public patientStore: PatientStore;
	public routerStore: RouterStore;

	constructor() {
		this.mindDocApi = new MindDocApi();

		this.patientStore = new PatientStore(this);
		this.routerStore = new RouterStore(this);
	}
}
