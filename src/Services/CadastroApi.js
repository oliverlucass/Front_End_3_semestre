import axios from 'axios'

const CadastroApi = {
    cadastrar: data => {return axios.post(`https://app.professordaniloalves.com.br/api/v1/cadastro`, data)},
    consultarCadastro: documento => {return axios.get(`https://app.professordaniloalves.com.br/api/v1/cadastro/${documento}`)},
    deletarCadastro: documento => {return axios.delete(`https://app.professordaniloalves.com.br/api/v1/cadastro/${documento}`)}
}

export default CadastroApi