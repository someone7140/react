import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/weather/register/GeocoderControl.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer position="top-right" />
    </>
  );
}
