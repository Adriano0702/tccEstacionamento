/** 
 Essa função recebe um timestamp (data e hora em formato de milissegundos) e o converte para um formato legível no padrão brasileiro (dd/mm/aaaa hh:mm:ss). Isso facilita a exibição de datas formatadas na interface do aplicativo. 
 **/


// Define uma função chamada formatData que recebe um timestamp como parâmetro
const formatData = (timestamp) => {

  // Define as opções de formatação para a data e hora
  const options = {
    year: 'numeric',  // Exibe o ano com quatro dígitos
    month: 'numeric', // Exibe o mês como número (1-12)
    day: 'numeric',  // Exibe o dia como número (1-31)
    hour: 'numeric', // Exibe a hora no formato 24h
    minute: 'numeric', // Exibe os minutos
    second: 'numeric', // Exibe os segundos
  };

   // Cria uma nova instância do formatador de data/hora no padrão brasileiro (pt-BR)
  // e aplica a formatação ao timestamp recebido
  const dataFormatada = new Intl.DateTimeFormat('pt-BR', options).format(new Date(timestamp)); 

  // Retorna a data formatada como string
  return dataFormatada;
};

// Exporta a função formatData para que possa ser usada em outras partes do projeto
export default formatData;