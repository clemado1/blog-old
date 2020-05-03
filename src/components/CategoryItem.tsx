import React from "react";
import { Link } from "gatsby";

interface ICategoryItemProp {
	category: string;
	link: string;
	count: number;
}

const CategorieItem: React.FC<ICategoryItemProp> = React.memo(
	({ category, link, count }) => {
		return (
			<Link
				to={link}
				activeStyle={{ color: "white" }}
				activeClassName="royal-bg-300 royal-hv-300"
				className="inline-block bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold royal-300 mr-2"
			>
				<span>#{category}</span>
			</Link>
		);
	},
);

export default CategorieItem;
