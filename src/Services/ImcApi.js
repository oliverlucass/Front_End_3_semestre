import axios from 'axios'

const ImcApi = {
    calcular: data => {return axios.post(`https://app.professordaniloalves.com.br/api/v1/imc/calcular`, data)}
}

export default ImcApi