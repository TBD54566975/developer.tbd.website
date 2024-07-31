import React from "react";
import TextIconCard from "@site/src/components/TextIconCard";
import tbdRex from "@site/static/img/tbd-rex";

function ComponentGuide() {
  return (
    <div className="grid grid-cols-8 gap-3">
      <TextIconCard
        icon={tbdRex}
        title="Rocket"
        text="An open source messaging service that enables wallet applications to communicate with financial instutitions to discover and obtain liquidity. "
        url="https://example.com"
        theme="yellow"
        buttonText="Talk Money To Me"
      />
      <TextIconCard
        icon={tbdRex}
        title="Rocket"
        text="An open source messaging service that enables wallet applications to communicate with financial instutitions to discover and obtain liquidity. "
        url="https://example.com"
        theme="teal"
        buttonText="Talk Money To Me"
      />
      <TextIconCard
        icon={tbdRex}
        title="Rocket"
        text="An open source messaging service that enables wallet applications to communicate with financial instutitions to discover and obtain liquidity. "
        url="https://example.com"
        theme="purple"
        buttonText="Talk Money To Me"
      />
    </div>
  );
}

export default ComponentGuide;
