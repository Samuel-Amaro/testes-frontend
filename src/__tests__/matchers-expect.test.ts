import sum from "../sum";

/**
 * * MATCHERS COMUNS
 *
 * toBE, toEqual, usando matchers para poder testar valores de maneiras diferentes
 */

//expect -> permite verificar se os valores atendem a certas condições, expect lhe dá acesso a inúmeros matchers que permite validar diferentes coisas
//a function expect(value) é usada toda vez que voce quer testar um valor, usamos o expect junto com uma function matcher para verificar algo sobre o valor
//o argumento para exepct deve ser o valor que o seu codigo produz, e qualquer argumento para o matcher deve ser o valor correto esperado

test("adds 1 + 2 to equal 3", () => {
  //aqui o toBe e um matcher que testa valores de maneira diferente
  //aqui estamos testando uma igualdade exata, isso e se a soma retorna 3
  //aqui estamos testando se o valor retornado por sum e exatamento igual a 3
  expect(sum(1, 2)).toBe(3);
});

test("dois mais dois é quatro", () => {
  //expect retorna um objeto de expectativa
  //com esses objetos não fazemos muitas coisas, execeto chamadas de matchers neles
  //no codigo abaixo o ,toBe(4) e o matcher,
  //o matcher permite testar valores de maneiras diferentes
  //aqui o matcher testar um valor com igualdade exata
  //toBe utiliza Object.is para testar igualdade exata
  expect(2 + 2).toBe(4);
});

test("atribuição de objeto", () => {
  //matcher toEqual
  //usamos para checar o valor de um objeto
  //toEqual recursivamente verifica cada campo de um objeto ou array
  const data: { [index: string]: number } = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

test("adicionando números positivos não e zero", () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      //testando o oposto de um matcher usando not
      //usando matcher toBe para numeros que não sejam igual a 0
      expect(a + b).not.toBe(0);
    }
  }
});

/**
 * * VERDADES
 *
 * valores como undefined, null, false, usando matchers
 *
 */

test("nulo", () => {
  const n = null;
  //verificamos se expect retorna null, corresponde a null, fazemos chamada matcher toBeNull no objeto de expectativa, para que corresponda a null
  expect(n).toBeNull();
  expect(n).toBeDefined(); //corresponde a apenas não undefined
  expect(n).not.toBeUndefined(); //corresponde a apenas undefined
  expect(n).not.toBeTruthy(); //combina com qualquer coisa que uma instrução if trata como verdadeiro
  expect(n).toBeFalsy(); //combina com qualquer coisa que uma instrução if trata como falso
});

test("zero", () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

/**
 * * NÚMEROS
 *
 * matchers, com numeros, testando numeros
 */

test("dois mais dois", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe e toEqual são equivalentes para números
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

test("adicionando números de ponto flutuante", () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);     Isso não vai funcionar por causa de um erro de arredondamento
  expect(value).toBeCloseTo(0.3); // Isso funciona.
});

/**
 * * TESTANDO VALORES STRINGS
 *
 * Você pode verificar strings contra expressões regulares com toMatch:
 */

test("não existe I em team", () => {
  //testamos o valor team para verificar se não existe I maiusculo
  //Se você sabe como testar algo, .not permite que você teste seu oposto.
  //matcher toMatch, verifica se uma string corresponde a uma expressão regular
  expect("team").not.toMatch(/I/);
});

test('mas existe "stop" em Christoph', () => {
  //testamos o valor Christoph para verificar se existe uma expressão regular corresponde no valor
  expect("Christoph").toMatch(/stop/);
});

/**
 * * TESTANDO ARRAYS E ITERÁVEIS
 *
 * Você pode verificar se um array ou iterável contém um item específico usando toContain:
 */

const shoppingList = [
  "fraldas",
  "kleenex",
  "sacos de lixo",
  "papel toalha",
  "leite",
];

test("a lista de compras tem leite nela", () => {
  //verificamos se o array shoppingList contem o valor leite
  expect(shoppingList).toContain("leite");
  expect(new Set(shoppingList)).toContain("leite");
});

/**
 * * TESTANDO EXCEÇÕES
 *
 * Se você quiser testar se uma determinada função lança um erro quando é chamada, use toThrow.
 */

function compileAndroidCode() {
  throw new Error("você está usando o JDK errado!");
}

test("compilar android corre como esperado", () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // Você também pode usar uma string que deve estar contida na mensagem de erro ou um regexp
  expect(() => compileAndroidCode()).toThrow("você está usando o JDK errado!");
  expect(() => compileAndroidCode()).toThrow(/JDK/);

  // Ou você pode corresponder a uma mensagem de erro exata usando um regexp como abaixo
  expect(() => compileAndroidCode()).toThrow(/^você está usando o JDK errado$/); // Test fails
  expect(() => compileAndroidCode()).toThrow(
    /^você está usando o JDK errado!$/
  ); // Test pass
});
