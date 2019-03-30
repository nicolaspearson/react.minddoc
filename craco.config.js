const WebpackBar = require('webpackbar');
const path = require('path');

module.exports = {
	babel: {
		plugins: [
			['@babel/plugin-proposal-decorators', { legacy: true }] // MobX
		]
	},
	jest: {
		configure: {
			moduleNameMapper: {
				'^@assets(.*)$': '<rootDir>/src/assets$1',
				'^@components(.*)$': '<rootDir>/src/components$1',
				'^@containers(.*)$': '<rootDir>/src/containers$1',
				'^@enums(.*)$': '<rootDir>/src/enums$1',
				'^@logger(.*)$': '<rootDir>/src/logger$1',
				'^@models(.*)$': '<rootDir>/src/models$1',
				'^@pages(.*)$': '<rootDir>/src/pages$1',
				'^@router(.*)$': '<rootDir>/src/router$1',
				'^@store(.*)$': '<rootDir>/src/store$1',
				'^@styles(.*)$': '<rootDir>/src/styles$1',
				'^@utils(.*)$': '<rootDir>/src/utils$1'
			}
		}
	},
	style: {
		modules: {
			localIdentName: ''
		},
		css: {
			loaderOptions: {
				/* Any css-loader configuration options: https://github.com/webpack-contrib/css-loader. */
			},
			loaderOptions: (cssLoaderOptions, { env, paths }) => {
				return cssLoaderOptions;
			}
		},
		sass: {
			loaderOptions: {
				/* Any sass-loader configuration options: https://github.com/webpack-contrib/sass-loader. */
			},
			loaderOptions: (sassLoaderOptions, { env, paths }) => {
				return sassLoaderOptions;
			}
		},
		postcss: {
			mode: 'extends' /* (default value) */ || 'file',
			plugins: [],
			env: {
				autoprefixer: {
					/* Any autoprefixer options: https://github.com/postcss/autoprefixer#options */
				},
				stage: 3 /* Any valid stages: https://cssdb.org/#staging-process. */,
				features: {
					/* Any CSS features: https://preset-env.cssdb.org/features. */
				}
			},
			loaderOptions: {
				/* Any postcss-loader configuration options: https://github.com/postcss/postcss-loader. */
			},
			loaderOptions: (postcssLoaderOptions, { env, paths }) => {
				return postcssLoaderOptions;
			}
		}
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
