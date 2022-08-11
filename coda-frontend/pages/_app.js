import React, { useEffect } from "react";
import App, { Container } from "next/app";
import { useRouter } from "next/router";
import { RecoilRoot } from "recoil";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "nookies";
import PersistenceObserver from "./persistenceObserver";
import * as gtag from "../services/common/GtagService";
import AuthCheckComponent from "../components/auth/AuthCheckComponent";

import "../style/common/common.css";

function GtagComponent() {
  const router = useRouter();
  useEffect(() => {
    if (!gtag.existsGaId) {
      return;
    }
    const handleRouteChange = (path) => {
      gtag.pageview(path);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return <></>;
}

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, ctx } = this.props;

    const initializeState = ({ set }) => {
      const cookie = parseCookies(ctx);
      if (cookie?.user) {
        const user = JSON.parse(cookie.user);
        if (user) {
          set({ key: "loginUser" }, user);
        }
      }
      if (cookie?.authCheck) {
        const authCheck = JSON.parse(cookie.authCheck);
        if (authCheck) {
          set({ key: "authCheck" }, authCheck);
        }
      }
    };

    return (
      <Container>
        <RecoilRoot initializeState={initializeState}>
          <AuthCheckComponent ctx={ctx} />
          <Component {...pageProps} />
          <PersistenceObserver ctx={ctx} />
          <ToastContainer position="top-right" />
          <GtagComponent />
        </RecoilRoot>
      </Container>
    );
  }
}
