import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import HeaderComponent from "../components/Header/HeaderComponent";
import "tailwindcss-elevation"
import FooterComponent from "../components/Footer/FooterComponent";
import Link from "next/link";
import city from '../assets/images/city.jpeg'
import city3 from '../assets/images/city3.jpeg'
import DualCardComponent from "../components/DualCards/DualCardComponent";
import ScrollpositionAnimation from "../hooks/OnScroll";
import { useEffect } from "react";
import Rex_logo_small from '../assets/images/Rex_logo_small.png'
import AboutusComponent from "../components/Aboutus/AboutusComponent";
const Home: NextPage = () => {
  //if (typeof window !== "undefined") {
  //  useEffect(() => {
      // Update the document title using the browser API
   //   ScrollpositionAnimation();
   // }, [window.scrollY]);
 /// }

  useEffect(() => {
    async function ScrollpositionAnimation(){
    const targets = document.querySelectorAll(".js-show-on-scroll");
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
    
        // Is the element in the viewport?
        if (entry.isIntersecting) {
    
          // Add the fadeIn class:
          entry.target.classList.add("motion-safe:animate-fadeIn");
        } else {
    
          // Otherwise remove the fadein class
          entry.target.classList.remove("motion-safe:animate-fadeIn");
        }
      });
    });
    // Loop through each of the target
    targets.forEach(function(target) {
      // Hide the element
      target.classList.add("opacity-0");
    
      // Add the element to the watcher
      observer.observe(target);
    });
    ScrollpositionAnimation()
    }
  })

  return (
    <div>
    <div className={styles.container}>
      <main className={styles.main}>
        <header>
          {" "}
          <HeaderComponent></HeaderComponent>
        </header>
        <div className="mx-auto max-w-7xl w-screen">
          <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
            <div>
              <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
                <nav
                  className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                  aria-label="Global"
                >
                  <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
                    <div className="flex w-full items-center justify-between md:w-auto">
                      <a href="#">
                        <span className="sr-only">Your Company</span>
                        <Image
                          alt="Your Company"
                          className="h-8 w-auto sm:h-10"
                          src={Rex_logo_small}
                          height={70}
                          width={60}
                        />
                      </a>
                      <div className="-mr-2 flex items-center md:hidden js-show-on-scroll">
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>

            <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 js-show-on-scroll">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Rex Protocol</span>
                  <span className="block text-indigo-600 xl:inline">
                    
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Bringing liquidty to real estate
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#"
                      className="flex w-full items-center elevation-10 justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                    >
                      MVP
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#"
                      className="flex w-full elevation-10 items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg js-show-on-scroll"
                    >
                      Live demo
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
            src={city3}
            height={1000}
            width={1000}
            alt="">
          </Image>
        </div>
      </main>
      <DualCardComponent></DualCardComponent>
      <AboutusComponent></AboutusComponent>
      </div>
        <FooterComponent></FooterComponent>
        </div>

  );
};

export default Home;
//<footer className={styles.footer}>

//          <span className={styles.logo}>
//<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
//</span>
