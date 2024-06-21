import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import BlogCard from "../components/BlogCard";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className=" flex justify-center items-center">
        <h1>TBD Components</h1>
      </header>

      <main className="flex flex-col items-center">
        <h3>Blog Card - Large</h3>
        <BlogCard
          date={new Date("2024-05-28")}
          tags={["Test1", "Test2", "Test3"]}
          size="large"
        />
        <h3>Blog Card - Small</h3>
        <BlogCard
          date={new Date("2024-05-28")}
          tags={["Test1", "Test2", "Test3"]}
        />
        <h3>Square Background component (WIP)</h3>
      </main>
    </Layout>
  );
}
