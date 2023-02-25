import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/Header.module.css";

import shared_styles from "@/styles/Shared.module.css";
import Image from "next/image";
import Link from "next/link";
import Burger from "./svg/Burger";
import CarSvg from "./svg/CarSvg";
import { AppContext, IAppContext } from "@/context/appContext";

const Header = () => {
  const { isPopupOpen, togglePopup, toggleMenu } = useContext(
    AppContext
  ) as IAppContext;
  const [isHeaderShown, setIsHeaderShown] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setIsHeaderShown(window.pageYOffset > 260)
      );
    }
  }, []);

  return (
    <header
      className={`${styles.header} ${
        isHeaderShown ? styles.dynamic_header : ""
      }`}
    >
      <div className={styles.header_container}>
        <div className={styles.header_left}>
          <div className={styles.logo_wrap}>
            <Image
              src={"./LeasingCar.svg"}
              width={132}
              height={35}
              alt="Leasing"
            ></Image>
            <span className={styles.header_car}>
              <CarSvg></CarSvg>
            </span>
          </div>
          <div className={styles.divider}></div>

          <span className={styles.company_name}>Лизинговая компания</span>
        </div>

        <div className={styles.header_right}>
          <div className={styles.link_wrap}>
            <div className={styles.header_link_lease}>
              <Link href={""}>Лизиниг</Link>

              <div className={styles.header_dropdown}>
                <ul className={styles.header_dropdown_link_wrap}>
                  <li className={styles.header_link_dropdown}>
                    <Link href={""}>Для личного пользования</Link>
                  </li>

                  <li className={styles.header_link_dropdown}>
                    <Link href={""}>Для юридических лиц</Link>
                  </li>

                  <li className={styles.header_link_dropdown}>
                    <Link href={""}>Калькулятор</Link>
                  </li>
                </ul>
              </div>
            </div>

            <Link className={styles.header_link} href={""}>
              Каталог
            </Link>
            <Link className={styles.header_link} href={""}>
              О нас
            </Link>
          </div>

          <button
            onClick={togglePopup}
            className={`${shared_styles.button_hollow}`}
          >
            Оставить заявку
          </button>
        </div>

        <button onClick={toggleMenu} className={styles.burger}>
          <Burger />
        </button>
      </div>
    </header>
  );
};

export default Header;
