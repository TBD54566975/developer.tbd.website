import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import BlogCard from "../components/BlogCard";
import Background from "../components/Background";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <Background
        width={100}
        height={50}
        primaryColor="#FFEC19"
        squareCount={10}
      >
        <main className="flex flex-col items-center z-20">TBD Home Page</main>
      </Background>
    </Layout>
  );
}
