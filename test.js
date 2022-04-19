const { deepEqual } = require("assert");

const database = require("./database");

const DEFAULT_ITEMS_CADASTRAR = {
  name: "Batman",
  poder: "Defense",
  id: 1,
};

describe("Testes do módulo heróis", () => {
  it("Deve pesquisar um herói usando arquivos ", async () => {
    const expected = DEFAULT_ITEMS_CADASTRAR;
    const [primeira_posicao] = await database.listId(expected.id);
    deepEqual(primeira_posicao, expected);
  });

  // it("Deve cadastrar um herói, usando arquivos", async () => {
  //   const expected = DEFAULT_ITEMS_CADASTRAR;

  //   ok(null, expected);
  // });
});
