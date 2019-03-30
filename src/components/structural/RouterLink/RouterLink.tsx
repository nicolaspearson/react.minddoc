import { inject, observer } from 'mobx-react';
import React from 'react';

import { RouterStore } from '@store/RouterStore';

import './style.scss';

export interface RouterLinkProps {
	children?: React.ReactNode;
	routeName: string;
	routerStore?: RouterStore;
	style?: React.CSSProperties;
}

@inject('routerStore')
@observer
class RouterLink extends React.Component<RouterLinkProps> {
	private onRouterLinkClick = (event: React.MouseEvent) => {
		if (event) {
			event.preventDefault();
		}
		if (this.props.routerStore) {
			this.props.routerStore.navigate({ name: this.props.routeName });
		}
	};

	public render() {
		return (
			<span className="RouterLink__Main" style={this.props.style} onClick={this.onRouterLinkClick}>
				{this.props.children}
			</span>
		);
	}
}

export default RouterLink;
