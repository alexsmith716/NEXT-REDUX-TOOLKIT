import * as Styles from './styles';

export default function Footer() {
	return (
		<Styles.FooterStyled data-testid="footer-component">
			<div className="container">
				<Styles.FooterContainer className="flex-column align-items-center pt-4 pb-4">
					<div className="flex-row align-items-center">
						<Styles.FooterHeadphones>
							<Styles.StyledSvgHeadphones fill="#ffffff" />
						</Styles.FooterHeadphones>
						<Styles.SvgFooterHeadphones>Footer Headphones</Styles.SvgFooterHeadphones>
					</div>

					<Styles.FooterSource
						onClick={() => {
							window.open('https://github.com/alexsmith716/NEXT-TS-PYTHON', '_blank');
						}}
					>
						The Project&apos;s Source Code
					</Styles.FooterSource>

					<Styles.FooterBlurb>Don&apos;t Forget To Vote!</Styles.FooterBlurb>
					<div>Copyright &copy; {new Date().getFullYear()} · Alex Smith&apos;s App</div>
				</Styles.FooterContainer>
			</div>
		</Styles.FooterStyled>
	)
}
