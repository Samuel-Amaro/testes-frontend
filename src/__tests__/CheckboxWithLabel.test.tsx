import { cleanup, fireEvent, render } from "@testing-library/react";
import CheckboxWithLabel from "../components/CheckboxWithLabel";

/**
 * * TESTANDO O DOM COM RTL
 *
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

// Nota: a execução da limpeza afterEach é feita automaticamente para você em @testing-library/react@9.0.0 ou superior
// desmonta e limpa o DOM após o término do teste.

//Executa uma função após cada um dos testes deste arquivo completar. Se a função retorna uma promise ou é um generator, Jest aguarda essa promise resolver antes de continuar.
//apos cada teste de arquivo terminar ira executar a function cleanup
//cleanup - Desmonta árvores React que foram montadas com render.
afterEach(cleanup);

//executa um teste
it("CheckboxWithLabel altera o texto após clicar", () => {
  //render - Renderize em um contêiner que é anexado a document.body. Deve ser usado com limpeza(cleanup).
  //queryByLabelText, getByLabelText - Isso procurará o label que corresponde ao dado e TextMatch, em seguida, localizará o elemento associado a esse label.
  const { queryByLabelText, getByLabelText } = render(
    <CheckboxWithLabel labelOn="On" labelOff="Off" />
  );

  //.toBeTruthy() - Use .toBeTruthy quando você não se importa com o valor e deseja garantir que um valor seja verdadeiro em um contexto booleano.
  //aqui vamos testar se conseguimos encontrar um element html que possui o text off, se encontrar retorna um elemento que pode ser um valor se existe um valor e true, assim o teste passa, testamos se conseguimos encontrar um elemento com o valor off
  expect(queryByLabelText(/off/i)).toBeTruthy();

  //Métodos de conveniência para disparar eventos DOM
  //dispara um evento de click em um elemento html que possua o texto off
  fireEvent.click(getByLabelText(/off/i));

  //aqui vamos testar se conseguimos encontrar um element html que possui o text on
  expect(queryByLabelText(/on/i)).toBeTruthy();
});
