import React from "react";
import styles from "./banner.module.css";
function Banner(props) {
  const { buttonText, handleOnBtnClick } = props;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Shops</span>
      </h1>
      <p className={styles.subTitle}>Discover your local coffee Shops</p>
      <button className={styles.button} onClick={handleOnBtnClick}>
        {" "}
        {buttonText}
      </button>
    </div>
  );
}

export default Banner;
