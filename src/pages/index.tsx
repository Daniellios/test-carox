import Head from "next/head";

import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import Slider from "@/components/slider/Slider";
import SideMenu from "@/components/SideMenu";
import Popup from "@/components/popup/Popup";
import Calculator from "@/components/calculator/Calculator";

export default function Home() {
  return (
    <>
      <Head>
        <title>OXEM TEST</title>
        <meta name="description" content="OXEM" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main className={styles.main}>
        <Slider></Slider>

        <SideMenu></SideMenu>

        <Calculator></Calculator>
      </main>

      <Popup></Popup>
    </>
  );
}
