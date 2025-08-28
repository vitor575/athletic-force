import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useWindowWidth from "../../hooks/useWindowWidth";
import CardCliente from "./index";
import Calendario from "../../img/calendario.png";
import Pagamento from "../../img/pagamento.png";
import Configuracao from "../../img/configuracao.png";

interface Cliente {
  titulo: string;
  imagem: string;
  destino: string;
}

const ListaClientes = () => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= 768;

  const clientes: Cliente[] = [
    {
      titulo: "Cronograma de treinos",
      imagem: Calendario,
      destino: "/clientHome/cronograma/",
    },
    {
      titulo: "Central de faturas",
      imagem: Pagamento,
      destino: "/clientHome/pagamentos",
    },
    {
      titulo: "Configuração da conta",
      imagem: Configuracao,
      destino: "/clientHome/configuration",
    },
  ];

  if (isMobile) {
    // MOBILE → Carrossel
    return (
      <Swiper
        breakpoints={{
          320: { slidesPerView: 1.1 },
          640: { slidesPerView: 1.8},
          768: { slidesPerView: 2.3 },
          1012: { slidesPerView: 3 },
        }}
      >
        {clientes.map((c, index) => (
          <SwiperSlide key={index}>
            <CardCliente
              titulo={c.titulo}
              imagem={c.imagem}
              destino={c.destino}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  // DESKTOP → Grid
  return (
    <div
      style={{
        display:"flex",
        justifyItems: "center",
        gap:20
      }}
    >
      {clientes.map((c, index) => (
        <CardCliente
          key={index}
          titulo={c.titulo}
          imagem={c.imagem}
          destino={c.destino}
        />
      ))}
    </div>
  );
};

export default ListaClientes;
