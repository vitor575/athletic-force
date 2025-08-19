
import Banner from "../../components/banner";
import SobreFT from "../../components/SobreFt";
import Contato from "../../components/Contato";
import Footer from "../../components/Footer";
import Navbar from "../../components/NavBar/NavBar";
import Planos from "../../components/Planos/Planos";
import ListaTrainers from "../../components/CardsTrainers/ListaTrainers";

const Home = () => {
  return (
    <main>
      <Navbar />
      <section id="home">
        <Banner />
      </section>
      <section id="planos">
        <Planos />
      </section>
      <section id="sobre">
        <SobreFT />
      </section>
      <section id="treinadores">
        <ListaTrainers />
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
