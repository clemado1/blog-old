import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import { Query } from "../graphql-types";

const LatestPostListQuery = graphql`
	query {
		allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
			edges {
				node {
					excerpt(truncate: true, pruneLength: 200)
					frontmatter {
						title
						path
						date(formatString: "YYYY-MM-DD HH:mm:ss")
					}
					id
				}
			}
		}
	}
`;

const IndexPage: React.FC = () => {
	const data = useStaticQuery<Query>(LatestPostListQuery);
	return (
		<Layout>
			<SEO title="Home" />
			<h2>Latest Posts</h2>
			<ul>
				{data.allMarkdownRemark.edges.map(({ node }) => (
					<li key={node.id}>
						<h3>
							<Link to={node.frontmatter.path}>
								{node.frontmatter.title}
							</Link>
						</h3>
						<span>{node.frontmatter.date}</span>
						<p>{node.excerpt}</p>
						<hr />
					</li>
				))}
			</ul>
		</Layout>
	);
};

export default IndexPage;
