// Exporta a função 'httpHelper' que retorna um objeto com métodos para fazer requisições HTTP.
export const httpHelper = () => {
	// Função 'customFetch' que realiza uma requisição HTTP com uma configuração personalizada.
	const customFetch = async (url, options = {}) => {
		// Define o método HTTP padrão como 'GET', caso não seja especificado nas opções.
		const defaultMethod = "GET"
		
		// Define cabeçalhos padrão para as requisições, indicando que o conteúdo é JSON.
		const defaultHeaders = {
			"Content-Type": "application/json",
			Accept: "application/json",
		}

		// Cria um controlador de requisição para permitir o cancelamento da mesma.
		const controller = new AbortController()
		options.signal = controller.signal // Atribui o sinal do controlador às opções da requisição.

		// Define o método HTTP com base nas opções fornecidas ou usa o método padrão.
		options.method = options.method || defaultMethod

		// Define os cabeçalhos da requisição, combinando os cabeçalhos padrão com os fornecidos nas opções.
		options.headers = options.headers
			? { ...defaultHeaders, ...options.headers }
			: defaultHeaders

		// Transforma o corpo da requisição em uma string JSON, se existir, ou define como falso.
		options.body = JSON.stringify(options.body) || false

		// Remove o corpo da requisição das opções se não houver dados a serem enviados.
		if (!options.body) delete options.body

		// Define um tempo limite de 3 segundos para a requisição e a cancela se ultrapassar esse tempo.
		setTimeout(() => {
			controller.abort() // Aborta a requisição após 3 segundos.
		}, 3000)

		// Tenta executar a requisição HTTP usando 'fetch' com a URL e as opções configuradas.
		try {
			const response = await fetch(url, options) // Faz a requisição.
			return await response.json() // Retorna a resposta como JSON, se a requisição for bem-sucedida.
		} catch (err) {
			// Se ocorrer um erro durante a requisição, retorna o erro.
			return err
		}
	}

	// Função 'get' para realizar uma requisição HTTP do tipo GET.
	const get = (url, options = {}) => customFetch(url, options)

	// Função 'post' para realizar uma requisição HTTP do tipo POST.
	const post = (url, options) => {
		options.method = "POST" // Define o método como POST nas opções.
		return customFetch(url, options) // Chama 'customFetch' com a URL e as opções.
	}

	// Função 'put' para realizar uma requisição HTTP do tipo PUT.
	const put = (url, options) => {
		options.method = "PUT" // Define o método como PUT nas opções.
		return customFetch(url, options) // Chama 'customFetch' com a URL e as opções.
	}

	// Função 'del' para realizar uma requisição HTTP do tipo DELETE.
	const del = (url, options) => {
		options.method = "DELETE" // Define o método como DELETE nas opções.
		return customFetch(url, options) // Chama 'customFetch' com a URL e as opções.
	}

	// Retorna um objeto contendo os métodos 'get', 'post', 'put' e 'del'.
	return {
		get,
		post,
		put,
		del,
	}
}
