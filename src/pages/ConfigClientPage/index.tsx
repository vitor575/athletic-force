import ConfiguracaoNav from "../../components/ConfiguracaoNav";
import Form from "../../components/Form";

import "./ConfigClientPage.css";

const ConfigClientPage = () => {
  return (
    <main className="config-client-page">
      <aside className="config-client-nav">
        <ConfiguracaoNav />
      </aside>
      <section className="config-client-content">
        <Form />
      </section>
    </main>
  );
};

export default ConfigClientPage;
