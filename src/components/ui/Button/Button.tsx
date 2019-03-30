import classnames from 'classnames';
import * as React from 'react';

import './style.scss';

export interface ButtonProps {
	children?: any;
	className?: string;
	primary?: boolean;
	style?: React.CSSProperties;
	onClick?: (event: React.FormEvent) => void;
}

const Button = (props: ButtonProps) => {
	const { primary } = props;
	return (
		<button
			className={classnames('Button__Main', props.className, {
				Primary__Button: primary
			})}
			style={props.style}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};

export default Button;
