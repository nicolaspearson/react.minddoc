import classnames from 'classnames';
import moment from 'moment';
import React from 'react';

import Logo from '@components/icon/Logo';
import ImageWrapper from '@components/ui/ImageWrapper';
import { Message } from '@models/Message';
import { Patient } from '@models/Patient';

import readImage from '@assets/images/svg/done-all.svg';
import deliveredImage from '@assets/images/svg/done.svg';

import './style.scss';

export interface PatientMessagesProps {
	patient: Patient;
}

interface State {
	currentPatientInsuranceNumber: string;
	messages: Message[];
	newMessage: string;
}

class PatientMessages extends React.Component<PatientMessagesProps, State> {
	public state: State = {
		currentPatientInsuranceNumber: '',
		messages: [],
		newMessage: ''
	};

	public static getDerivedStateFromProps(nextProps: PatientMessagesProps, prevState: State) {
		if (nextProps.patient.insuranceNumber !== prevState.currentPatientInsuranceNumber) {
			return PatientMessages.getNewPatientState(nextProps.patient);
		}
		// tslint:disable-next-line
		return null;
	}

	public componentDidMount() {
		this.setState(PatientMessages.getNewPatientState(this.props.patient));
	}

	private static getNewPatientState(patient: Patient): State {
		return {
			currentPatientInsuranceNumber: patient.insuranceNumber,
			messages: patient.parsedMessages ? patient.parsedMessages.slice().reverse() : [],
			newMessage: ''
		};
	}

	private handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const { newMessage } = this.state;

		if (newMessage) {
			// Add the message to the state array
			const formattedDate = new Date();
			const formattedMessage: Message = {
				date: moment(formattedDate).toISOString(),
				formattedDate,
				text: newMessage,
				read: false,
				type: 1
			};
			this.setState({ messages: [...this.state.messages, formattedMessage], newMessage: '' });
		}
	};

	private handleInputChange = (event: any) => {
		this.setState({
			newMessage: event.target.value
		});
	};

	private renderMessageList = (): JSX.Element[] => {
		const items: JSX.Element[] = [];
		let index: number = 0;
		for (const message of this.state.messages) {
			index++;

			let bubbleClass = 'Bubble__Left';
			let bubbleDirection = '';
			let profilePicture = '';

			if (message.type === 0) {
				bubbleClass = 'Bubble__Right';
				bubbleDirection = 'Bubble__Direction__Reverse';
				profilePicture = this.props.patient.profilePicture;
			}

			const item = (
				<div key={index} className={classnames('Bubble__Container', bubbleDirection)}>
					<ImageWrapper className="Profile__Image" src={profilePicture} />
					<div className={classnames('Bubble', bubbleClass)}>
						<span className="Message__Text">{message.text}</span>
						<section style={{ textAlign: 'right' }}>
							<span className="Message__Time">{moment(message.formattedDate).format('HH:mm')}</span>
							<img className="Read__Status" src={message.read ? readImage : deliveredImage} />
						</section>
					</div>
				</div>
			);
			items.push(item);
		}
		return items;
	};
	public render() {
		return (
			<section className="PatientMessages__Main">
				{this.state.messages.length < 1 ? (
					<section className="Empty__Section">
						<Logo />
						<h1 className="Empty__Message">No Messages</h1>
						<h2 className="Empty__Detail">
							You have not chatted to this patient yet,
							<br />
							type a message below to get started!
						</h2>
					</section>
				) : (
					<section className="Message__List">{this.renderMessageList()}</section>
				)}
				<form className="New__Message" onSubmit={this.handleSubmit}>
					<input
						className="New__Message__Input"
						placeholder="Type a message"
						value={this.state.newMessage}
						onChange={this.handleInputChange}
					/>
				</form>
			</section>
		);
	}
}

export default PatientMessages;
