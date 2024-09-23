import React, { useState, useEffect } from "react"
import PropTypes from "prop-types" // Importa PropTypes para validação de tipos dos props
import { httpHelper } from "../helpers/httpHelper" // Importa a função helper para realizar requisições HTTP

// Componente DropCompanies que recebe as propriedades 'companiesId' e 'handleValue'
const DropCompanies = ({ companiesId, handleValue }) => {
	// Define o estado 'companies' para armazenar a lista de empresas e 'company' para armazenar o ID da empresa selecionada
	const [companies, setCompanies] = useState(null)
	const [company, setCompany] = useState(companiesId || 0) // Inicializa 'company' com 'companiesId' ou 0, se não fornecido

	const url = "http://localhost:5000/companies" // URL da API para buscar as empresas
	const api = httpHelper() // Instancia a função helper para realizar requisições

	// useEffect para buscar as empresas ao montar o componente
	useEffect(() => {
		api
			.get(url) // Realiza uma requisição GET para a URL especificada
			.then(res => {
				// Se a requisição for bem-sucedida, adiciona uma opção inicial e armazena as empresas no estado 'companies'
				const initialCompanies = [{ id: 0, name: "Select Company" }, ...res]
				setCompanies(initialCompanies)

				// Verifica se 'companiesId' é válido; se não for, define 'company' como 0
				if (!companiesId || !res.some(c => c.id === companiesId)) {
					setCompany(0)
				}
			})
			.catch(err => {
				// Caso ocorra um erro na requisição, loga o erro e define um valor de fallback para 'companies'
				console.log(err)
				setCompanies([{ id: 0, name: "Failed to load companies" }])
			})
	}, [companiesId]) // Dependência no array significa que o useEffect roda apenas quando 'companiesId' mudar

	// Renderiza um texto de loading enquanto as empresas estão sendo buscadas
	if (!companies) return <div>Loading...</div>

	// Renderiza o dropdown (select) com as empresas
	return (
		<select
			name='companiesId' // Nome do campo select, pode ser útil para envio em formulários
			value={company} // Valor atual do select, baseado no estado 'company'
			onChange={e => {
				// Evento disparado ao mudar o valor do select
				const selectedCompany = e.target.value // Obtém o valor da empresa selecionada
				setCompany(selectedCompany) // Atualiza o estado 'company'
				handleValue(e) // Chama a função handleValue passada via props para notificar a mudança ao componente pai
			}}
		>
			{companies.map(c => (
				// Mapeia a lista de empresas para criar os elementos de opção (option)
				<option value={c.id} key={c.id}>
					{c.name} {/* Exibe o nome da empresa */}
				</option>
			))}
		</select>
	)
}

// Definição das PropTypes para validar as propriedades do componente
DropCompanies.propTypes = {
	companiesId: PropTypes.number, // 'companiesId' deve ser um número
	handleValue: PropTypes.func.isRequired, // 'handleValue' é uma função obrigatória
}

export default DropCompanies // Exporta o componente para uso em outros lugares do projeto
