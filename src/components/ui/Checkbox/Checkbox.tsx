import React from 'react';

import './style.scss';

export interface CheckboxProps {
	checked?: boolean;
	label: string;
	name: string;
	type?: string;
	onChange: (event: any) => void;
}

const Checkbox = (props: CheckboxProps) => (
	<label className="Checkbox__Main">
		{props.label}
		<input
			className="Checkbox__Input"
			type={props.type || 'checkbox'}
			name={props.name}
			checked={props.checked || false}
			onChange={props.onChange}
		/>
		<span className="CheckMark" />
	</label>
);

export default Checkbox;
