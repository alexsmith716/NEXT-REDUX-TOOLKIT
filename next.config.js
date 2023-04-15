module.exports = {
	compiler: {
		styledComponents: true,
	},
	reactStrictMode: true,
	env: {},

	experimental: {
		appDir: true,
	},

	async rewrites() {
		const env = process.env.NODE_ENV;
		return {
			beforeFiles: [
				{
					source: '/todosapi/:path*',
					destination: `${ env === 'development' ? 'http://localhost:8000' : '' }` + '/todosapi/:path*'
				},
				{
					source: '/fibonacci/:path*',
					destination: `${ env === 'development' ? 'http://localhost:8000' : '' }` + '/fibonacci/:path*'
				},
				{
					source: '/nyccounty/:path*',
					destination: `${ env === 'development' ? 'http://localhost:8000' : '' }` + '/nyccounty/:path*'
				},
				{
					source: '/botosssgetobject/:path*',
					destination: `${ env === 'development' ? 'http://localhost:8000' : '' }` + '/botosssgetobject/:path*'
				},
			],
		};
	},
};
