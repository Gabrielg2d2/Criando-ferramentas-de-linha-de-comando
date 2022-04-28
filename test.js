const { deepEqual } = require("assert");

const database = require("./database");

const DEFAULT_ITEMS_CADASTRAR = {
  name: "Batman",
  poder: "Defense",
  id: 1,
};

const DEFAULT_NEW_ITEM = {
  name: "Flash",
  poder: "Speed",
  id: 2,
};

describe("Testes do módulo heróis", () => {
  before(async () => {
    // Sempre zera a base de dados, para não gerar erro nos testes.
    await database.escreverArquivo([]);
    await database.cadastrar(DEFAULT_ITEMS_CADASTRAR);
  });

  it("Deve pesquisar um herói usando arquivos ", async () => {
    const expected = DEFAULT_ITEMS_CADASTRAR;
    const [primeira_posicao] = await database.listId(expected.id);
    deepEqual(primeira_posicao, expected);
  });

  it("Deve cadastrar um herói, usando arquivos", async () => {
    const expected = DEFAULT_NEW_ITEM;
    const response = await database.cadastrar(expected);

    deepEqual(response.data, expected);
    deepEqual(response.status, 200);
  });

  it("Não deve cadastrar o mesmo herói", async () => {
    const expected = DEFAULT_NEW_ITEM;
    const response = await database.cadastrar(expected);

    deepEqual(
      response.message,
      `Herói ${expected.name} já foi cadastrado na base`
    );
    deepEqual(response.data, {});
    deepEqual(response.status, 400);
  });
});
