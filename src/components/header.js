import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

const Header = ({ siteTitle }) => (
	<header
		style={{
			background: `#000A80`,
			marginBottom: `1.45rem`,
		}}
	>
		<div
			style={{
				maxWidth: 960,
				padding: `0.5rem 1.5rem`,
			}}
		>
			<h1 style={{ margin: 0 }}>
				<Link to="/" className="text-xl text-white no-underline">
					{siteTitle}
				</Link>
			</h1>
		</div>
	</header>
);

Header.propTypes = {
	siteTitle: PropTypes.string,
};

Header.defaultProps = {
	siteTitle: ``,
};

export default Header;
