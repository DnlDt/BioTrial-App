import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdAdd } from "react-icons/md";
import Principal from "../../componentes/Principal/Principal";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import CardTeste from "../../componentes/CardTeste/CardTeste";
import { buscarTestes, excluirTeste } from "../../servicos/testes.servico";
import { RESULTADOS } from "../../utils/validarTeste";
import "./PaginaListaTestes.css";

const TODOS = "Todos";

function PaginaListaTestes() {
  const navigate = useNavigate();
  const [testes, setTestes] = useState(buscarTestes());
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [filtroResultado, setFiltroResultado] = useState(TODOS);

  const excluir = (testeParaExcluir) => {
    if (confirm(`Deseja excluir o teste do reagente "${testeParaExcluir.reagente}"?`)) {
      const testesAtualizados = excluirTeste(testeParaExcluir.id);
      setTestes(testesAtualizados);
      toast.success("Teste excluído com sucesso!");
    }
  };

  const editar = (testeParaEditar) => {
    navigate("/cadastro-teste/" + testeParaEditar.id);
  };

  // Pesquisa por reagente ou responsável + filtro por resultado
  const termo = termoPesquisa.trim().toLowerCase();
  const testesFiltrados = testes
    .filter((teste) => {
      const combinaTexto =
        teste.reagente.toLowerCase().includes(termo) ||
        teste.responsavel.toLowerCase().includes(termo);
      const combinaResultado =
        filtroResultado === TODOS || teste.resultado === filtroResultado;
      return combinaTexto && combinaResultado;
    })
    .sort((a, b) => b.codigo - a.codigo);

  return (
    <Principal titulo="Lista de Testes" voltarPara="/">
      <div className="PaginaListaTestes_filtros">
        <CampoCustomizado
          type="search"
          label="Pesquisar"
          placeholder="Reagente ou responsável"
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
        />
        <CampoCustomizado
          label="Resultado"
          opcoes={[TODOS, ...RESULTADOS]}
          value={filtroResultado}
          onChange={(e) => setFiltroResultado(e.target.value)}
        />
      </div>

      {testesFiltrados.map((teste) => (
        <CardTeste
          key={teste.id}
          teste={teste}
          detalhado
          aoEditar={() => editar(teste)}
          aoExcluir={() => excluir(teste)}
        />
      ))}

      {!testesFiltrados.length && (
        <span className="PaginaListaTestes_vazia">
          {testes.length
            ? "Nenhum teste encontrado com esse filtro."
            : "Nenhum teste cadastrado."}
        </span>
      )}

      <div
        className="PaginaListaTestes_botaoAdicionar"
        title="Registrar novo teste"
        onClick={() => navigate("/cadastro-teste")}
      >
        <MdAdd />
      </div>
    </Principal>
  );
}

export default PaginaListaTestes;
