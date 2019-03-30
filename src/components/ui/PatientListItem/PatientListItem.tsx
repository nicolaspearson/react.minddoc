import classnames from 'classnames';
import moment from 'moment';
import React from 'react';

import ImageWrapper from '@components/ui/ImageWrapper';
import { Patient } from '@models/Patient';

import './style.scss';

export interface PatientListItemProps {
	isActive: boolean;
	onClick: (patient: Patient) => void;
	patient: Patient;
}

const PatientListItem = (props: PatientListItemProps) => {
	const { patient } = props;
	return (
		<div
			className={classnames('PatientListItem__Main', { Patient__Selected: props.isActive })}
			onClick={() => props.onClick(patient)}
		>
			<div className="Image__Container">
				<ImageWrapper
					className="Circle__Image"
					alt={`${patient.firstName} ${patient.lastName}`}
					render={true}
					src={patient.profilePicture}
				/>
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
