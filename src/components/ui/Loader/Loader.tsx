import classnames from 'classnames';
import React from 'react';

import './style.scss';

export interface LoaderProps {
	fullscreen?: boolean;
	loaderTheme?: 'dark' | 'light';
	spinning?: boolean;
}

const Loader = (props: LoaderProps) => {
	return (
		<div
			className={classnames(
				'Loader__Main',
				props.loaderTheme === 'light' ? 'Theme__Loader__Light' : 'Theme__Loader__Dark',
				{
					Loader__Hidden: !props.spinning,
					Loader__Fullscreen: props.fullscreen
				}
			)}
		>
			<div className="Loader__Wrapper">
				<div className="Loader__Inner" />
				<div className="Loader__Text">LOADING</div>
			</div>
		</div>
	);
};

export default Loader;
