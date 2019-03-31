import { action, flow, observable } from 'mobx';
import moment from 'moment';

import { Message } from '@models/Message';
import { Patient } from '@models/Patient';
import { RootStore } from '@store/RootStore';
import { compareBoolean, compareMessageDates, compareString } from '@utils/SortUtils';

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
			// Iterate over each patient to parse the messages
			res.map((patient) => {
				patient.parsedMessages = [];
				// Iterate of each message
				for (const raw of patient.messages) {
					// Parse the message
					const message: Message = { ...JSON.parse(raw) };
					// Create a formatted that we can use
					message.formattedDate = moment(message.date).toDate();
					// Set the message type to 0 in order for to
					//  appear on the right of the message list
					message.type = 0;
					patient.parsedMessages.push(message);
				}
				// Sort the messages from newest to oldest
				patient.parsedMessages.sort((a, b) => compareMessageDates(a, b));
				// Assign the "lastMessage"
				patient.lastMessage =
					patient.parsedMessages.length > 0 ? patient.parsedMessages[0] : undefined;
				// Assign the "lastReadMessage"
				patient.lastReadMessage = patient.parsedMessages.find((item) => item.read === true);
				// Assign the "lastUnreadMessage"
				patient.lastUnreadMessage = patient.parsedMessages.find((item) => item.read !== true);
				return patient;
			});

			// Sort the patients
			res.sort((a, b) => {
				return (
					// Patients with newest unread messages will always be shown first
					compareMessageDates(a.lastUnreadMessage, b.lastUnreadMessage) ||
					// Patients with newest read messages
					compareMessageDates(a.lastReadMessage, b.lastReadMessage) ||
					// Patients that are linked will be shown before unlinked ones
					compareBoolean(a.linked, b.linked) ||
					// Alphabetical order (firstName + lastName) for the rest
					compareString(a.firstName + a.lastName, b.firstName + b.lastName)
				);
			});
			this.handleResponse(res, true);
		} catch (error) {
			this.handleError(error);
		}
	});
}
