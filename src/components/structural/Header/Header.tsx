import { inject, observer } from 'mobx-react';
import * as React from 'react';

import Logo from '@components/icon/Logo';
import RouterLink from '@components/structural/RouterLink';
import SiteNav from '@components/structural/SiteNav';

import { RouteNames } from '@enums/RouteNames';

import { Flag } from '@models/Flag';

import { FlagStore } from '@store/FlagStore';

import { ReactComponent as Hamburger } from '@assets/images/svg/hamburger.svg';

import './style.scss';

export interface HeaderProps {
	children?: any;
	flagStore?: FlagStore;
}

@inject('flagStore')
@observer
class Header extends React.Component<HeaderProps> {
	private onToggleNav = (flags: Flag[]) => {
		if (this.props.flagStore) {
			if (flags.some((flag: Flag) => flag.name === 'site-nav.open')) {
				this.props.flagStore.deleteFlag('site-nav.open');
			} else {
				const newFlag: Flag = {
					name: 'site-nav.open'
				};
				this.props.flagStore.addFlag(newFlag);
			}
		}
	};

	private closeNav = () => {
		if (this.props.flagStore) {
			this.props.flagStore.deleteFlag('site-nav.open');
		}
	};

	public render() {
		const { flagStore } = this.props;
		return (
			<header>
				<section className="Header">
					<div className="Header__Background" />
					<div className="Header__Inner Top">
						<nav className="Header__Bar">
							<RouterLink routeName={RouteNames.HOME}>
								<div className="Header__Logo">
									<Logo />
								</div>
							</RouterLink>

							<div className="Header__Nav__Toggle">
								<span
									onClick={() => this.onToggleNav(flagStore ? flagStore.flags : [])}
									className="SiteNav__Hamburger"
								>
									<Hamburger />
								</span>
							</div>

							<SiteNav
								isOpen={
									flagStore && flagStore.flags.some((flag: Flag) => flag.name === 'site-nav.open')
								}
								closeNav={this.closeNav}
							/>
						</nav>
					</div>
					<div className="Header__Separator" />
					{this.props.children}
				</section>
			</header>
		);
	}
}

export default Header;
