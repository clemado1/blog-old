import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

interface IHeaderProps {
	siteTitle: string;
}

const Header: React.FC<IHeaderProps> = ({ siteTitle }) => (
	<header className="bg-white mb-3 shadow-md lg:pl-10 xl:pl-10">
		<div className="py-2 px-6 max-w-5xl">
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
