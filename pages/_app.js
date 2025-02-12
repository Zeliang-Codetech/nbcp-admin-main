import Head from "next/head";
import { useState } from "react";
import "../styles/globals.css";
import "../styles/ant.css";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";
import store from "../store/store";
import { Menu, Spin } from "antd";
import MainLayout from "../components/MainLayout";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#00b33c" options={{ showSpinner: false }} />
      <Provider store={store}>
        <MainLayout Component={Component} pageProps={pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
