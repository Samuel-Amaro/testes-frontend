//aqui, informamos jest para usar nossa simulação manual,  it espera que o valor de retorno seja uma promessa que vai ser resolvida.
//Simula um módulo com uma versão auto simulada quando ele está sendo "required".
jest.mock<typeof import("../__mocks__/request")>("../request");

import * as user from "../user";

//O CODE ASYNC ABAIXO PODED SER ESCRITO USANDO PROMISES OU ASYNC/AWAIT

//expect -> permite verificar se os valores atendem a certas condições, expect lhe dá acesso a inúmeros matchers que permite validar diferentes coisas
//a function expect(value) é usada toda vez que voce quer testar um valor, usamos o expect junto com uma function matcher para verificar algo sobre o valor
//o argumento para exepct deve ser o valor que o seu codigo produz, e qualquer argumento para o matcher deve ser o valor correto esperado

//test(name, fn, timeout) -> metodo de teste
//Também pode ser chamada com it(name, fn, timeout)
//Tudo que você precisa em um arquivo de teste é o método test que executa um teste.
//name argumento - e o nome do teste
//fn argumento - e uma função que contém as expectativas para testar
//timeout argumento opcional - e o timeout (em miliseegundos) que determina o tempo de espera antes da execução ser abortada

//A asserção de uma promessa deve ser retornada.
it("trabalhando com promisses", () => {
  //o testes e para verificar se uma promisse e resolvida para o valor Marcos
  //o testes e para verificar se uma promisse e resolvida para o valor Marcos, baseado no que o codigo produz informamos uma id de usuario essa id deve buscar o usuario em uma api e returnar uma promise resolvida com o nome do usuario
  expect.assertions(1);
  return user.getUserName(4).then((data) => expect(data).toBe("Marcos"));
});

//A asserção de uma promessa deve ser retornada.
it("trabalhando com promisses", () => {
  //o testes e para verificar se uma promisse e resolvida para o valor Marcos, baseado no que o codigo produz informamos uma id de usuario essa id deve buscar o usuario em uma api e returnar uma promise resolvida com o nome do usuario
  expect.assertions(1);
  return user.getUserName(5).then((data) => expect(data).toBe("Paulo"));
});

//tratamento de erros com .cath em promisses
it("trabalhando com erros com promises", () => {
  expect.assertions(1);
  return user.getUserName(2).catch((e) =>
    expect(e).toEqual({
      error: "Usuário com 2 não econtrado.",
    })
  );
});

//tratamento de erros com .cath usando async/await
it("trabalhando com erros com promises", async () => {
  expect.assertions(1);
  try {
    await user.getUserName(1);
  } catch (error) {
    expect(error).toEqual({ error: "Usuário com 1 não encontrado." });
  }
});
