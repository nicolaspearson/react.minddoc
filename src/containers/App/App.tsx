import React from 'react';

import Logo from '@components/icon/Logo';
import Button from '@components/ui/Button';

class App extends React.Component {
	public render() {
		return (
			<section>
				<Button>Normal Button</Button>
				<Button primary={true}> Primary Button</Button>
				<Logo />
			</section>
		);
	}
}

export default App;
