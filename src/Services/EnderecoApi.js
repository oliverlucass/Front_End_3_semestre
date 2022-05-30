import axios from 'axios'

const EnderecoApi = {
    getEndereco: cep => {return axios.get(`https://app.professordaniloalves.com.br/api/v1/endereco/${cep}`)},
    getEstados: () => {return axios.get(`https://app.professordaniloalves.com.br/api/v1/endereco/estados`)}
}


export default EnderecoApi