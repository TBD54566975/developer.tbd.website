import React from "react";
import ReactPlayer from "react-player";

interface AudioProps {
  /**
   * Audio source URL
   */
  url: string;
}

const Audio: React.FC<AudioProps> = ({ url }) => {
  return (
    <div className="not-prose tablet:gap-4 flex flex-col gap-12">
      <div>
        <ReactPlayer
          url={url}
          height="166px"
          className="border-accent-cyan t-0 l-0 w-full rounded-md border-2"
          config={{
            soundcloud: {
              options: {
                auto_play: false,
                buying: false,
                sharing: false,
                download: false,
                show_artwork: true,
                show_playcount: false,
                show_user: false,
                single_active: true,
                visual: false,
                color: "#ffec19",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Audio;
