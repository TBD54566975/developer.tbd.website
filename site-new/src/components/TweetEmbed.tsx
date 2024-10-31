import React, { useEffect } from "react";
import Link from "@docusaurus/Link";

interface TweetEmbedProps {
  /**
   * The unique identifier for the tweet to embed
   */
  tweetId: string;
}

const TweetEmbed: React.FC<TweetEmbedProps> = ({ tweetId }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <blockquote className="twitter-tweet">
      <Link href={`https://twitter.com/user/status/${tweetId}`}></Link>
    </blockquote>
  );
};

export default TweetEmbed;
