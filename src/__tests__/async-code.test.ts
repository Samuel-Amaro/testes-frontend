/**
 * * TESTANDO CÓDIGO ASSÍNCRONO
*/

/**
 * * PROMISSES
 *
 * Retorne uma promise do seu teste, e o Jest vai esperar essa promise ser resolvida. Se a promessa for rejeitada, o teste irá falhar.
*/

//expect -> permite verificar se os valores atendem a certas condições, expect lhe dá acesso a inúmeros matchers que permite validar diferentes coisas
//a function expect(value) é usada toda vez que voce quer testar um valor, usamos o expect junto com uma function matcher para verificar algo sobre o valor
//o argumento para exepct deve ser o valor que o seu codigo produz, e qualquer argumento para o matcher deve ser o valor correto esperado

//test(name, fn, timeout) -> metodo de teste
//Também pode ser chamada com it(name, fn, timeout)
//Tudo que você precisa em um arquivo de teste é o método test que executa um teste.
//name argumento - e o nome do teste
//fn argumento - e uma função que contém as expectativas para testar
//timeout argumento opcional - e o timeout (em miliseegundos) que determina o tempo de espera antes da execução ser abortada 

//simula o code async que queremos testar
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("manteiga de amendoim");
    }, 300);
  });
}

test("o dado e manteiga de amendoim", () => {
  //testamos o valor da promise resolvida se e igual a manteiga de amendoim
  return fetchData().then((data) => {
    expect(data).toBe("manteiga de amendoim");
  });
});

/**
 * * ASYN/AWAIT
 *
 * Como alternativa, você pode usar async e await em seus testes. Para escrever um teste assíncrono, basta usar a palavra-chave async na frente da função passada para test. Por exemplo, o mesmo cenário de fetchData pode ser testado com:
 */

test("o async-await o dado e manteiga amendoin", async () => {
  const data = await fetchData();
  expect(data).toBe("manteiga de amendoim");
});

test("a busca falha com um error", async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch("error");
  }
});

//COMBINANDO ASYNC E AWAIT COM .RESOLVERS OU .REJECTS

test("o dado e manteiga de amendoim 3", async () => {
  //Use resolves para decodificar o valor de uma promessa cumprida, para que qualquer outro matcher possa então ser encadeado.
  //apos a promessa ser resolvida para um valor podemos verificar o valor com um matcher
  await expect(fetchData()).resolves.toBe("manteiga de amendoim");
});

test("o dado falha com um error 2", async () => {
    //Use .rejects para decodificar o motivo de uma promessa rejeitada, para que qualquer outro matcher possa ser encadeado.
    //apos a promessa ser rejeitada para um valor podemos verificar o valor com um matcher
  await expect(fetchData()).rejects.toMatch("error");
});
