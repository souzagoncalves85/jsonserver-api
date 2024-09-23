import React, { useState } from "react"
import DropComapies from "./DropCompanies" // Corrigir o nome do componente para "DropCompanies" (atualmente está "DropComapies")

// Componente de formulário para adicionar ou atualizar informações de um usuário
const Form = ({ userData = {}, postUser, updateUser }) => {
	// Define o estado 'user' com os valores iniciais recebidos via 'userData' ou valores padrão
	const [user, setUser] = useState({
		name: userData.name ?? "", // Nome do usuário, vazio por padrão
		username: userData.username ?? "", // Nome de usuário, vazio por padrão
		email: userData.email ?? "", // E-mail do usuário, vazio por padrão
		phone: userData.phone ?? "", // Telefone do usuário, vazio por padrão
		companiesId: userData.companiesId ?? "0", // ID da empresa associada, "0" (não selecionado) por padrão
	})

	// Função para atualizar o estado 'user' com base nas alterações dos campos de entrada
	const handleValue = e => {
		// Atualiza o campo correspondente no estado 'user' com o valor do input alterado
		setUser({ ...user, [e.target.name]: e.target.value })
	}

	// Função para lidar com o envio do formulário
	const submitUser = e => {
		e.preventDefault() // Evita o comportamento padrão de recarregar a página ao enviar o formulário

		// Verifica se a empresa não foi selecionada, se for "0", não permite o envio
		if (user.companiesId === "0") return

		// Se 'userData.id' existir, atualiza o usuário existente
		if (userData.id) {
			updateUser(userData.id, user) // Chama a função de atualização passando o ID e os dados do usuário
		} else {
			// Caso contrário, adiciona um novo usuário
			postUser(user) // Chama a função de adição de usuário passando os dados do novo usuário
		}
	}

	return (
		// Formulário para adicionar ou editar um usuário, ao enviar, chama 'submitUser'
		<form onSubmit={submitUser} className='row'>
			{/* Campo de entrada para o nome do usuário */}
			<input
				type='text'
				name='name'
				value={user.name} // Valor do input vem do estado 'user'
				placeholder='Name' // Placeholder do campo de nome
				onChange={e => handleValue(e)} // Chama 'handleValue' para atualizar o estado quando o valor mudar
			/>
			{/* Campo de entrada para o e-mail do usuário */}
			<input
				type='email'
				name='email'
				value={user.email} // Valor do input vem do estado 'user'
				placeholder='Email' // Placeholder do campo de e-mail
				onChange={e => handleValue(e)} // Chama 'handleValue' para atualizar o estado quando o valor mudar
			/>
			{/* Campo de entrada para o telefone do usuário */}
			<input
				type='tel'
				name='phone'
				value={user.phone} // Valor do input vem do estado 'user'
				placeholder='Phone (10)' // Placeholder do campo de telefone
				pattern='[0-9]{10}' // Restringe a entrada a um número de telefone com 10 dígitos
				onChange={e => handleValue(e)} // Chama 'handleValue' para atualizar o estado quando o valor mudar
			/>
			{/* Componente DropCompanies para seleção da empresa associada ao usuário */}
			<DropComapies 
				companiesId={user.companiesId} // Passa o ID da empresa selecionada para o componente
				handleValue={handleValue} // Passa a função 'handleValue' para lidar com mudanças na seleção da empresa
			/>
			{/* Botão de envio do formulário, exibe "Add new user" ou "Save user" baseado na presença de 'userData.id' */}
			<input
				className='btn-submit' // Classe CSS para estilização do botão
				type='submit'
				value={`${!userData.id ? "Add new user" : "Save user"}`} // Texto do botão baseado na existência de 'userData.id'
			/>
		</form>
	)
}

export default Form // Exporta o componente 'Form' para ser usado em outras partes da aplicação
