import React, { useContext, useState } from "react";
import sidemenu_styles from "@/styles/Sidemenu.module.css";
import shared_styles from "@/styles/Shared.module.css";
import Link from "next/link";
import { AppContext, IAppContext } from "@/context/appContext";

const SideMenu = () => {
  const { isSideMenuOpen, toggleMenu, togglePopup } = useContext(
    AppContext
  ) as IAppContext;

  const handleFormOpen = () => {
    toggleMenu();
    togglePopup();
  };
  return (
    <div
      className={`${sidemenu_styles.container} ${
        isSideMenuOpen ? sidemenu_styles.open : sidemenu_styles.closed
      }`}
    >
      <div
        className={`${sidemenu_styles.shadow} ${
          isSideMenuOpen ? "" : sidemenu_styles.hidden
        } `}
      ></div>
      <button onClick={toggleMenu} className={sidemenu_styles.button_close}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.5996 9.40039L9.40028 22.5997"
            stroke="black"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.40039 9.40039L22.5997 22.5997"
            stroke="black"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <ul className={sidemenu_styles.link_list}>
        <li className={sidemenu_styles.link}>
          <Link href={""}>Лизинг</Link>
        </li>
        <li className={sidemenu_styles.link}>
          <Link href={""}>Катлог</Link>
        </li>
        <li className={sidemenu_styles.link}>
          <Link href={""}>О нас</Link>
        </li>
      </ul>

      <button onClick={handleFormOpen} className={shared_styles.button_filled}>
        {" "}
        Оставить заявку
      </button>
    </div>
  );
};

export default SideMenu;
