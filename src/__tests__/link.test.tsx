//Este pacote fornece um renderizador React que pode ser usado para renderizar componentes React em objetos JavaScript puro, sem depender do DOM ou de um ambiente móvel nativo.
//quando testamos componentes react, podemos usar um renderizador de teste para gerar rapidamente um valor serializavel para sua arvore react
//usamos o renderizador de teste do react
import renderer from "react-test-renderer";
import Link from "../components/Link";

/**
 * * TESTES DE SNAPSHOT COM JEST
 *
 * Testes de snapshot são ferramentas bem úteis sempre que você desejar garantir que sua UI não seja alterada inesperadamente.
 *
 * Um caso comum de teste de snapshot é renderizar um componente de UI, obter uma captura disso, então compará-lo para com uma imagem de referência armazenada com o teste. O teste irá falhar se as duas imagens não coincidirem: quer a mudança seja inesperada, ou a captura de tela precisa ser atualizada para a nova versão do componente da UI.
 *
 * Então, essencialmente, o teste de snapshot permite você ver como seu componente se alterou desde o último teste, linha por linha. As linhas de código que sofreram mudanças são conhecidas como diff, abreviação em inglês para diferenças.
 *
 * Quando um teste de snapshot falhar, é preciso inspecionar se trata-se de uma mudança pretendida ou não intencional. Se a mudança é esperada, pode-se invocar Jest com jest -u para substituir o snapshot existente.
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

it("processa corretamente", () => {
  //renderer.create() - Crie uma TestRenderer instância com o elemento React passado. Ele não usa o DOM real, mas ainda renderiza totalmente a árvore de componentes na memória para que você possa fazer afirmações sobre ela.
  //renderer.create().toJSON() - Retorna um objeto que representa a árvore renderizada. Esta árvore contém apenas os nós específicos da plataforma como <div>ou <View>e seus props, mas não contém nenhum componente escrito pelo usuário.
  const tree = renderer
    .create(<Link href="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  //testamos se o snapshot do componente Link e o mais recente, se e igual ao que renderizamos, se houver alguma mudança do snapshot mais recente para o armazenado no teste, o teste falha, ai e onde a um erro, ou bug que esta causando mundaça na renderização
  //Componentes React e React Native são um bom caso de uso para testes de snapshot.  o objetivo é testar se a saída é correta.
  //o
  //.toMatchSpapshot() - Isso garante que um valor corresponda ao snapshot mais recente.
  expect(tree).toMatchSnapshot();
});

it("muda a classe quando pairado", () => {
  //renderer.create() - Crie uma TestRenderer instância com o elemento React passado. Ele não usa o DOM real, mas ainda renderiza totalmente a árvore de componentes na memória para que você possa fazer afirmações sobre ela.
  const component = renderer.create(
    <Link href="http://www.facebook.com">Facebook</Link>
  );

  //renderer.create().toJSON() - Retorna um objeto que representa a árvore renderizada. Esta árvore contém apenas os nós específicos da plataforma como <div>ou <View>e seus props, mas não contém nenhum componente escrito pelo usuário.
  let tree = component.toJSON() as renderer.ReactTestRendererJSON;

  //testamos se o snapshot do componente Link e o mais recente, se e igual ao que renderizamos, se houver alguma mudança do snapshot mais recente para o armazenado no teste, o teste falha, ai e onde a um erro, ou bug que esta causando mundaça na renderização
  //Componentes React e React Native são um bom caso de uso para testes de snapshot.  o objetivo é testar se a saída é correta.
  //o
  //.toMatchSpapshot() - Isso garante que um valor corresponda ao snapshot mais recente.
  expect(tree).toMatchSnapshot();

  //acionar manualmente o callback
  //renderer.act - Envolva qualquer renderização de código e atualizações de acionamento para seus componentes em chamadas act().
  //prepara um componente para asserções
  renderer.act(() => {
    //aciona callback que manipula o evento MouseEnter no componente
    tree.props.onMouseEnter();
  });

  //re-renderização
  tree = component.toJSON() as renderer.ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();

  //acionar manualmente a callback
  renderer.act(() => {
    //aciona callback que manipula o evento MouseLeave no componente
    tree.props.onMouseLeave();
  });

  //re-renderização
  tree = component.toJSON() as renderer.ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();
});
