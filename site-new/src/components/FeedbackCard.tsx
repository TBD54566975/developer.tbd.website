import React from "react";

function FeedbackCard() {
  return (
    <div>
      <p>Was this page helpful?</p>
      <div>
        <button>Helpful</button>
        <button>Not Helpful</button>
      </div>
      <div>
        <div>
          <div>Discord Icon</div>
          <span>Connect with us</span>
        </div>
        <div>
          <div>GitHub Icon</div>
          <span>Report an issue</span>
        </div>
      </div>
    </div>
  );
}

export default FeedbackCard;
