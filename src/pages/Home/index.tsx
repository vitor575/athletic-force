import React from "react";
import Banner from "../../components/Banner";
import SobreFT from "../../components/SobreFt";
import CardsHome from "../../components/CardsTrainers";
import trainer1 from "../../img/kayk.jpg";
import trainer2 from "../../img/isabela.jpg";
import trainer3 from "../../img/max.jpg";
import Contato from "../../components/Contato";


const Home = () => {
  return (
    <main>
      <section id="home">
        <Banner />
      </section>
      <section id="sobre">
        <SobreFT />
      </section>
      <section id="treinadores">
        <CardsHome  imagem={trainer1} titulo="Jeferson" descricao="Personal trainer de 10 anos na Zenfit"/>
        <CardsHome  imagem={trainer2} titulo="Felipe" descricao="Personal trainer a mais de 5 anos na Zenfit"/>
        <CardsHome  imagem={trainer3} titulo="Matheus" descricao="Personal trainer a mais de 8 anos na ZenFit "/>
      </section>
      <section id="contato">
        <Contato/>
      </section>
    </main>
  );
};

export default Home;
