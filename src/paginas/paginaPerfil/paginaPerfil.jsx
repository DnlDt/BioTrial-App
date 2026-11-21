import { useState } from "react";
import { toast } from "react-toastify";
import { IoEye, IoEyeOff } from "react-icons/io5";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import { buscarPerfil, salvarPerfil } from "../../servicos/perfil.servico";
import validarEmail from "../../utils/validarEmail";

const perfilVazio = {
  email: "",
  nome: "",
  especialidade: "",
  senha: "",
};

function PaginaPerfil() {
  const [formPerfil, setFormPerfil] = useState({ ...perfilVazio, ...buscarPerfil() });
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const alterarCampo = (campo, valor) => {
    setFormPerfil({ ...formPerfil, [campo]: valor });
  };

  const salvar = () => {
    if (
      !formPerfil.email.trim() ||
      !formPerfil.nome.trim() ||
      !formPerfil.especialidade.trim() ||
      !formPerfil.senha
    ) {
      toast.error("Preencha todos os campos obrigatórios (*)!");
      return;
    }
    if (!validarEmail(formPerfil.email)) {
      toast.error("E-mail inválido!");
      return;
    }
    if (formPerfil.nome.trim().split(" ").length < 2) {
      toast.error("Informe o nome completo (nome e sobrenome).");
      return;
    }
    if (formPerfil.senha.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    salvarPerfil({
      ...formPerfil,
      email: formPerfil.email.trim(),
      nome: formPerfil.nome.trim(),
      especialidade: formPerfil.especialidade.trim(),
    });
    window.dispatchEvent(new Event("perfil-atualizado"));
    toast.success("Alterações salvas com sucesso!");
  };

  const IconeSenha = mostrarSenha ? IoEye : IoEyeOff;

  return (
    <Principal titulo="Meu Perfil" voltarPara="/">
      <CampoCustomizado
        label="E-mail"
        obrigatorio
        type="email"
        maxLength={80}
        value={formPerfil.email}
        onChange={(e) => alterarCampo("email", e.target.value)}
      />
      <CampoCustomizado
        label="Nome completo"
        obrigatorio
        maxLength={80}
        value={formPerfil.nome}
        onChange={(e) => alterarCampo("nome", e.target.value)}
      />
      <CampoCustomizado
        label="Especialidade"
        obrigatorio
        placeholder="Ex.: Termoquímica"
        maxLength={60}
        value={formPerfil.especialidade}
        onChange={(e) => alterarCampo("especialidade", e.target.value)}
      />
      <CampoCustomizado
        label="Senha"
        obrigatorio
        type={mostrarSenha ? "text" : "password"}
        maxLength={30}
        value={formPerfil.senha}
        onChange={(e) => alterarCampo("senha", e.target.value)}
        iconeDireita={
          <IconeSenha
            size={20}
            title={mostrarSenha ? "Esconder senha" : "Mostrar senha"}
            onClick={(e) => {
              e.preventDefault();
              setMostrarSenha(!mostrarSenha);
            }}
          />
        }
      />

      <BotaoCustomizado tipo="secundario" aoClicar={salvar}>
        Salvar alterações
      </BotaoCustomizado>
    </Principal>
  );
}

export default PaginaPerfil;
