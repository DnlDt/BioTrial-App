import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PaginaInicial from "./paginas/paginaInicial/paginaInicial";
import PaginaListaTestes from "./paginas/paginaListaTestes/paginaListaTestes";
import PaginaPerfil from "./paginas/paginaPerfil/paginaPerfil";

export const roteador = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <PaginaInicial />
      },
      {
        path: "/testes",
        element: <PaginaListaTestes />
      },
      {
        path: "/perfil",
        element: <PaginaPerfil />
      }
    ]
  }
]);