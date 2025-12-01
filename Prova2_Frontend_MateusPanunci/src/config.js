
// const BASE_URL = "http://localhost:8080"; // Se estiver rodando tudo na mesma máquina (PC)
const BASE_URL = "http://(Ip_Internet):8080"; // Wi-fi, dispositivos diferentes (troque o Ip_Internet pelo Endereço IPv4 usando o comando ipconfig no terminal do windows)

// Exporta a URL completa já com o /apps
export const API_URL = `${BASE_URL}/apps`;