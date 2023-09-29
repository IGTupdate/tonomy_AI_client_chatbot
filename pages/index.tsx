import Head from "next/head";
import { Fragment } from "react";
import Main from "@/components/layout/Main";
import ChatbotWidget from "@/components/ChatbotWidget";

const Home = () => {
  return (
    <Main>
      <Fragment>
        <Head>
          <link rel="icon" href="../assets/imges/icon.svg" sizes="any" />
          <title>Home</title>
        </Head>
        <div>
          <ChatbotWidget />
        </div>
      </Fragment>
    </Main>
  );
};

export default Home;
