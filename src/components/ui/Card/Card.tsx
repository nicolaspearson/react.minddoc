import classnames from 'classnames';
import React from 'react';

import './style.scss';

export interface CardProps {
	children?: any;
	className?: string;
}

const Card = (props: CardProps) => {
	return <section className={classnames('Card__Main', props.className)}>{props.children}</section>;
};

export default Card;
