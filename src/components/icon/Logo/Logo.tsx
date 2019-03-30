import classnames from 'classnames';
import React from 'react';

import logoImage from '@assets/images/svg/logo.svg';

import './style.scss';

export interface LogoProps {
	className?: string;
	height?: string;
	width?: string;
}

const Logo = (props: LogoProps) => (
	<img
		className={classnames('Logo__Main', props.className)}
		style={{ width: props.width, height: props.height }}
		src={logoImage}
	/>
);

export default Logo;
