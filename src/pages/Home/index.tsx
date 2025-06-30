import React from "react";
import Banner from "../../components/banner";
import SobreFT from "../../components/SobreFt";
import CardsTraineres from "../../components/CardsTrainers";
import trainer1 from "../../img/kayk.jpg";
import Contato from "../../components/Contato";
import Footer from "../../components/Footer";
import Navbar from "../../components/NavBar/NavBar";
import CardPlanos from "../../components/Planos";

const Home = () => {
  return (
    <main>
      <Navbar />
      <section id="home">
        <Banner />
      </section>
      <section id="planos">
          <CardPlanos  plano="Plano 1"  valor={99.99} page="Planos/Plano1"/> 
          <CardPlanos  plano="Plano 2" valor={150.00} page="Planos/Plano2" /> 
          <CardPlanos  plano="Plano 3" valor={250.00} page="Planos/Plano3" /> 
      </section>
      <section id="sobre">

        <SobreFT />
      </section>
      <section id="treinadores">
        <CardsTraineres imagem={trainer1} titulo="Jeferson" descricao="Personal trainer de 10 anos na Athletic" />
        <CardsTraineres imagem={trainer1} titulo="Cintia" descricao="Personal trainer de 5 anos na Athletic" />
        <CardsTraineres imagem={trainer1} titulo="Matheus" descricao="Personal trainer de 8 anos na Athletic " />
      </section>
      <section id="contato">
        <Contato />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
};

export default Home;
