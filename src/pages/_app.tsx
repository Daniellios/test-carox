import { AppState } from "@/context/appContext";
import "@/styles/globals.css";
import "@/styles/fonts/Gilroy/style.css";
import "@/styles/fonts/Nekst/style.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppState>
      <Component {...pageProps} />
    </AppState>
  );
}
