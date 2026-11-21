import { useNavigate } from "react-router-dom";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import CardTeste from "../../componentes/CardTeste/CardTeste";
import { buscarTestes } from "../../servicos/testes.servico";
import "./PaginaInicial.css";

function PaginaInicial() {
  const navigate = useNavigate();
  const testes = buscarTestes();

  const totalSucesso = testes.filter((t) => t.resultado === "Sucesso").length;
  const totalFalhas = testes.filter((t) => t.resultado === "Falha").length;

  const testesRecentes = [...testes]
    .sort((a, b) => b.codigo - a.codigo)
    .slice(0, 5);

  return (
    <Principal>
      <div className="PaginaInicial_resumo">
        <div className="PaginaInicial_card PaginaInicial_card-sucesso">
          <span>Sucesso</span>
          <strong>{totalSucesso}</strong>
        </div>
        <div className="PaginaInicial_card PaginaInicial_card-total">
          <span>Total</span>
          <strong>{testes.length}</strong>
        </div>
        <div className="PaginaInicial_card PaginaInicial_card-falha">
          <span>Falhas</span>
          <strong>{totalFalhas}</strong>
        </div>
      </div>

      <BotaoCustomizado tipo="primario" aoClicar={() => navigate("/cadastro-teste")}>
        Registrar Novo Teste
      </BotaoCustomizado>

      <section className="PaginaInicial_recentes">
        <div className="PaginaInicial_recentes_topo">
          <h2>Testes Recentes</h2>
          <a onClick={() => navigate("/lista-testes")}>Ver todos</a>
        </div>

        {!testes.length && (
          <span className="PaginaInicial_vazio">Nenhum teste registrado ainda.</span>
        )}

        {testesRecentes.map((teste) => (
          <div
            key={teste.id}
            className="PaginaInicial_item"
            onClick={() => navigate("/cadastro-teste/" + teste.id)}
          >
            <CardTeste teste={teste} />
          </div>
        ))}
      </section>
    </Principal>
  );
}

export default PaginaInicial;
