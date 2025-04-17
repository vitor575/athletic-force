import React from "react";
import Banner from "../../components/banner";
import SobreFT from "../../components/SobreFt";
import CardsTraineres from "../../components/CardsTrainers";
import trainer1 from "../../img/kayk.jpg";
import trainer2 from "../../img/isabela.jpg";
import trainer3 from "../../img/max.jpg";
import Contato from "../../components/Contato";
import Footer from "../../components/Footer";
import Navbar from "../../components/NavBar/NavBar";



const Home = () => {
  return (
    <main>
      <Navbar />
      <section id="home">
        <Banner />
      </section>
      <section id="sobre">
        <SobreFT />
      </section>
      <section id="treinadores">
        <CardsTraineres  imagem={trainer1} titulo="Jeferson" descricao="Personal trainer de 10 anos na Athletic"/>
        <CardsTraineres  imagem={trainer1} titulo="Cintia" descricao="Personal trainer de 5 anos na Athletic"/>
        <CardsTraineres  imagem={trainer1} titulo="Matheus" descricao="Personal trainer de 8 anos na Athletic "/>
      </section>
      <section id="contato">
        <Contato/>
      </section>
      <section>
        <Footer/>
      </section>
    </main>
  );
};

export default Home;
