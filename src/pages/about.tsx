import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/Seo";
import { useStaticQuery, graphql } from "gatsby";
import { Query } from "../graphql-types";

const AboutMarkdown = graphql`
	query {
		allMarkdownRemark(filter: { frontmatter: { type: { eq: "about" } } }) {
			edges {
				node {
					html
					frontmatter {
						title
						path
						date(formatString: "MMMM Do, YYYY")
					}
				}
			}
		}
	}
`;

const IndexPage: React.FC = () => {
	const data = useStaticQuery<Query>(AboutMarkdown);
	const post = data.allMarkdownRemark.edges;
	const about = post.map(({ node }) => node)[0];

	return (
		<Layout>
			<SEO title="About" lang="" />
			<div
				className="pb-20"
				dangerouslySetInnerHTML={{ __html: about.html }}
			/>
		</Layout>
	);
};

export default IndexPage;
