import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import { buscarTestePorId, salvarTeste } from "../../servicos/testes.servico";
import validarTeste, { RESULTADOS } from "../../utils/validarTeste";
import { dataHoje } from "../../utils/formatarData";

const testeVazio = {
  id: "",
  reagente: "",
  responsavel: "",
  dataTeste: "",
  dosagem: "",
  temperatura: "",
  resultado: "Em andamento",
  observacoes: "",
};

function PaginaCadastroTeste() {
  const navigate = useNavigate();
  const params = useParams();
  const [formTeste, setFormTeste] = useState(testeVazio);

  useEffect(() => {
    if (params.id) {
      const testeParaEditar = buscarTestePorId(params.id);
      if (testeParaEditar) {
        setFormTeste({ ...testeVazio, ...testeParaEditar });
      } else {
        toast.error("Teste não encontrado!");
        navigate("/lista-testes");
      }
    } else {
      setFormTeste(testeVazio);
    }
  }, [params.id, navigate]);

  const alterarCampo = (campo, valor) => {
    setFormTeste({ ...formTeste, [campo]: valor });
  };

  const salvar = () => {
    const erro = validarTeste(formTeste);
    if (erro) {
      toast.error(erro);
      return;
    }

    salvarTeste({
      ...formTeste,
      reagente: formTeste.reagente.trim(),
      responsavel: formTeste.responsavel.trim(),
      observacoes: formTeste.observacoes.trim(),
      dosagem: Number(formTeste.dosagem),
      temperatura: formTeste.temperatura === "" ? "" : Number(formTeste.temperatura),
    });
    toast.success(
      formTeste.id ? "Teste atualizado com sucesso!" : "Teste registrado com sucesso!",
    );
    navigate("/lista-testes");
  };

  const titulo = formTeste.id ? "Editar Teste" : "Registrar Novo Teste";

  return (
    <Principal titulo={titulo} voltarPara="/lista-testes">
      <CampoCustomizado
        label="Reagente / Composto"
        obrigatorio
        placeholder="Ex.: Reagente Alpha"
        maxLength={60}
        value={formTeste.reagente}
        onChange={(e) => alterarCampo("reagente", e.target.value)}
      />
      <CampoCustomizado
        label="Cientista responsável"
        obrigatorio
        placeholder="Nome do responsável"
        maxLength={60}
        value={formTeste.responsavel}
        onChange={(e) => alterarCampo("responsavel", e.target.value)}
      />
      <CampoCustomizado
        label="Data do teste"
        obrigatorio
        type="date"
        max={dataHoje()}
        value={formTeste.dataTeste}
        onChange={(e) => alterarCampo("dataTeste", e.target.value)}
      />
      <CampoCustomizado
        label="Dosagem (mg)"
        obrigatorio
        type="number"
        min="0"
        step="0.01"
        placeholder="Ex.: 250"
        value={formTeste.dosagem}
        onChange={(e) => alterarCampo("dosagem", e.target.value)}
      />
      <CampoCustomizado
        label="Temperatura (°C)"
        type="number"
        step="0.1"
        placeholder="Opcional"
        value={formTeste.temperatura}
        onChange={(e) => alterarCampo("temperatura", e.target.value)}
      />
      <CampoCustomizado
        label="Resultado"
        obrigatorio
        opcoes={RESULTADOS}
        value={formTeste.resultado}
        onChange={(e) => alterarCampo("resultado", e.target.value)}
      />
      <CampoCustomizado
        label="Observações"
        rows={4}
        maxLength={500}
        placeholder="Reações observadas, efeitos colaterais..."
        value={formTeste.observacoes}
        onChange={(e) => alterarCampo("observacoes", e.target.value)}
      />

      <BotaoCustomizado tipo="secundario" aoClicar={salvar}>
        Salvar
      </BotaoCustomizado>
    </Principal>
  );
}

export default PaginaCadastroTeste;
