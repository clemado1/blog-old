import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";

const profileImgQuery = graphql`
	query {
		site {
			siteMetadata {
				title
				author
				interest
			}
		}
		file(relativePath: { eq: "clemado1.png" }) {
			childImageSharp {
				fixed(width: 100, height: 100) {
					base64
					width
					height
					src
					srcSet
				}
			}
		}
	}
`;

const Profile: React.FC = React.memo(() => {
	const { site, file } = useStaticQuery(profileImgQuery);

	return (
		<div className="md:flex rounded-lg p-6">
			<div className="text-center md:text-left">
				<h2 className="text-lg text-gray-800 font-semibold">
					{site.siteMetadata.author}
				</h2>
				<div className="royal-300 text-sm font-medium">Developer</div>
				<div className="text-gray-700 text-xs">이것 저것 함</div>
				<div className="text-gray-700 text-xs leading-snug">
					Interested in
					{site.siteMetadata.interest.map(item => (
						<span className="inline-block bg-gray-200 rounded-sm px-1 mb-1 text-xs text-gray-700 ml-2">
							{item}
						</span>
					))}
				</div>
			</div>
		</div>
	);
});

Profile.displayName = "Profile";

export default Profile;
