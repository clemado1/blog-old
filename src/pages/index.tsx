import React, { useState } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import { Query } from "../graphql-types";
import Categories from "../components/Categories";
import PostList from "../components/PostList";

const LatestPostListQuery = graphql`
	query {
		allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
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
			<Categories />
			<PostList nodes={allMarkdownRemark.nodes} />
		</Layout>
	);
};

export default IndexPage;
