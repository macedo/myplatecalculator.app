import { Html, Head, Main, NextScript } from 'next/document';

const Document: Function = (): JSX.Element => {
    return(
        <Html className="h-full bg-gray-100">
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </Head>
            <body className="h-full">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;