import React from "react";
import styles from "../styles/Home.module.css";
import Card from "./card";
function StoresList({ coffeeStores, title }) {
  return (
    <div>
      {coffeeStores?.length > 0 && (
        <div>
          <h2 className={styles.heading2}>{title}</h2>
          <div className={styles.cardLayout}>
            {coffeeStores.map((item) => {
              return (
                <Card
                  key={item.id}
                  name={item.name}
                  imgUrl={
                    item.imgUrl ||
                    "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                  }
                  href={`/coffee-store/${item.id}`}
                  className={styles.card}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default StoresList;
