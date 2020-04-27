import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/Seo";
import Profile from "../components/Profile";
import Categories from "../components/Categories";
import PostList from "../components/PostList";
import { IPostListContext, ITemplateProps } from "../interfaces";

type IPostListTemplateProps = ITemplateProps<IPostListContext>;

const PostListTemplate: React.FC<IPostListTemplateProps> = React.memo(props => {
	const { category, nodes } = props.pageContext;
	return (
		<Layout>
			<Profile />
			<Categories />
			<PostList nodes={nodes} />
		</Layout>
	);
});

export default PostListTemplate;
