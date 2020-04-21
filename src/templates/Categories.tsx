import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { Query } from "../graphql-types";

const DistinctCategories = graphql`
	query {
		allMarkdownRemark {
			totalCount
			group(field: frontmatter___category) {
				totalCount
				fieldValue
			}
		}
	}
`;

const Categories: React.FC = React.memo(() => {
	const {
		allMarkdownRemark: { totalCount, group },
	} = useStaticQuery(DistinctCategories);
	return (
		<div className="ml-3 my-3">
			<Link to="/">
				<span className="inline-block bg-gray-200 hover:bg-gray-300 rounded-full px-3 text-xs font-semibold royal-300 mr-2">
					All <span className="font-medium">({totalCount})</span>
				</span>
			</Link>
			{group.map(category => (
				<Link to="/">
					<span className="inline-block bg-gray-200 hover:bg-gray-300 rounded-full px-3 text-xs font-semibold royal-300 mr-2">
						{category.fieldValue}{" "}
						<span className="font-medium">
							({category.totalCount})
						</span>
					</span>
				</Link>
			))}
		</div>
	);
});

export default Categories;
