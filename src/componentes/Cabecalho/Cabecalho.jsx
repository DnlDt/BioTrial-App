import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import Avatar from "../Avatar/Avatar";
import MenuLateral from "../MenuLateral/MenuLateral";
import { buscarPerfil } from "../../servicos/perfil.servico";
import "./Cabecalho.css";

function Cabecalho() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState(
    buscarPerfil()?.nome || "Cientista",
  );

  useEffect(() => {
    const carregarNome = () => {
      setNomeUsuario(buscarPerfil()?.nome || "Cientista");
    };

    // a página de perfil avisa quando o nome mudar
    window.addEventListener("perfil-atualizado", carregarNome);
    return () => window.removeEventListener("perfil-atualizado", carregarNome);
  }, []);

  return (
    <header className="Cabecalho_root">
      <MdMenu
        size={30}
        className="Cabecalho_menu"
        aria-label="Abrir menu"
        onClick={() => setMenuAberto(true)}
      />

      <h1 className="Cabecalho_titulo" onClick={() => navigate("/")}>
        BioTrial
      </h1>

      <Avatar nome={nomeUsuario} aoClicar={() => navigate("/perfil")} />

      <MenuLateral aberto={menuAberto} aoFechar={() => setMenuAberto(false)} />
    </header>
  );
}

export default Cabecalho;
