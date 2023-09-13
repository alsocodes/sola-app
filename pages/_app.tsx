import Toast from "@/components/Toast";
import "@/styles/globals.css";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState("corporate");
  const notify = (type: string, message: string) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;

      default:
        toast.info(message);
        break;
    }
  };
  return (
    <>
      <Head>
        <title>Welcome DaisyUi</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div
        data-theme={theme}
        className="bg-base-300 w-full h-screen overflow-hidden"
      >
        <div className="border0 bg-base-100 border-red-600 h-full min-h-screen w-full max-w-md md:max-w-2xl mx-auto p-2 md:p-4 relative overflow-hidden">
          <div className="flex justify-end items-center gap-2 mb-4">
            <div className="text-xs">
              {moment(new Date()).format("DD/MM/YY")}
            </div>
            <button
              className="btn btn-neutral btn-xs btn-circle btn-ghost"
              onClick={() => setTheme(theme === "dark" ? "corporate" : "dark")}
            >
              <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
            </button>
          </div>
          <Component {...pageProps} notify={notify} />
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
    </>
  );
}
