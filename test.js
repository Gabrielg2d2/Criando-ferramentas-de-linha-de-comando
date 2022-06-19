const { deepEqual } = require("assert");

const database = require("./database");

const DEFAULT_ITEM_CADASTRAR_BATMAN = {
  name: "Batman",
  poder: "Defense",
  id: 1,
};

const DEFAULT_NEW_ITEM_FLASH = {
  name: "Flash",
  poder: "Speed",
  id: 2,
};

describe("Testes do módulo heróis", () => {
  before(async () => {
    // Sempre zera a base de dados, para não gerar erro nos testes.
    await database.resetDatabase();
    await database.cadastrar(DEFAULT_ITEM_CADASTRAR_BATMAN);
  });

  // it("Deve resetar a database antes do teste iniciar", async () => {
  //   await database.resetDatabase();
  //   const data = await database.obterDadosArquivo();
  //   deepEqual(data, []);
  // });

  it("Deve pesquisar um herói usando arquivos ", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR_BATMAN;
    const [primeira_posicao] = await database.listId(expected.id);
    deepEqual(primeira_posicao, expected);
  });

  it("Deve cadastrar um herói, usando arquivos", async () => {
    const expected = DEFAULT_NEW_ITEM_FLASH;
    const response = await database.cadastrar(expected);

    deepEqual(response.data, expected);
    deepEqual(response.status, 200);
  });

  it("Não deve cadastrar o mesmo herói", async () => {
    const expected = DEFAULT_NEW_ITEM_FLASH;
    const response = await database.cadastrar(expected);

    deepEqual(
      response.message,
      `Herói ${expected.name} já foi cadastrado na base`
    );
    deepEqual(response.data, {});
    deepEqual(response.status, 400);
  });

  it("Deve remover um herói", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR_BATMAN;
    const response = await database.remover(expected.id);

    deepEqual(response.status, 200);
    deepEqual(response.message, "Herói removido com sucesso");
    deepEqual(response.data, true);
  });

  it("Deve retornar um erro ao tentar remover um herói que não existe", async () => {
    const response = await database.remover(9898989898);

    deepEqual(response.status, 400);
    deepEqual(response.message, "Herói não encontrado!");
    deepEqual(response.data, false);
  });
});
