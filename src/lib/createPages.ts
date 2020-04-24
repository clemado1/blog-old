import { CreatePagesArgs } from "gatsby";
import path from "path";
import { Query } from "../graphql-types";
import { IPostListContext } from "../interfaces";

export async function createPages({ actions, graphql }: CreatePagesArgs) {
	const { createPage } = actions;

	const { data, errors } = await graphql<any>(`
		{
			allPostsByCategory: allMarkdownRemark(
				sort: { order: DESC, fields: frontmatter___date }
			) {
				group(field: frontmatter___category) {
					fieldValue
					nodes {
						id
						excerpt(truncate: true, pruneLength: 200)
						frontmatter {
							title
							category
							path
							date(formatString: "MMMM Do, YYYY")
						}
					}
				}
			}

			allMarkdownRemark {
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

	data.allPostsByCategory.group.forEach(({ fieldValue, nodes }) => {
		const postPath = `category/${fieldValue}`;
		const category = fieldValue;

		createPage<IPostListContext>({
			path: postPath,
			context: {
				postPath,
				category,
				nodes,
			},
			component: path.resolve(
				__dirname,
				"../templates/PostListTemplate.tsx",
			),
		});
	});
}
