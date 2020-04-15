import { CreatePagesArgs } from "gatsby";
import path from "path";
import { Query } from "../graphql-types";

const pages = [
	{ id: 1, content: "11" },
	{ id: 2, content: "22" },
	{ id: 3, content: "33" },
];

export async function createPages({ actions, graphql }: CreatePagesArgs) {
	const { createPage } = actions;

	const { data, errors } = await graphql<Query>(`
		{
			allMarkdownRemark {
				edges {
					node {
						html
						frontmatter {
							title
							path
							date
						}
					}
				}
			}
		}
	`);

	if (errors) {
		throw errors;
	}

	data.allMarkdownRemark.edges.forEach(({ node }: any) => {
		createPage({
			path: node.frontmatter.path,
			context: {
				html: node.html,
				title: node.frontmatter.title,
				date: node.frontmatter.date,
			},
			component: path.resolve(__dirname, "../templates/PostTemplate.tsx"),
		});
	});
}
