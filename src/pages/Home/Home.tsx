import { Link } from "react-router-dom";
// Components
import Page from "../../components/layout/Page/Page";
import NotSignedIn from "../../features/auth/components/layout/NotSignedIn/NotSignedIn";
import SignedIn from "../../features/auth/components/layout/SignedIn/SignedIn";
import Text from "../../components/ui/Text/Text";
import Button from "../../components/ui/Button/Button";
import Card from "../../components/ui/Card/Card";
import Section from "../../components/layout/Section/Section";
import FlexContainer from "../../components/layout/FlexContainer/FlexContainer";
import IconTextSection from "../../components/layout/IconTextSection/IconTextSection";
// Hooks
import useUser from "../../contexts/UserContext/useUser";
// Functions
import signOut from "../../features/auth/services/signOut";
// CSS
import "./Home.css";
import {
	faArrowsRotate,
	faChartSimple,
	faListCheck,
	faPlus,
	faRobot,
	faSearch,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import SubscriptionMissingAlert from "../../features/subscription/components/ui/SubscriptionMissingAlert/SubscriptionMissingAlert";
import Skeleton from "../../components/ui/Skeleton/Skeleton";

const Home = () => {
	//#region Hooks
	const { user, loading } = useUser();
	//#endregion

	return (
		<Page>
			<Section className="home__hero">
				<h1 className="home__hero__title">Quiz Generator</h1>
				<Text mb="2rem">Create and take interactive quizzes with AI assistance</Text>
			</Section>

			{loading && (
				<Section>
					<FlexContainer direction="column" gap="1rem">
						<Skeleton height="40px" width="100%" />
						<Skeleton height="40px" width="100%" />
						<Skeleton height="40px" width="100%" />
						<Skeleton height="40px" width="67%" />
					</FlexContainer>
				</Section>
			)}
			{!loading && (
				<>
					<NotSignedIn>
						<Section className="home__section home__section--welcome">
							<Section.Title>Welcome to Quiz Generator</Section.Title>

							<Text mb="2rem">
								Generate quiz questions automatically using AI, create interactive quizzes,
								and test your knowledge. Sign in to get started.
							</Text>

							<FlexContainer className="home__welcome__buttons">
								<Link to="/sign-in">
									<Button variant="accent" tabIndex={-1}>
										Sign In
									</Button>
								</Link>
								<Link to="/sign-up">
									<Button variant="accent" outlined tabIndex={-1}>
										Sign Up
									</Button>
								</Link>
							</FlexContainer>
						</Section>

						<Section className="home__section home__section--features">
							<Section.Title>Features</Section.Title>

							<FlexContainer className="home__feature__container">
								<Card className="home__card">
									<Card.Body>
										<IconTextSection
											icon={faRobot}
											title="AI-Generated Questions"
											text="Let our AI analyze your content and generate relevant quiz questions automatically."
										/>
									</Card.Body>
								</Card>

								<Card className="home__card">
									<Card.Body>
										<IconTextSection
											icon={faChartSimple}
											title="Performance Analytics"
											text="Track quiz performance and analyze results with detailed statistics."
										/>
									</Card.Body>
								</Card>

								<Card className="home__card">
									<Card.Body>
										<IconTextSection
											icon={faArrowsRotate}
											title="Interactive Experience"
											text="Create engaging quizzes with various question types and multimedia support."
										/>
									</Card.Body>
								</Card>
							</FlexContainer>
						</Section>
					</NotSignedIn>

					<SignedIn>
						<Section className="home__section home__section--welcome">
							<Section.Title>Welcome back, {user?.name}!</Section.Title>
							<Button variant="accent" outlined onClick={signOut}>
								Sign Out
							</Button>

							{!user?.hasSubscription && <SubscriptionMissingAlert />}
						</Section>

						<Section className="home__section home__section--actions">
							<Section.Title>Quick Actions</Section.Title>

							<FlexContainer className="home__action__container">
								<Link to="/new-quiz" className="home__action__link">
									<Card className="home__card">
										<Card.Body>
											<IconTextSection
												icon={faPlus}
												title="Create New Quiz"
												text="Start building a new quiz from scratch"
											/>
										</Card.Body>
									</Card>
								</Link>

								<Link to="/my-quizzes" className="home__action__link">
									<Card className="home__card">
										<Card.Body>
											<IconTextSection
												icon={faListCheck}
												title="My Quizzes"
												text="Manage your existing quizzes"
											/>
										</Card.Body>
									</Card>
								</Link>

								<Link to="/browse" className="home__action__link">
									<Card className="home__card">
										<Card.Body>
											<IconTextSection
												icon={faSearch}
												title="Browse Quizzes"
												text="Discover and take quizzes from others"
											/>
										</Card.Body>
									</Card>
								</Link>

								<Link to="/profile" className="home__action__link">
									<Card className="home__card">
										<Card.Body>
											<IconTextSection
												icon={faUser}
												title="Profile"
												text="View and edit your profile settings"
											/>
										</Card.Body>
									</Card>
								</Link>
							</FlexContainer>
						</Section>
					</SignedIn>
				</>
			)}
		</Page>
	);
};

export default Home;
