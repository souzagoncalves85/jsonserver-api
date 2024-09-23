import React from "react"
import Form from "./Form" // Importa o componente de formulário 'Form' para edição de usuários

// Componente 'Table' para exibir uma tabela de usuários e permitir operações de CRUD (criação, atualização, exclusão)
const Table = ({ users, postUser, updateUser, deleteUser }) => {
	// Função para alternar a visibilidade do formulário de atualização para um usuário específico
	const showUpdateUser = id => {
		const form = document.getElementsByClassName(`show-form-${id}`) // Seleciona o elemento com a classe específica do formulário
		form[0].classList.toggle("hide-form") // Alterna a classe 'hide-form' para mostrar ou ocultar o formulário
	}

	// Componente 'Row' para representar cada linha da tabela com os dados de um usuário específico
	const Row = ({ user }) => {
		return (
			<>
				{/* Linha da tabela exibindo os detalhes do usuário */}
				<div className='row'>
					{/* Exibe o nome do usuário */}
					<div>{user.name}</div>
					{/* Exibe o e-mail do usuário */}
					<div>{user.email}</div>
					{/* Exibe o telefone do usuário */}
					<div>{user.phone}</div>
					{/* Exibe o nome da empresa associada ao usuário */}
					<div>{user.companies.name}</div>
					{/* Botões de ação para atualizar ou excluir o usuário */}
					<div className='buttons'>
						{/* Botão para mostrar/ocultar o formulário de atualização do usuário */}
						<button onClick={() => showUpdateUser(user.id)}>Update</button>
						{/* Botão para excluir o usuário, chama a função 'deleteUser' passando o ID do usuário */}
						<button onClick={() => deleteUser(user.id)}>Delete</button>
					</div>
				</div>
				{/* Formulário de atualização do usuário que está inicialmente oculto ('hide-form') */}
				<div className={`hide-form show-form-${user.id}`}>
					{/* Componente de formulário 'Form' para edição do usuário, com os dados atuais do usuário */}
					<Form userData={user} postUser={postUser} updateUser={updateUser} />
				</div>
			</>
		)
	}

	return (
		<div className='table'>
			{/* Cabeçalhos da tabela */}
			<div className='titles'>
				<div>Name</div> {/* Cabeçalho para o nome */}
				<div>Email</div> {/* Cabeçalho para o e-mail */}
				<div>Phone</div> {/* Cabeçalho para o telefone */}
				<div>Company</div> {/* Cabeçalho para a empresa */}
				<div>Actions</div> {/* Cabeçalho para as ações */}
			</div>
			{/* Corpo da tabela com as linhas dos usuários */}
			<div className='rows'>
				{/* Verifica se 'users' não é nulo e mapeia cada usuário para o componente 'Row' */}
				{users && users.map(u => <Row user={u} key={u.id} />)}
			</div>
		</div>
	)
}

export default Table // Exporta o componente 'Table' para ser usado em outras partes da aplicação
