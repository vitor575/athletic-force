import React from "react";
import Banner from "../../components/Banner";
import SobreFT from "../../components/SobreFt";

const Home = () => {
  return (
    <main>
      <section id="home">
        <Banner />
      </section>
      <section id="sobre">
        <SobreFT />
      </section>
    </main>
  );
};

export default Home;
