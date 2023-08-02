/**
 * * EXEMPLO DE BIBLIOTECA DE TESTE
 *
 * O DOM Testing Library é uma solução muito leve para testar nós DOM
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

import { render, screen } from "@testing-library/react";
import Login from "../components/Login";

//executa um teste
test("exemplos de algumas coisas", async () => {
  const famousProgrammerInHistory = "Ada Lovelace";

  //renderiza o componente
  render(<Login />);

  //Obtenha elementos de formulário por seu texto de rótulo.
  // Um erro será lançado se não for encontrado (acessibilidade FTW!)
  const input = screen.getByLabelText("username-input") as HTMLInputElement;
  input.value = famousProgrammerInHistory;

  // Obtém elementos por seu texto, assim como um usuário real faz.
  screen.getByText("Imprimir Username").click();

});
