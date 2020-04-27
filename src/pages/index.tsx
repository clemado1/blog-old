import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/Seo";
import { Query } from "../graphql-types";
import Categories from "../components/Categories";
import PostList from "../components/PostList";
import Profile from "../components/Profile";

const LatestPostListQuery = graphql`
	query {
		allMarkdownRemark(
			sort: { order: DESC, fields: frontmatter___date }
			filter: { frontmatter: { type: { eq: "post" } } }
		) {
			nodes {
				excerpt(truncate: true, pruneLength: 200)
				frontmatter {
					title
					category
					path
					date(formatString: "MMMM Do, YYYY")
				}
				id
			}
		}
	}
`;

const IndexPage: React.FC = () => {
	const { allMarkdownRemark } = useStaticQuery<Query>(LatestPostListQuery);
	return (
		<Layout>
			<SEO title="Home" lang="" />
			<Profile />
			<Categories />
			<PostList nodes={allMarkdownRemark.nodes} />
		</Layout>
	);
};

export default IndexPage;
