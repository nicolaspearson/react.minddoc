import React from 'react';

import Logo from '@components/icon/Logo';
import Page from '@components/structural/Page';
import Button from '@components/ui/Button';
import Card from '@components/ui/Card';

import overflowImage from '@assets/images/svg/overflow.svg';
import placeholderImage from '@assets/images/svg/placeholder.svg';
import refreshImage from '@assets/images/svg/refresh.svg';

import './style.scss';

interface State {
	loading: boolean;
}

class Home extends React.Component<{}, State> {
	public state: State = {
		loading: true
	};

	public componentDidMount() {
		setTimeout(() => {
			this.setState({
				loading: false
			});
		}, 1000);
	}

	public render() {
		return (
			<Page className="Home__Main" useLoader={true} spinning={this.state.loading}>
				<Card className="Home__Card">
					<section className="Content__Left">
						<section className="Header__Section">
							<div className="Header__Content__Container">
								<Logo className="Header__Logo" />
								<img className="Refresh__Button" src={refreshImage} />
								<img className="Overflow__Button" src={overflowImage} />
							</div>
						</section>
						<section className="Search__Section">
							<div className="Search__Input__Container">
								<input className="Search__Input" type="text" placeholder="Search for a user" />
							</div>
						</section>
						<section className="Patient__Section">
							<div className="Patient__Content__Container">
								<div className="Patient__Item">
									<div className="Image__Container">
										<img className="Image" src={placeholderImage} />
									</div>
									<div className="Text__Container">
										<label className="Patient__Name">Nic</label>
										<label className="Last__Message">
											Hey there, I am going to type a long message here to make sure everything
											works as expected.
										</label>
									</div>
									<div className="Time__Container">
										<label className="Time">15:46</label>
									</div>
								</div>
							</div>
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
							<Button className="Empty__Button">Got it!</Button>
						</section>
					</section>
				</Card>
			</Page>
		);
	}
}

export default Home;
