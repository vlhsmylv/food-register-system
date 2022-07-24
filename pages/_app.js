import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";

function MyApp({ Component, pageProps }) {
  return <><Component {...pageProps} /><ToastContainer limit={1} /></>
}

export default MyApp
