import clsx from "clsx";
import styles from "./loading.module.css";
import React from "react";

const Loading = () => {
  return (
    <div className={styles["loader"]}>
      <div className={clsx(styles["cell"], styles["d-0"])}></div>
      <div className={clsx(styles["cell"], styles["d-1"])}></div>
      <div className={clsx(styles["cell"], styles["d-2"])}></div>
      <div className={clsx(styles["cell"], styles["d-1"])}></div>
      <div className={clsx(styles["cell"], styles["d-2"])}></div>
      <div className={clsx(styles["cell"], styles["d-2"])}></div>
      <div className={clsx(styles["cell"], styles["d-3"])}></div>
      <div className={clsx(styles["cell"], styles["d-3"])}></div>
      <div className={clsx(styles["cell"], styles["d-4"])}></div>
    </div>
  );
};

export default Loading;
