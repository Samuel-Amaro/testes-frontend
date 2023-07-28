/**
 * function simples que busca dados de usuario de uma API  e retorna o nome de usuario
 */

import fetchData from "./request";

export function getUserName(userID: number) {
  return fetchData(`/users/${userID}`).then((user) => user.name);
}
