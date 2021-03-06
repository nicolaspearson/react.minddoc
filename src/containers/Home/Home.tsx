import { inject, observer } from 'mobx-react';
import React from 'react';

import Logo from '@components/icon/Logo';
import Page from '@components/structural/Page';
import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import PatientListItem from '@components/ui/PatientListItem';
import PatientMessages from '@components/ui/PatientMessages';
import PatientProfile from '@components/ui/PatientProfile';
import Tab from '@components/ui/Tab';
import Tabs from '@components/ui/Tabs';

import OverflowMenu from '@containers/OverflowMenu';

import { FilterNames } from '@enums/FilterNames';
import { StoreNames } from '@enums/StoreNames';

import { Filter } from '@models/Filter';
import { Patient } from '@models/Patient';

import { FilterStore } from '@store/FilterStore';
import { PatientStore } from '@store/PatientStore';

import overflowImage from '@assets/images/svg/overflow.svg';
import refreshImage from '@assets/images/svg/refresh.svg';

import './style.scss';

export interface HomeProps {
	filterStore?: FilterStore;
	patientStore?: PatientStore;
}

interface State {
	initialLoad: boolean;
	searchInputValue: string;
	selectedPatient?: Patient;
	showOverflowMenu: boolean;
}

@inject(StoreNames.FILTER, StoreNames.PATIENT)
@observer
class Home extends React.Component<HomeProps, State> {
	public state: State = {
		initialLoad: true,
		searchInputValue: '',
		selectedPatient: undefined,
		showOverflowMenu: false
	};

	public async componentDidMount() {
		await this.loadData();
		if (this.props.filterStore) {
			this.props.filterStore.buildFilters();
		}
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

	private handleOverflowClick = async () => {
		this.setState({ showOverflowMenu: true });
	};

	private renderOverflowMenu = (): JSX.Element => {
		return (
			<div className="OverflowMenu__Container">
				<OverflowMenu
					onCloseOverflowMenu={() => this.setState({ showOverflowMenu: false })}
					onFilterChange={() => {
						// TODO: Re-render component
					}}
				/>
			</div>
		);
	};

	private handleSearchInputChange = (event: any) => {
		this.setState({ searchInputValue: event.target.value });
	};

	private handlePatientSelected = (patient: Patient) => {
		this.setState({ selectedPatient: patient });
	};

	private selectFirstPatient = () => {
		if (this.props.patientStore && this.props.patientStore.dataList.length > 0) {
			this.handlePatientSelected(this.props.patientStore.dataList[0]);
		}
	};

	private getStoreFilters(): Filter[] {
		const { filterStore } = this.props;
		// Get the filters from the store
		if (filterStore) {
			return filterStore.getFilters();
		}
		return [];
	}

	private filterBySearch(patients: Patient[]) {
		return patients.filter(
			(patient) =>
				patient.firstName.toUpperCase().indexOf(this.state.searchInputValue.toUpperCase()) > -1
		);
	}

	private filterByLinked(patients: Patient[]) {
		const foundFilter: Filter | undefined = this.getStoreFilters().find(
			(filter) => filter.name === FilterNames.LINKED
		);
		if (foundFilter && foundFilter.isChecked) {
			return patients.filter((patient) => patient.linked === true);
		}
		return patients;
	}

	private filterByOnline(patients: Patient[]) {
		const foundFilter: Filter | undefined = this.getStoreFilters().find(
			(filter) => filter.name === FilterNames.ONLINE
		);
		if (foundFilter && foundFilter.isChecked) {
			return patients.filter((patient) => patient.online === true);
		}
		return patients;
	}

	private filterByUnread(patients: Patient[]) {
		const foundFilter: Filter | undefined = this.getStoreFilters().find(
			(filter) => filter.name === FilterNames.UNREAD
		);
		if (foundFilter && foundFilter.isChecked) {
			return patients.filter((patient) => patient.lastUnreadMessage !== undefined);
		}
		return patients;
	}

	private renderPatientListItems = (): JSX.Element[] => {
		const items: JSX.Element[] = [];
		if (this.props.patientStore) {
			// Apply filters
			let filteredPatients: Patient[] = this.filterBySearch(this.props.patientStore.dataList);
			filteredPatients = this.filterByLinked(filteredPatients);
			filteredPatients = this.filterByOnline(filteredPatients);
			filteredPatients = this.filterByUnread(filteredPatients);

			let index: number = 0;
			for (const patient of filteredPatients) {
				index++;
				const item: JSX.Element = (
					<PatientListItem
						key={index}
						patient={patient}
						onClick={this.handlePatientSelected}
						isActive={
							this.state.selectedPatient &&
							this.state.selectedPatient.insuranceNumber === patient.insuranceNumber
								? true
								: false
						}
					/>
				);
				items.push(item);
			}
		}
		return items;
	};

	public render() {
		const patientListItems: JSX.Element[] = [];
		if (this.props.patientStore) {
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
									className="Header__Button"
									src={refreshImage}
									onClick={this.handleRefreshClick}
								/>
								<img
									className="Header__Button"
									src={overflowImage}
									onClick={this.handleOverflowClick}
								/>
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
						{!this.state.selectedPatient ? (
							<section className="Empty__Section">
								<Logo />
								<h1 className="Empty__Message">Welcome</h1>
								<h2 className="Empty__Detail">
									Select a patient from the section on the left
									<br />
									hand side to view their profile, and messages.
								</h2>
								<br />
								<Button className="Empty__Button" primary={true} onClick={this.selectFirstPatient}>
									Got it!
								</Button>
							</section>
						) : (
							<section>
								<Tabs>
									<Tab label="Profile">
										<PatientProfile patient={this.state.selectedPatient} />
									</Tab>
									<Tab label="Messages">
										<PatientMessages patient={this.state.selectedPatient} />
									</Tab>
								</Tabs>
							</section>
						)}
					</section>
					{this.state.showOverflowMenu ? this.renderOverflowMenu() : undefined}
				</Card>
			</Page>
		);
	}
}

export default Home;
