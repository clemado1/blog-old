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
		<ul>
			<li>
				<Link to="/">All({totalCount})</Link>
			</li>
			{group.map(category => (
				<li className="">
					<Link to="/">
						{category.fieldValue}({category.totalCount})
					</Link>
				</li>
			))}
		</ul>
	);
});

export default Categories;
