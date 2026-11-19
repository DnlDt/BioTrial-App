import { Outlet } from "react-router-dom";
import Cabecalho from "./componentes/Cabecalho/Cabecalho";
import Rodape from "./componentes/Rodape/Rodape";
import Principal from "./componentes/Principal/Principal";

function App() {
  return (
    <>
      <Cabecalho />
      <Principal>
        <Outlet />
      </Principal>
      <Rodape />
    </>
  );
}

export default App;