const { readFile } = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(readFile);

class Database {
  constructor() {
    this.NOME_ARQUIVO = "herois.json";
  }

  async obterDadosArquivo() {
    const arquivo = await readFileAsync(this.NOME_ARQUIVO, "utf8");
    return JSON.parse(arquivo.toString());
  }

  escreverArquivo() {}

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
