import moment from 'moment';
import React from 'react';

import { Patient } from '@models/Patient';

import placeholderImage from '@assets/images/svg/placeholder.svg';

import './style.scss';

export interface PatientListItemProps {
	patient: Patient;
}

const PatientListItem = (props: PatientListItemProps) => {
	const { patient } = props;
	return (
		<div className="PatientListItem__Main">
			<div className="Image__Container">
				<img className="Image" src={placeholderImage} />
			</div>
			<div className="Text__Container">
				<label className="Patient__Name">{patient.firstName}</label>
				<label className="Last__Message">
					{patient.lastMessage ? patient.lastMessage.text : 'No messages'}
				</label>
			</div>
			<div className="Time__Container">
				<label className="Time">
					{patient.lastMessage ? moment(patient.lastMessage.formattedDate).format('HH:mm') : '-'}
				</label>
			</div>
		</div>
	);
};

export default PatientListItem;
