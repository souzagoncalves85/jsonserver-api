// Importa a biblioteca React
import React from "react";
// Importa o ReactDOM para manipulação do DOM
import ReactDOM from "react-dom";
// Importa o componente principal da aplicação
import App from "./App";

// Renderiza o componente App dentro do elemento com id "root" no DOM
ReactDOM.render(
  <React.StrictMode>
    {/* O modo estrito ativa verificações adicionais para ajudar a identificar problemas */}
    <App />
  </React.StrictMode>,
  document.getElementById("root") // Seleciona o elemento do DOM onde a aplicação será montada
);
