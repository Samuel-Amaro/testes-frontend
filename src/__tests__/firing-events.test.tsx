/**
 * * FIRING EVENTS(eVENTOS DE DISPARO)
 *
*/

import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../components/Button";

//fireEvent(node: HTMLElement, event: Event)
//Acionar eventos DOM.

//fireEvent[eventName](node: HTMLElement, eventProperties: Object)
//Métodos de conveniência para disparar eventos DOM.

//screen e o mesmo que document.body
//a DOM Testing Library também exporta um screen objeto que contém todas as consultas pré-vinculadas document.body

test("chama onClick prop quando clicado", () => {
  //Retorna uma nova, não utilizada função de simulação.
  const handleClick = jest.fn();
  //Renderize em um contêiner que é anexado a document.body. Deve ser usado com cleanup.
  render(<Button onClick={handleClick}>Clique Aqui</Button>);
  //aciona o evento de click no elemento que contem o text clique aqui
  fireEvent.click(screen.getByText(/clique aqui/i));
  //testando a function simulada como value para ver quantas vezes foi chamada
  expect(handleClick).toHaveBeenCalledTimes(1);
});
