import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Background from "../components/Background";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <Background width={100} height={50} bgColor="yellow" squareCount={10}>
        <main className="z-20 flex flex-col items-center">TBD Home Page</main>
      </Background>
    </Layout>
  );
}
