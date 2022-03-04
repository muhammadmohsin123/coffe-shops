import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";
import Image from "next/image";
import cls from "classnames";
import axios from "axios";
import { fectchCoffeSTores } from "../../lib/coffeSore";
////

export async function getStaticProps(context) {
  const params = context.params;
  console.log("params", params);
  const coffeeStores = await fectchCoffeSTores();

  return {
    props: {
      coffeeStore: coffeeStores.find(
        (item) => item.fsq_id.toString() === params.id
      ),
    }, // will be passed to the page component as props
  };
}
/////
export async function getStaticPaths() {
  const coffeeStores = await fectchCoffeSTores();
  const paths = coffeeStores.map((item) => ({
    params: { id: item.fsq_id.toString() },
  }));
  console.log("paths", paths);
  return {
    paths,
    fallback: true, // false or 'blocking'
  };
}

/////

function CoffeeStore(props) {
  const router = useRouter();
  // first time data needs to chached first and then serverd..so loading is needed
  // it checks fallbback in getStaticPaths
  if (router.isFallback) {
    return <div>Loading....</div>;
  }
  const { name, location, id, imgUrl } = props.coffeeStore;
  console.log("props.coffeeStore", props.coffeeStore);
  useEffect(async () => {}, []);
  const handleUpvoteButton = () => {
    console.log("up vote");
  };
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href='/'>
              <a>Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src='/icons/places.svg'
              width='24'
              height='24'
              alt='places icon'
            />
            <p className={styles.text}>{location.address}</p>
          </div>
          {location.neighborhood.length > 0 && (
            <div className={styles.iconWrapper}>
              <Image
                src='/icons/nearMe.svg'
                width='24'
                height='24'
                alt='near me icon'
              />
              <p className={styles.text}>{location.neighborhood[0]}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src='/icons/star.svg'
              width='24'
              height='24'
              alt='star icon'
            />
            <p className={styles.text}>3</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoffeeStore;
