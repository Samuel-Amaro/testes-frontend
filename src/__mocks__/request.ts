/**
 * Como não queremos ir para a rede em nosso teste, vamos criar uma simulação manual para nosso request
 */

const users: {
  [index: number]: { name: string };
} = {
  4: { name: "Marcos" },
  5: { name: "Paulo" },
};

export default function request(url: string) {
  return new Promise(
    (
      resolve: (value: { name: string }) => void,
      reject: (reason: { error: string }) => void
    ) => {
      const userID = parseInt(url.substring("/users/".length), 10);
      process.nextTick(() =>
        users[userID]
          ? resolve(users[userID])
          : reject({ error: `Usuário com ${userID} não encontrado.` })
      );
    }
  );
}
