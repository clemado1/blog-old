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
			<div className="md:w-24 mx-auto md:mx-0 md:mr-6 text-center">
				<Image
					className="rounded-full "
					fixed={file.childImageSharp.fixed}
					alt="profile"
				/>
			</div>
		</div>
	);
});

Profile.displayName = "Profile";

export default Profile;
