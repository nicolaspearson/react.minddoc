import React from 'react';

import Tab from '@components/structural/Tab';

import './style.scss';

export interface TabsProps {
	children: any;
}

interface State {
	activeTab: string;
}

class Tabs extends React.Component<TabsProps, State> {
	public state: State = {
		activeTab: ''
	};

	constructor(props: TabsProps) {
		super(props);
		this.state = {
			activeTab: this.props.children[0].props.label
		};
	}

	private handleOnTabItemClick = (tab: string) => {
		this.setState({ activeTab: tab });
	};

	private renderTabList = (): JSX.Element[] => {
		const items: JSX.Element[] = [];
		const { activeTab } = this.state;
		let index: number = 0;
		for (const child of this.props.children) {
			index++;
			const { label } = child.props;
			const item: JSX.Element = (
				<Tab key={index} activeTab={activeTab} label={label} onClick={this.handleOnTabItemClick} />
			);
			items.push(item);
		}
		return items;
	};

	private renderTabContent = (): any => {
		let childItems: any;
		const { activeTab } = this.state;
		for (const child of this.props.children) {
			if (child.props.label === activeTab) {
				childItems = child.props.children;
				break;
			}
		}
		return childItems;
	};

	public render() {
		return (
			<div className="Tabs__Main">
				<ol className="Tab__List">{this.renderTabList()}</ol>
				<div className="Tab__Content">{this.renderTabContent()}</div>
			</div>
		);
	}
}

export default Tabs;
