// Importa o componente de ícone do logo
import { LogoIcon } from "./assets/icons";
// Importa o componente principal de CRUD para usuários
import CrudUser from "./components/CrudUser";
// Importa o arquivo de estilos CSS para a aplicação
import "./styles/App.css";

// Componente principal da aplicação
function App() {
	return (
		<>
			<header>
				<div className='header__content'>
					{/* Seção do logo, que contém o ícone e o título */}
					<div className='logo'>
						{/* Componente do ícone do logo */}
						<LogoIcon />
						{/* Título da aplicação em negrito */}
						<strong>JSON SERVER API</strong>
					</div>
				</div>
			</header>
			<main>
				{/* Componente responsável pelo CRUD de usuários */}
				<CrudUser />
			</main>
		</>
	)
}

// Exporta o componente App como padrão
export default App;
