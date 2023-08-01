import { screen, getByLabelText } from "@testing-library/dom";
import { render, screen as screenReact } from "@testing-library/react";
import Login from "../components/Login";

/**
 * * USANDO CONSULTAS(QUERIES) TESTING-LIBRARY
 *
 */

//screen e o mesmo que document.body
//a DOM Testing Library também exporta um screenobjeto que contém todas as consultas pré-vinculadas document.body
//getByLabelText: Este método é muito bom para campos de formulário. Ao navegar por um formulário de site, os usuários encontram elementos usando o texto do rótulo. Esse método emula esse comportamento, portanto, deve ser sua principal preferência.
//Retorna o nó correspondente para uma consulta e lança um erro descritivo se nenhum elemento corresponder ou se mais de uma correspondência for encontrada (use getAllByem vez disso se mais de um elemento for esperado).

//com screen
const inputNode1 = screen.getByLabelText("Username");

//Sem screen, você precisa fornecer um contêiner:
const container = document.querySelector("#app");
const inputNode2 = getByLabelText(container, "Username");

//usando screen react

render(<Login />);

const exampleInput = screen.getAllByLabelText("Username");

/**
 * * exemplos de TextMatch
 *
 * A maioria das APIs de consulta usa a TextMatchcomo argumento, o que significa que o argumento pode ser uma string , regex ou uma função de assinatura (content?: string, element?: Element | null) => booleanque retorna true para uma correspondência e falsepara uma incompatibilidade.
 */

//este exemplo tenta encontrar o div
//usando string
//usando o getByText - fora dos formulários, o conteúdo de texto é a principal forma de os usuários encontrarem elementos. Este método pode ser usado para localizar elementos não interativos (como divs, spans e parágrafos).

//Correspondência de uma string:
screen.getByText("Olá, Mundo!"); //correspondência de string completa
screen.getByText("lá, Mundo", { exact: false }); //correspondência substring, exact: O padrão é true; corresponde a strings completas, diferencia maiúsculas de minúsculas. Quando false, corresponde a substrings e não diferencia maiúsculas de minúsculas.
screen.getByText("olá, mundo!", { exact: false }); // caso ignorado

// Correspondência a regex:
screen.getByText(/Mundo/); //correspondência substring
screen.getByText(/mundo/i); // correspondência substring, ignora casos
screen.getByText(/^olá, mundo!$/i); // correspondência de string completa, ignore case
screen.getByText(/Olá, M?uNDO!/i); // substring match, ignore case, searches for "hello world" or "hello orld"

// Matching with a custom function:
screen.getByText((content, element) => content.startsWith("Hello"));