import { Address } from '@models/Address';
import { EmergencyContact } from '@models/EmergencyContact';

export interface Patient {
	firstName: string;
	lastName: string;
	profilePicture: string;
	gender: string;
	phoneNumber: string;
	dateOfBirth: Date;
	insuranceNumber: string;
	diagnosis: string;
	treatmentType: string;
	address: Address;
	emergencyContact?: EmergencyContact;
	online: boolean;
	linked: boolean;
	messages: string[];
}
