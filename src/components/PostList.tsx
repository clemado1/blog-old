import React, { memo } from "react";
import { Link } from "gatsby";
import { IPostListContext } from "../interfaces";

type IPostListProps = Pick<IPostListContext, "nodes">;

const PostLIst: React.FC<IPostListProps> = React.memo(({ nodes }) => {
	return (
		<ul>
			{nodes.map(
				({ id, excerpt, frontmatter: { title, path, date } }) => (
					<Link to={path}>
						<li key={id} className="p-5 hover:bg-gray-100">
							<div className="text-lg font-bold royal-500">
								{title}
							</div>
							<div className="text-sm royal-400">{date}</div>
							<p className="text-base pt-2">{excerpt}</p>
						</li>
					</Link>
				),
			)}
		</ul>
	);
});

PostLIst.displayName = "PostList";

export default PostLIst;
