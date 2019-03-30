import React from 'react';

import './style.scss';

const Footer = () => (
	<footer className="Footer">
		<div className="Footer__Content">{`v. ${process.env.REACT_APP_VERSION}`}</div>
	</footer>
);

export default Footer;
