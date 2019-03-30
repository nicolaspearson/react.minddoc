import classnames from 'classnames';
import React from 'react';

import Loader from '@components/ui/Loader';

import './style.scss';

export interface PageProps {
	children?: any;
	className?: string;
	useLoader?: boolean;
	spinning?: boolean;
}

const Page = (props: PageProps) => (
	<div className={classnames('Page__Main', props.className)}>
		{props.useLoader ? <Loader spinning={props.spinning} /> : ''}
		{props.children}
	</div>
);

export default Page;
