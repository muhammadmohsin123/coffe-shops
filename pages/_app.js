import "../styles/globals.css";
import { store } from "../redux/store";
import { Provider } from "react-redux";
function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}

export default MyApp;
