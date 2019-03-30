import classnames from 'classnames';
import moment from 'moment';
import React from 'react';

import ImageWrapper from '@components/ui/ImageWrapper';
import { Patient } from '@models/Patient';

import linkImage from '@assets/images/svg/link.svg';
import unlinkImage from '@assets/images/svg/unlink.svg';

import './style.scss';

export interface PatientListItemProps {
	isActive: boolean;
	onClick: (patient: Patient) => void;
	patient: Patient;
}

const PatientListItem = (props: PatientListItemProps) => {
	const { patient } = props;
	return (
		<section
			className={classnames('PatientListItem__Main', { Patient__Selected: props.isActive })}
			onClick={() => props.onClick(patient)}
		>
			<section className="Image__Container">
				<ImageWrapper
					className="Circle__Image"
					alt={`${patient.firstName} ${patient.lastName}`}
					render={true}
					src={patient.profilePicture}
				/>
				<span className={patient.online ? 'Status__Online' : 'Status__Offline'} />
			</section>
			<section className="Text__Container">
				<label className="Patient__Name">{patient.firstName}</label>
				<label className="Last__Message">
					{patient.lastMessage ? patient.lastMessage.text : 'No messages'}
				</label>
			</section>
			<section className="Time__Container">
				<label className="Time">
					{patient.lastMessage ? moment(patient.lastMessage.formattedDate).format('HH:mm') : '-'}
				</label>
				<img className="Link__Status" src={patient.linked ? linkImage : unlinkImage} />
			</section>
		</section>
	);
};

export default PatientListItem;
