import { inject, observer } from 'mobx-react';
import React from 'react';

import Logo from '@components/icon/Logo';
import Page from '@components/structural/Page';
import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import PatientListItem from '@components/ui/PatientListItem';

import { StoreNames } from '@enums/StoreNames';

import { PatientStore } from '@store/PatientStore';

import overflowImage from '@assets/images/svg/overflow.svg';

import refreshImage from '@assets/images/svg/refresh.svg';

import './style.scss';

export interface HomeProps {
	patientStore?: PatientStore;
}

interface State {
	initialLoad: boolean;
	searchInputValue: string;
}

@inject(StoreNames.PATIENT)
@observer
class Home extends React.Component<HomeProps, State> {
	public state: State = {
		initialLoad: true,
		searchInputValue: ''
	};

	public async componentDidMount() {
		await this.loadData();
	}

	private loadData = async () => {
		if (this.props.patientStore) {
			await this.props.patientStore.fetchPatientStatusList();
		}
	};

	private handleRefreshClick = async () => {
		this.setState({ initialLoad: false });
		await this.loadData();
	};

	private handleSearchInputChange = (event: any) => {
		this.setState({ searchInputValue: event.target.value });
	};

	private renderPatientListItems = (): JSX.Element[] => {
		const items: JSX.Element[] = [];
		if (this.props.patientStore) {
			let index: number = 0;
			const filteredPatients = this.props.patientStore.dataList.filter(
				(patient) =>
					patient.firstName.toUpperCase().indexOf(this.state.searchInputValue.toUpperCase()) > -1
			);
			for (const patient of filteredPatients) {
				index++;
				const item: JSX.Element = <PatientListItem key={index} patient={patient} />;
				items.push(item);
			}
		}
		return items;
	};

	public render() {
		const patientListItems: JSX.Element[] = [];
		if (this.props.patientStore && !this.props.patientStore.loading) {
			patientListItems.push(...this.renderPatientListItems());
		}
		return (
			<Page
				className="Home__Main"
				useLoader={true}
				loaderTheme={!this.state.initialLoad ? 'light' : 'dark'}
				spinning={this.props.patientStore && this.props.patientStore.loading ? true : false}
			>
				<Card className="Home__Card">
					<section className="Content__Left">
						<section className="Header__Section">
							<div className="Header__Content__Container">
								<Logo className="Header__Logo" />
								<img
									className="Refresh__Button"
									src={refreshImage}
									onClick={this.handleRefreshClick}
								/>
								<img className="Overflow__Button" src={overflowImage} />
							</div>
						</section>
						<section className="Search__Section">
							<div className="Search__Input__Container">
								<input
									className="Search__Input"
									type="text"
									placeholder="Search for a patient"
									onChange={this.handleSearchInputChange}
									value={this.state.searchInputValue}
								/>
							</div>
						</section>
						<section className="PatientList__Section">
							<div className="PatientList__Content__Container">{patientListItems}</div>
						</section>
					</section>
					<section className="Content__Right">
						<section className="Empty__Section">
							<Logo />
							<h1 className="Empty__Message">Welcome</h1>
							<h2 className="Empty__Detail">
								Select a patient from the section on the left
								<br />
								hand side to view their profile, and messages.
							</h2>
							<br />
							<Button className="Empty__Button" primary={true}>
								Got it!
							</Button>
						</section>
					</section>
				</Card>
			</Page>
		);
	}
}

export default Home;
