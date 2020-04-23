import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import CategoryItem from "./CategoryItem";

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
			<CategoryItem category="All" link="/" count={totalCount} />
			{group.map(category => (
				<CategoryItem
					category={category.fieldValue}
					link={`/category/${category.fieldValue}`}
					count={category.totalCount}
				/>
			))}
		</div>
	);
});

export default Categories;
