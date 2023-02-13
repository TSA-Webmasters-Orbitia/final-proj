import Head from "next/head";
const CHead = ({ title }) => {
  return (
    <>
      <Head>
        <title>{`${title} | Orbitia`}</title>
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#63dcff" />
        <meta name="msapplication-TileColor" content="#63dcff" />
        <meta name="theme-color" content="#63dcff" />
      </Head>
    </>
  );
};

export default CHead;
