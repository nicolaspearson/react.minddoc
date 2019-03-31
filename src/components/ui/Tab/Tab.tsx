import classnames from 'classnames';
import React from 'react';

import './style.scss';

export interface TabProps {
	activeTab?: string;
	label: string;
	onClick?: (label: string) => void;
}

class Tab extends React.Component<TabProps> {
	private handleOnClick = () => {
		const { label } = this.props;
		if (this.props.onClick) {
			this.props.onClick(label);
		}
	};

	public render() {
		const { activeTab, label } = this.props;

		return (
			<li
				className={classnames('Tab__List__Item', {
					Tab__Item__Active: activeTab === label
				})}
				onClick={this.handleOnClick}
			>
				{label}
			</li>
		);
	}
}

export default Tab;
