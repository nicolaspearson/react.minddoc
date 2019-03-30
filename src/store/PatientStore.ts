import { action, flow, observable } from 'mobx';

import { Patient } from '@models/Patient';
import { RootStore } from '@store/RootStore';

export class PatientStore {
	public rootStore: RootStore;

	// Unused at the moment, added for future features
	@observable
	public data?: Patient;

	@observable
	public dataList: Patient[] = [];

	@observable
	public errors?: any;

	@observable
	public loading: boolean = false;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
		this.initState();
	}

	@action
	public initState() {
		this.data = undefined;
		this.dataList = [];
		this.errors = undefined;
		this.loading = false;
	}

	@action
	public handleResponse(res: any, isList?: boolean) {
		this.loading = false;
		if (res) {
			if (res.error) {
				this.errors = res;
			} else {
				if (isList) {
					// Set the list
					this.dataList = res;
				}
				// Set the data
				this.data = res;
			}
		} else {
			this.errors = 'An unknown error occurred';
		}
	}

	@action
	public handleError(error: any) {
		this.errors = error;
		this.loading = false;
	}

	public fetchPatientStatusList = flow(function*(this: PatientStore) {
		this.initState();
		this.loading = true;
		try {
			const res: Patient[] = yield this.rootStore.mindDocApi.getPatientStatusList();
			this.handleResponse(res, true);
		} catch (error) {
			this.handleError(error);
		}
	});
}
