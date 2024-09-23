import { useEffect, useState, useCallback } from "react"; // Importa hooks do React para gerenciar estado e efeitos colaterais.
import Form from "./Form"; // Importa o componente Form para adicionar novos usuários.
import Table from "./Table"; // Importa o componente Table para exibir a lista de usuários.

import { httpHelper } from "../helpers/httpHelper"; // Importa um helper para facilitar requisições HTTP.

const CrudUser = () => {
  const [users, setUsers] = useState([]); // Define o estado para armazenar a lista de usuários.

  const url = "http://localhost:5000/users"; // URL base para a API de usuários.
  const api = httpHelper(); // Inicializa a instância do helper HTTP.

  // Usar useCallback para garantir que a referência de getUsers não mude, evitando chamadas desnecessárias.
  const getUsers = useCallback(() => {
    api
      .get(`${url}?_expand=companies`) // Faz uma requisição GET para buscar usuários, expandindo informações de empresas.
      .then((res) => {
        setUsers(res); // Atualiza o estado com a lista de usuários recebida da API.
      })
      .catch((err) => console.log(err)); // Captura e exibe erros no console.
  }, [api, url]); // Dependências para useCallback: api e url.

  // Adiciona getUsers como dependência de useEffect, garantindo que seja chamado ao montar o componente.
  useEffect(() => {
    getUsers(); // Chama a função para obter usuários quando o componente é montado.
  }, [getUsers]); // Dependência do useEffect: getUsers.

  // Função para adicionar um novo usuário.
  const postUser = (user) => {
    api
      .post(`${url}`, { body: user }) // Faz uma requisição POST para adicionar um novo usuário.
      .then(() => getUsers()) // Chama getUsers após sucesso para atualizar a lista de usuários.
      .catch((err) => console.log(err)); // Captura e exibe erros no console.
  };

  // Função para atualizar um usuário existente.
  const updateUser = (id, user) => {
    api
      .put(`${url}/${id}`, { body: user }) // Faz uma requisição PUT para atualizar o usuário especificado.
      .then(() => getUsers()) // Chama getUsers após sucesso para atualizar a lista de usuários.
      .catch((err) => console.log(err)); // Captura e exibe erros no console.
  };

  // Função para deletar um usuário.
  const deleteUser = (id) => {
    api
      .del(`${url}/${id}`, {}) // Faz uma requisição DELETE para remover o usuário especificado.
      .then(() => getUsers()) // Chama getUsers após sucesso para atualizar a lista de usuários.
      .catch((err) => console.log(err)); // Captura e exibe erros no console.
  };

  if (!users) return null; // Retorna null se a lista de usuários não estiver definida.

  return (
    <>
      <h3>New user</h3> 
      <Form postUser={postUser} /> 
      <div className="all-users">
        <h3>All users</h3>
        <Table
          users={users} // Passa a lista de usuários para o componente Table.
          setUsers={setUsers} // Passa a função setUsers para o componente Table.
          postUser={postUser} // Passa a função postUser para o componente Table.
          updateUser={updateUser} // Passa a função updateUser para o componente Table.
          deleteUser={deleteUser} // Passa a função deleteUser para o componente Table.
        />
      </div>
    </>
  );
};

export default CrudUser; // Exporta o componente CrudUser para uso em outras partes da aplicação.
