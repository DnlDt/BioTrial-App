import "./Avatar.css";

function Avatar(props) {
  const nomes = (props.nome || "?").trim().split(" ");

  const primeiraLetraPrimeiroNome = nomes[0][0] || "?";

  let primeiraLetraUltimoNome = "";
  if (nomes.length > 1) {
    primeiraLetraUltimoNome = nomes.at(-1)[0];
  }

  return (
    <div className="Avatar_root" onClick={props.aoClicar} title={props.nome}>
      {(primeiraLetraPrimeiroNome + primeiraLetraUltimoNome).toUpperCase()}
    </div>
  );
}

export default Avatar;
