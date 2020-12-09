import React, { FC } from "react";
import { AppProps } from "next/app";
import "ress";
import "../../styles/global.scss";

export type MyAppProps = AppProps;

const MyApp: FC<MyAppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default MyApp;
