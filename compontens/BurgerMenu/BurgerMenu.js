/*import React from "react";
import Link from "next/link";
import styles from "./BurgerMenu.module.scss";

function BurgerMenu() {
  return (
    <>
      <input
        type="checkbox"
        id="burger-checkbox"
        className={styles.burgerCheckbox}
      />
      <label className={styles.burger} htmlFor="burger-checkbox"></label>
    </>
  );
}

export default BurgerMenu;*/

import { useState } from "react";
import Link from "next/link";
import { slide as Menu } from "react-burger-menu";

import styles from "./BurgerMenu.module.scss";

function BurgerMenu() {
  const showSettings = (event) => {
    event.preventDefault();
  };

  return (
    <Menu>
      <a id="home" className={styles.menuItem} href="/">
        Home
      </a>
      <a id="about" className={styles.menuItem} href="/about">
        About
      </a>
      <a id="contact" className={styles.menuItem} href="/contact">
        Contact
      </a>
      <a onClick={showSettings} className={styles.menuItem} href="">
        Settings
      </a>
    </Menu>
  );
}

export default BurgerMenu;
