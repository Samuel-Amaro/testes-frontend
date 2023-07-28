/**
 * Agora imagine uma implementação request.jsque vá para a rede e busque alguns dados do usuário:
 * @param url
 * @returns
 */

export default function fetchData(url: string) {
  return new Promise((resolve: (value: { name: string }) => void) => {
    fetch(url)
      .then((response) => {
        return response.json() as Promise<{ name: string }>;
      })
      .then((data) => {
        resolve(data);
        return data;
      });
  });
}
