import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

const Header = ({ siteTitle }) => (
	<header className="bg-white mb-8 shadow-md lg:pl-10 xl:pl-10">
		<div
			style={{
				maxWidth: 960,
				padding: `0.5rem 1.5rem`,
			}}
		>
			<h1 className="m-0">
				<Link
					to="/"
					className="text-lg royal-300 no-underline font-black"
				>
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
