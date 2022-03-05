import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";
import Image from "next/image";
import cls from "classnames";
import axios from "axios";
import { fectchCoffeSTores } from "../../lib/coffeSore";
import { useDispatch, useSelector } from "react-redux";
import { setLatLong, getCoffeeStores } from "../../redux/coffeeStoreSlice";
import { isEmpty } from "../../utils";
////

export async function getStaticProps(staticProps) {
  const params = staticProps.params;

  const coffeeStores = await fectchCoffeSTores();
  const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id; //dynamic id
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fectchCoffeSTores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

/////

function CoffeeStore(initialProps) {
  const [coffeeStore, setCoffeeStore] = useState(
    initialProps.coffeeStore || {}
  );
  const router = useRouter();
  const id = router.query.id;
  const coffeeStores = useSelector(
    (state) => state.coffeeStore.coffeeStoresData
  );
  if (router.isFallback) {
    return <div>Loading....</div>;
  }

  // first time data needs to chached first and then serverd..so loading is needed
  // it checks fallbback in getStaticPaths

  const { name, neighbourhood, address, imgUrl } = coffeeStore;

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreById = coffeeStores.find(
          (item) => item.id.toString() === id
        );
        setCoffeeStore(findCoffeeStoreById);
      }
    }
  }, [id]);

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
            <p className={styles.text}>{address}</p>
          </div>
          {neighbourhood && (
            <div className={styles.iconWrapper}>
              <Image
                src='/icons/nearMe.svg'
                width='24'
                height='24'
                alt='near me icon'
              />
              <p className={styles.text}>{neighbourhood}</p>
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
