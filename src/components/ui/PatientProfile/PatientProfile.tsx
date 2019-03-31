import moment from 'moment';
import React from 'react';

import { Patient } from '@models/Patient';

import './style.scss';

export interface PatientProfileProps {
	patient: Patient;
}

function getAddress(patient: Patient): string {
	const { address } = patient;
	return `${address.number || ''} ${address.street}, ${address.city}, ${address.zip}`;
}

function getDateOfBirth(patient: Patient): string {
	const { dateOfBirth } = patient;
	return moment(dateOfBirth).format('YYYY/MM/DD');
}

function getEmergencyContact(patient: Patient): string {
	const { emergencyContact } = patient;
	return emergencyContact
		? `${emergencyContact.firstName} ${emergencyContact.lastName}, ${emergencyContact.phoneNumber}`
		: 'N/A';
}

const PatientProfile = (props: PatientProfileProps) => {
	return (
		<div className="PatientProfile__Main">
			<label className="Title">{`${props.patient.firstName} ${props.patient.lastName}`}</label>
			<table>
				<tr>
					<td className="Detail__Label">Gender:</td>
					<td className="Detail__Value">{props.patient.gender}</td>
				</tr>
				<tr>
					<td className="Detail__Label">Phone Number:</td>
					<td className="Detail__Value">{props.patient.phoneNumber}</td>
				</tr>
				<tr>
					<td className="Detail__Label">Address:</td>
					<td className="Detail__Value">{getAddress(props.patient)}</td>
				</tr>
				<tr>
					<td className="Detail__Label">Date Of Birth:</td>
					<td className="Detail__Value">{getDateOfBirth(props.patient)}</td>
				</tr>
				<tr>
					<td className="Detail__Label">Insurance Number:</td>
					<td className="Detail__Value">{props.patient.insuranceNumber}</td>
				</tr>
				<tr>
					<td className="Detail__Label">Diagnosis:</td>
					<td className="Detail__Value">{props.patient.diagnosis}</td>
				</tr>
				<tr>
					<td className="Detail__Label">Treatment Type:</td>
					<td className="Detail__Value">{props.patient.treatmentType}</td>
				</tr>
				<tr>
					<td className="Detail__Label">Emergency Contact:</td>
					<td className="Detail__Value">{getEmergencyContact(props.patient)}</td>
				</tr>
			</table>
		</div>
	);
};

export default PatientProfile;
