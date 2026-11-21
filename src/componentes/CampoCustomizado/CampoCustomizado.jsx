import "./CampoCustomizado.css";

// Campo de formulário genérico:
// - select quando recebe "opcoes"
// - textarea quando recebe "rows"
// - input nos outros casos
function CampoCustomizado(props) {
  const { label, obrigatorio, opcoes, iconeDireita, ...propsDoCampo } = props;

  let campo;
  if (opcoes) {
    campo = (
      <select {...propsDoCampo} className="CampoCustomizado_input">
        {opcoes.map((opcao) => (
          <option key={opcao} value={opcao}>
            {opcao}
          </option>
        ))}
      </select>
    );
  } else if (props.rows) {
    campo = <textarea {...propsDoCampo} className="CampoCustomizado_input" />;
  } else {
    campo = <input {...propsDoCampo} className="CampoCustomizado_input" />;
  }

  return (
    <label className="CampoCustomizado_root">
      <span>
        {label}
        {obrigatorio && <strong className="CampoCustomizado_obrigatorio"> *</strong>}
      </span>
      <div className="CampoCustomizado_caixa">
        {campo}
        {iconeDireita && (
          <span className="CampoCustomizado_icone">{iconeDireita}</span>
        )}
      </div>
    </label>
  );
}

export default CampoCustomizado;
