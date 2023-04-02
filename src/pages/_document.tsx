import Document, { Head, Html, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {

	static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App: any) => (props) =>
						sheet.collectStyles(<App {...props} />),
				});

			// ******* temporary hack to stop missing array `Keys` warning *******
			const initialProps = await Document.getInitialProps(ctx);
			const o = <>{initialProps.styles}{sheet.getStyleElement()}</>;
			const oCopy = {...o};
			oCopy.key = 0;
			const styleArray = [
				oCopy
			];

			return {
				...initialProps,
				styles: styleArray,
			};

		} finally {
			sheet.seal()
		}
	};

	render() {
		return (
			<Html lang="en">
				<Head></Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	};
};
