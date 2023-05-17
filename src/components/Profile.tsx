import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image"

const profileImgQuery = graphql`
	query {
		site {
			siteMetadata {
				title
				author {
				  name
				  summary
				}
				interest
			}
		}
	}
`;

const Profile: React.FC = React.memo(() => {
	const { site } = useStaticQuery(profileImgQuery);
	const interests = site.siteMetadata.interest;

	return (
		<div className="md:flex rounded-lg p-6">
			<div className="md:w-24 mx-auto md:mx-0 md:mr-6 text-center">
			<StaticImage
				className="rounded-full "
				layout="fixed"
				formats={["auto", "webp", "avif"]}
				src="../../assets/clemado1.png"
				width={100}
				height={100}
				quality={95}
				alt="Profile picture"
			/>
			</div>
			<div className="text-center md:text-left">
				<Link to="/about">
					<div className="text-lg text-gray-800 font-semibold">
						{site.siteMetadata.author.name}
					</div>
				</Link>
				<div className="royal-300 text-base font-medium">Developer</div>
				<div className="text-gray-700 text-sm">
					이것 저것 함<br />
					Interested in{" "}
					{interests.map(item => (
						<span className="pr-1 underline">{item}</span>
					))}
				</div>
			</div>
		</div>
	);
});

Profile.displayName = "Profile";

export default Profile;
