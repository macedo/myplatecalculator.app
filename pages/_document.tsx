import React from 'react';
import {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

function Document() {
  return (
    <Html className="h-full bg-gray-100">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
