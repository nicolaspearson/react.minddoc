const WebpackBar = require('webpackbar');
const path = require('path');

module.exports = {
	babel: {
		plugins: [
			['@babel/plugin-proposal-decorators', { legacy: true }] // MobX
		]
	},
	devServer: {
		// Redirect request when using the dev server in order to avoid CORS issues
		proxy: {
			'/api/v1/**': {
				target: 'https://takeshi.minddoc.com',
				secure: false,
				changeOrigin: true
			}
		}
	},
	webpack: {
		alias: {
			'@api': path.resolve(__dirname, 'src/api'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@containers': path.resolve(__dirname, 'src/containers'),
			'@enums': path.resolve(__dirname, 'src/enums'),
			'@logger': path.resolve(__dirname, 'src/logger'),
			'@models': path.resolve(__dirname, 'src/models'),
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
