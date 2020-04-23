import { ReplaceComponentRendererArgs } from "gatsby";
import { MarkdownRemark } from "../graphql-types.d";

export type ITemplateProps<T> = ReplaceComponentRendererArgs["props"] & {
	pageContext: {
		isCreatedByStatefulCreatePages: boolean;
	} & T;
};

export interface IPostListContext {
	postPath: string;
	category: string;
	nodes: Array<Pick<MarkdownRemark, "frontmatter" | "excerpt" | "id">>;
}
