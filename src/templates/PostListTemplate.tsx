import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Categories from "../components/Categories";
import PostList from "../components/PostList";
import { IPostListContext, ITemplateProps } from "../interfaces";

type IPostListTemplateProps = ITemplateProps<IPostListContext>;

const PostListTemplate: React.FC<IPostListTemplateProps> = React.memo(props => {
	const { postPath, nodes } = props.pageContext;
	return (
		<Layout>
			<SEO title="" lang="" />
			<Categories />
			<PostList nodes={nodes} />
		</Layout>
	);
});

export default PostListTemplate;
