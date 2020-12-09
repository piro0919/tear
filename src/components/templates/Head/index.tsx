import React, { FC } from "react";
import NextHead from "next/head";

const Head: FC = () => (
  <NextHead>
    <meta charSet="utf-8" />
    <link href="/favicon.ico" rel="icon" />
    <meta content="ie=edge" httpEquiv="x-ua-compatible" />
    <meta
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
      name="viewport"
    />
    <title>tear</title>
  </NextHead>
);

export default Head;
