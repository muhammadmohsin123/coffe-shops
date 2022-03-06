import React from "react";
import styles from "./banner.module.css";
import { useRouter } from "next/router";

function Banner(props) {
  const { buttonText, handleOnBtnClick } = props;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Shops</span>
      </h1>
      <p className={styles.subTitle}>Discover your local coffee Shops</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleOnBtnClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default React.memo(Banner);
