import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import { Query } from "../graphql-types";
import Categories from "../templates/Categories";

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
			<SEO title="Home" lang="" />
			<h2 className="text-xl mb-5">Latest Posts</h2>
			<hr />
			<Categories />
			<ul>
				{data.allMarkdownRemark.edges.map(({ node }) => (
					<li key={node.id} className="p-5 hover:bg-gray-100">
						<Link to={node.frontmatter.path}>
							<h4 className="text-lg font-bold royal-500">
								{node.frontmatter.title}
							</h4>
							<h6 className="text-xs royal-400">
								{node.frontmatter.date}
							</h6>
							<p className="text-base">{node.excerpt}</p>
						</Link>
					</li>
				))}
			</ul>
		</Layout>
	);
};

export default IndexPage;
