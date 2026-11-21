import { Link } from "react-router-dom";
import "./Principal.css";
import { IoArrowBackCircle } from "react-icons/io5";

function Principal(props) {
  return (
    <main className="Principal_root">
      {props.titulo && (
        <div className="Principal_titulo">
          {props.voltarPara && (
            <Link to={props.voltarPara} aria-label="Voltar">
              <IoArrowBackCircle size={28} color="var(--cor-primaria)" />
            </Link>
          )}

          <h2>{props.titulo}</h2>
        </div>
      )}

      {props.children}
    </main>
  );
}

export default Principal;
