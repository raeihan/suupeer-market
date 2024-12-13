import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Theme } from "../daisyui/Theme";

const Header = () => {
  const location = useLocation();
  return (
    <>
      <header>
        <input
          type="checkbox"
          name="hbr"
          id="hbr"
          class="hbr peer"
          hidden
          aria-hidden="true"
        />
        <nav class="fixed top-0 z-20 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur navbar shadow-md shadow-gray-600/5 peer-checked:navbar-active md:relative md:bg-transparent dark:shadow-none">
          <div class="xl:container m-auto px-6 md:px-12 w-full">
            <div class="w-full flex flex-wrap items-center justify-between gap-6 md:py-3 md:gap-0">
              <div class="w-full flex justify-between lg:w-auto">
                <a
                  href="#"
                  aria-label="logo"
                  class="flex space-x-2 items-center"
                >
                  <span class="text-base font-bold text-yellow-400">
                    Suupeer!<span className="text-gray-900 dark:text-white">Market</span>
                  </span>
                </a>
                <label
                  for="hbr"
                  class="peer-checked:hamburger block relative z-20 p-6 -mr-6 cursor-pointer lg:hidden ml-auto"
                >
                  <div
                    aria-hidden="true"
                    class="m-auto h-0.5 w-6 rounded bg-gray-900 dark:bg-gray-300 transition duration-300"
                  ></div>
                  <div
                    aria-hidden="true"
                    class="m-auto mt-2 h-0.5 w-6 rounded bg-gray-900 dark:bg-gray-300 transition duration-300"
                  ></div>
                </label>
              </div>
              <div class="navmenu hidden w-full flex-wrap justify-end items-center mb-16 space-y-8 p-6 lg:space-y-0 lg:p-0 lg:m-0 lg:flex md:flex-nowrap lg:bg-transparent lg:w-7/12 lg:shadow-none dark:shadow-none dark:border-gray-700 lg:border-0">
                <div class="text-gray-600 dark:text-white lg:pr-4">
                  <ul class="space-y-6 tracking-wide font-medium text-base lg:text-sm lg:flex lg:space-y-0">
                    <li>
                      <Link
                        to={"/"}
                        class={`${
                          location.pathname === "/" ? "text-yellow-400" : ""
                        } block md:px-4 transition dark:hover:text-primaryLight`}
                      >
                        <span>Home</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/about"}
                        class={`${
                          location.pathname === "/about"
                            ? "text-yellow-400"
                            : ""
                        } block md:px-4 transition dark:hover:text-primaryLight`}
                      >
                        <span>About</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/product"}
                        class={`${
                          location.pathname === "/product"
                            ? "text-yellow-400"
                            : ""
                        } block md:px-4 transition dark:hover:text-primaryLight`}
                      >
                        <span>Product</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/contact"}
                        class={`${
                          location.pathname === "/contact"
                            ? "text-yellow-400"
                            : ""
                        } block md:px-4 transition dark:hover:text-primaryLight`}
                      >
                        <span>Contact</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div class="w-full space-y-2 border-primary/10 dark:border-gray-700 flex flex-col -ml-1 sm:flex-row lg:space-y-0 md:w-max lg:border-l items-center gap-3">
                  <a
                    href="#"
                    class="relative flex h-9 ml-auto items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full focus:before:bg-primary/10 dark:focus:before:bg-primaryLight/10 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                  >
                    <span class="relative text-sm font-semibold text-gray-600 dark:text-white">
                      Sign Up
                    </span>
                  </a>
                  <a
                    href="#"
                    class="relative flex h-9 ml-auto items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full before:bg-yellow-400 dark:before:bg-primaryLight before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                  >
                    <span class="relative text-sm font-semibold text-white dark:text-gray-900">
                      Login
                    </span>
                  </a>
                  <Theme />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
