const WebpackBar = require('webpackbar');
const path = require('path');

module.exports = {
	babel: {
		plugins: [
			['@babel/plugin-proposal-decorators', { legacy: true }] // MobX
		]
	},
	webpack: {
		alias: {
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@containers': path.resolve(__dirname, 'src/containers'),
			'@enums': path.resolve(__dirname, 'src/enums'),
			'@logger': path.resolve(__dirname, 'src/logger'),
			'@models': path.resolve(__dirname, 'src/models'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@router': path.resolve(__dirname, 'src/router'),
			'@store': path.resolve(__dirname, 'src/store'),
			'@styles': path.resolve(__dirname, 'src/styles'),
			'@utils': path.resolve(__dirname, 'src/utils/')
		},
		plugins: [
			new WebpackBar({ profile: true }),
			...(process.env.NODE_ENV === 'development' ? [] : [])
		]
	}
};
