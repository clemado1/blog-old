import React, { memo } from "react";
import { Link } from "gatsby";
import { IPostListContext } from "../interfaces";

type IPostListProps = Pick<IPostListContext, "nodes">;

const PostLIst: React.FC<IPostListProps> = React.memo(({ nodes }) => {
	return (
		<ul>
			{nodes.map(
				({ id, excerpt, frontmatter: { title, path, date } }) => (
					<li key={id} className="p-5 hover:bg-gray-100">
						<Link to={path}>
							<h4 className="text-lg font-bold royal-500">
								{title}
							</h4>
							<h6 className="text-xs royal-400">{date}</h6>
							<p className="text-base">{excerpt}</p>
						</Link>
					</li>
				),
			)}
		</ul>
	);
});

PostLIst.displayName = "PostList";

export default PostLIst;
