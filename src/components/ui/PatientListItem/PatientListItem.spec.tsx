import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import { Patient } from '@models/Patient';

import PatientListItem from './PatientListItem';

Enzyme.configure({
	adapter: new Adapter()
});

describe('PatientListItem component', () => {
	const patient: Patient = {
		firstName: 'Amelie',
		lastName: 'Vogt',
		profilePicture:
			'https://res.cloudinary.com/minddoc/image/upload/c_thumb,g_face,h_110,w_110/v1/mitsu/staging/avatars/632a9096-6394-4e06-b488-aa823c3d3d0e.jpg',
		gender: 'female',
		phoneNumber: '004900612345678',
		dateOfBirth: new Date(),
		insuranceNumber: 'F4K3-1D-98765-1',
		diagnosis: 'eatingDisorder',
		treatmentType: 'outpatient',
		address: {
			city: 'München',
			street: 'Beispielstraße',
			zip: '80804'
		},
		emergencyContact: undefined,
		online: true,
		linked: true,
		messages: [
			'{"text":"Hi","read":true,"date":"2019-03-25T10:30:00.000Z"}',
			'{"text":"When do we begin?","read":true,"date":"2019-03-25T11:30:00.000Z"}',
			'{"text":"Looking forward!","read":false,"date":"2019-03-25T12:30:00.000Z"}'
		]
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders', () => {
		const wrapper = Enzyme.shallow(
			<div>
				<PatientListItem isActive={false} onClick={() => undefined} patient={patient} />
			</div>
		);
		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find('PatientListItem')).toHaveLength(1);
	});

	it('renders snapshot correctly', () => {
		const wrapper = Enzyme.shallow(
			<PatientListItem isActive={false} onClick={() => undefined} patient={patient} />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
