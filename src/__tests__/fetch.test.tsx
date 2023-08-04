/**
 * * EXEMPLO USANDO REACT-TESTING-LIBRARY
 *
 * biblioteca para testar componentes react
 *
 * Recomendamos usar a biblioteca Mock Service Worker para simular declarativamente a comunicação da API em seus testes
 */

//jest.mock("node-fetch");

//importa dependencias
//import * as React from "react";

//importar utilitários de simulação de API do Mock Service Worker
import { rest } from "msw";
import { setupServer } from "msw/node";

import userEvent from "@testing-library/user-event";

//importa react-testing metodos
import { render, fireEvent, screen } from "@testing-library/react";

//adicionar combinadores jest personalizados de jest-dom
import "@testing-library/jest-dom";

//o componente para teste
import Fetch from "../components/Fetch";

//mock - simulam o comportamento de objetos reais de forma controlada
//usando o setupServer function de msw para mockar a request da API feita pelo componente testado
//declara quais REQUESTS de API mockar
const server = setupServer(
  //mock - simula uma chamada para a request com url /greeting
  //caputra "GET /greetting" request
  rest.get("/greeting", (_req, res, ctx) => {
    //responde usando um mocked JSON body
    return res(ctx.json({ greeting: "Olá aqui" }));
  })
);

//beforeAll(fn, timeout) - Executa uma função antes de qualquer um dos testes neste arquivo ser executado.
//estabelecer simulação de API antes de todos os testes
beforeAll(() => server.listen());

//afterEach(fn, timeout) - Executa uma função após cada um dos testes deste arquivo completar.
// redefinir quaisquer manipuladores de solicitação declarados como parte de nossos testes
// (ou seja, para testar cenários de erro único)
afterEach(() => server.resetHandlers());

//afterAll(fn, timeout) - Executa uma função depois que todos os testes neste arquivo forem concluídos.
//limpar uma vez que os testes são feitos
afterAll(() => server.close());

//executa um teste
test("carrega e exibe saudacao", async () => {
  //Arrange - arranjar - cria o contexto do teste
  //act - agir
  //assert - afirmar(onde testamos se o resultado e o que esperamos)

  //arrange cria o contexto do teste, renderiza o componente
  //o render metodo, renderiza um elemento reactt no DOM
  render(<Fetch url="/greeting" />);

  //o fire event método permite disparar eventtos para simular ações do usuário
  //aqui dispara um evento do clique em um elemento que contenha o text
  //fireEvent.click(screen.getByText("Carregar Saudação"));

  await userEvent.click(screen.getByText("Carregar Saudação"));

  //act
  // espera até que a promessa `get` resolva e
  // o componente chama setState e renderiza novamente,
  // lançando um erro se não conseguir encontrar um elemento
  await screen.findByRole("heading", { name: "Olá, aqui" });

  //assert - testamos o valor
  // afirma que a mensagem de alerta está correta usando
  // toHaveTextContent, um correspondente personalizado de jest-dom.
  expect(screen.getByRole("heading")).toHaveTextContent("Olá aqui");

  // afirma que o botão não está desabilitado usando
  // toBeDisabled, um matcher personalizado de jest-dom.
  expect(screen.getByRole("button")).toBeDisabled();
});

//executa outro teste
test("lida com erro do servidor", async () => {
  server.use(
    ///substitui o manipulador de solicitação "GET /greeting" inicial
    // para retornar um 500 Server Error
    rest.get("/greeting", (_req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<Fetch url="/greeting" />);

  fireEvent.click(screen.getByText("Carregar Saudação"));

  await screen.findByRole("alert");

  expect(screen.getByRole("alert")).toHaveTextContent(
    "Oops, falha para buscar!"
  );
  expect(screen.getByRole("button")).not.toBeDisabled();
});
