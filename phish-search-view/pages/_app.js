import React from "react";
import App, { Container } from "next/app";
import { RecoilRoot } from "recoil";
import "bootstrap/dist/css/bootstrap.min.css";
import { parseCookies } from "nookies";
import { PersistenceObserver } from "./persistenceObserver";

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
    };

    return (
      <Container>
        <RecoilRoot initializeState={initializeState}>
          <Component {...pageProps} />
          <PersistenceObserver ctx={ctx} />
        </RecoilRoot>
      </Container>
    );
  }
}
