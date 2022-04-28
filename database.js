const { readFile, writeFile } = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
  constructor() {
    this.NOME_ARQUIVO = "herois.json";
  }

  async obterDadosArquivo() {
    const arquivo = await readFileAsync(this.NOME_ARQUIVO, "utf8");
    return JSON.parse(arquivo.toString());
  }

  async escreverArquivo(dados) {
    try {
      await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados));
      return true;
    } catch (error) {
      return false;
    }
  }

  async cadastrar(heroi) {
    const data = await this.obterDadosArquivo();
    const id = heroi.id <= 2 ? heroi.id : Date.now();

    const novoHeroi = {
      id,
      ...heroi,
    };

    const addHeroiNoArquivo = [...data, novoHeroi];

    const resultado = await this.escreverArquivo(addHeroiNoArquivo);
    if (resultado)
      return {
        status: 200,
        message: "Heroi cadastrado com sucesso",
        data: novoHeroi,
      };
    return { status: 400, message: "Erro ao cadastrar novo herói", data: {} };
  }

  async listAllName(nome) {
    const data = await this.obterDadosArquivo();
    const dataFilter = data.filter((item) =>
      item.nome.toLowerCase().includes(nome.toLowerCase())
    );
    return dataFilter;
  }

  async listId(id) {
    const data = await this.obterDadosArquivo();
    return data.filter((item) => item.id === id);
  }
}

module.exports = new Database();
