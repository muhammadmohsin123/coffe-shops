import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import coffeeStoreData from "../../data/coffee-stores.json";
import Head from "next/head";
////
export async function getStaticProps(context) {
  const params = context.params;
  return {
    props: {
      coffeeStore: coffeeStoreData.find(
        (item) => item.id.toString() === params.id
      ),
    }, // will be passed to the page component as props
  };
}
/////
export async function getStaticPaths() {
  const paths = coffeeStoreData.map((item) => ({
    params: { id: item.id.toString() },
  }));
  return {
    paths,
    fallback: false, // false or 'blocking'
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
  const { name, address, neighbourhood } = props.coffeeStore;
  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href='/'>
        <a>Back to home</a>
      </Link>

      <p>{address}</p>
      <p>{name}</p>
      <p>{neighbourhood}</p>
    </div>
  );
}

export default CoffeeStore;
