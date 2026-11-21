import { MdEdit, MdDelete } from "react-icons/md";
import { formatarData } from "../../utils/formatarData";
import "./CardTeste.css";

// Classe CSS de cor conforme o resultado do teste
const classesResultado = {
  Sucesso: "CardTeste_resultado-sucesso",
  Falha: "CardTeste_resultado-falha",
  "Em andamento": "CardTeste_resultado-andamento",
};

// Card que mostra as principais informações de um teste
function CardTeste(props) {
  const { teste } = props;
  const codigo = String(teste.codigo || 0).padStart(3, "0");
  const temTemperatura = teste.temperatura !== "" && teste.temperatura != null;

  return (
    <div className="CardTeste_root">
      <div className="CardTeste_info">
        <span className="CardTeste_codigo">T #{codigo}</span>
        <h3>{teste.reagente}</h3>

        {props.detalhado && (
          <span className="CardTeste_detalhes">
            {teste.responsavel} • {formatarData(teste.dataTeste)} • {teste.dosagem} mg
            {temTemperatura && ` • ${teste.temperatura} °C`}
          </span>
        )}

        <span className={"CardTeste_resultado " + classesResultado[teste.resultado]}>
          {teste.resultado}
        </span>
      </div>

      {(props.aoEditar || props.aoExcluir) && (
        <div className="CardTeste_acoes">
          {props.aoEditar && (
            <MdEdit
              size={24}
              title="Editar"
              color="var(--cor-primaria)"
              onClick={props.aoEditar}
            />
          )}
          {props.aoExcluir && (
            <MdDelete
              size={24}
              title="Excluir"
              color="var(--cor-erro)"
              onClick={props.aoExcluir}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default CardTeste;
