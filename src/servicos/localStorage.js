export const lerDados = (chave) => {
    const dados = localStorage.getItem(chave);
    return dados ? JSON.parse(dados) : [];
};

export const salvarDados = (chave, dados) => {
    localStorage.setItem(chave, JSON.stringify(dados));
};