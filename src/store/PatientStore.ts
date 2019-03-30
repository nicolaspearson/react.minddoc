import { action, flow, observable } from 'mobx';
import moment from 'moment';

import { Message } from '@models/Message';
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
	public initState(clearList?: boolean) {
		this.data = undefined;
		if (clearList) {
			this.dataList = [];
		}
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
			// Iterate of each patient to parse the messages
			res.map((patient) => {
				patient.parsedMessages = [];
				// Iterate of each message
				for (const raw of patient.messages) {
					// Parse the message
					const message: Message = { ...JSON.parse(raw) };
					// Create a formatted that we can use
					message.formattedDate = moment(message.date).toDate();
					patient.parsedMessages.push(message);
				}
				// Sort the messages from newest to oldest
				patient.parsedMessages.sort(
					(a, b) => b.formattedDate.getTime() - a.formattedDate.getTime()
				);
				// Assign the "lastMessage"
				patient.lastMessage =
					patient.parsedMessages.length > 0 ? patient.parsedMessages[0] : undefined;
				return patient;
			});
			// We need to parse the messages
			this.handleResponse(res, true);
		} catch (error) {
			this.handleError(error);
		}
	});
}
