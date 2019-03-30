import { inject, observer } from 'mobx-react';
import React from 'react';

import Logo from '@components/icon/Logo';
import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import { RouteNames } from '@enums/RouteNames';
import { RouterStore } from '@store/RouterStore';

import './style.scss';
export interface ErrorBoundaryProps {
	children?: any;
	routerStore?: RouterStore;
}

interface State {
	hasError: boolean;
}

@inject('routerStore')
@observer
class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
	public state: State = {
		hasError: false
	};

	constructor(props: ErrorBoundaryProps, context: any) {
		super(props, context);
		this.onHomeClick = this.onHomeClick.bind(this);
	}

	public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		this.setState({
			hasError: true
		});
	}

	public onHomeClick() {
		if (this.props.routerStore) {
			this.props.routerStore.navigate(
				{ name: RouteNames.HOME },
				{ force: true, reload: true, replace: true }
			);
			return true;
		}
		return false;
	}

	public render() {
		if (this.state.hasError) {
			return (
				<section className="Error__Main">
					<Card>
						<Logo />
						<h1 className="Error__Message">
							Oh no!
							<br />
							We are terribly sorry, something went wrong!
						</h1>
						<h2 className="Error__Detail">
							We have logged the issue and have already started working on a solution!
						</h2>
						<br />
						<Button className="CTA__Button" onClick={this.onHomeClick}>
							Take me home
						</Button>
					</Card>
				</section>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
