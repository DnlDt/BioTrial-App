import { NavLink } from "react-router-dom";
import { MdClose, MdHome, MdList, MdAddCircle, MdPerson } from "react-icons/md";
import "./MenuLateral.css";

const itensMenu = [
  { caminho: "/", texto: "Início", icone: <MdHome size={22} /> },
  { caminho: "/lista-testes", texto: "Lista de Testes", icone: <MdList size={22} /> },
  { caminho: "/cadastro-teste", texto: "Registrar Teste", icone: <MdAddCircle size={22} /> },
  { caminho: "/perfil", texto: "Meu Perfil", icone: <MdPerson size={22} /> },
];

function MenuLateral(props) {
  if (!props.aberto) return null;

  return (
    <div className="MenuLateral_fundo" onClick={props.aoFechar}>
      <nav className="MenuLateral_root" onClick={(e) => e.stopPropagation()}>
        <div className="MenuLateral_topo">
          <strong>Menu</strong>
          <MdClose size={26} cursor="pointer" onClick={props.aoFechar} />
        </div>

        {itensMenu.map((item) => (
          <NavLink
            key={item.caminho}
            to={item.caminho}
            end
            className="MenuLateral_item"
            onClick={props.aoFechar}
          >
            {item.icone}
            {item.texto}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default MenuLateral;
