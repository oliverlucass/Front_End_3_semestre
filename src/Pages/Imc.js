import { Fragment, React, Component, createRef } from "react"
import ImcApi from "../Services/ImcApi"
import InputMask from 'react-input-mask-format'
import ModalAlert from "../Components/ModalAlert"
class Imc extends Component{
    constructor(props) {
        super(props)
        this.dadosImc = [
            {descricao: "MENOR QUE 18,5", classificacao: "MAGREZA", grau: "0"},
            {descricao: "ENTRE 18,5 E 24,9", classificacao: "NORMAL", grau: "0"},
            {descricao: "ENTRE 25,0 E 29,9", classificacao: "MAGREZA", grau: "I"},
            {descricao: "ENTRE 30,0 E 39,9", classificacao: "MAGREZA", grau: "II"},
            {descricao: "MAIOR QUE 40,0", classificacao: "OBESIDADE GRAVE", grau: "III"}
        ]
        this.modalRef = createRef()
        this.state = {altura: "", peso: "", erros: {altura: [], peso: []}}
    }

    mostrarModal = (title, body) => {
        this.modalRef.current.handleShow({show: true, title, body})
    }

    escutadorDeInput = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    resetErros = () =>{
        const erros = "erros"
        this.setState({ 
            [erros]: {altura: [], peso: []}
        })
    }

    calcularImc = () => {
        this.resetErros()
        const { altura, peso} = this.state
        

        ImcApi.calcular({altura, peso})
        .then( resp => {
            this.mostrarModal("Cálculo de IMC", resp.data.message)
        })
        .catch( (e) =>{
            if(e.response && e.response.status === 422){
                let errosCalcImc = {}
                Object.entries(e.response.data.errors).forEach((obj, index) => {
                    index === 0 && document.querySelector(`[name=${[obj[0]]}`).focus()
                    errosCalcImc = {...errosCalcImc, [obj[0]]: [obj[1]]}
                })

                this.setState({ 'erros': {...this.state.erros, ...errosCalcImc}})
            }else if(e.response 
                && e.response.data
                 && e.response.data.message){
                    this.mostrarModal("Cálculo de IMC", e.response.data.message)
            }else{
                this.mostrarModal("Cálculo de IMC", "Ocorreu um erro ao tentar calcular seu IMC.")
                console.log(e)
            }
        })
    }

    render() {
        const { altura, peso } = this.state

        return (
            <Fragment>
                <hr />
                <section className="calculoIMC" id="sessaoCalculoIMC">
                    <h2 className="display-4 text-center text-info">Cálculo de IMC</h2>
                    <div className="row">
                        <div className="col-lg-6">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">IMC</th>
                                        <th scope="col">CLASSIFICAÇÃO</th>
                                        <th scope="col">OBESIDADE (GRAU)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.dadosImc.map( (item, idx) =>  
                                        <tr key={idx}>
                                            <td key={`${idx}_descricao`}>{item.descricao}</td>
                                            <td key={`${idx}_classificacao`}>{item.classificacao}</td>
                                            <td key={`${idx}_grau`}>{item.grau}</td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-6">
                            <p className="text-justify">
                                IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.
                                O índice é calculado da seguinte maneira: divide-se o peso do paciente pela sua altura elevada ao quadrado. Diz-se que o indivíduo tem peso normal quando o resultado do IMC está entre 18,5 e 24,9.
                            </p>
                            <form id="formImc">
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <label htmlFor="pesoImc">Peso:</label>
                                        <InputMask 
                                            type="text" 
                                            value={peso} 
                                            name="peso" 
                                            onChange={this.escutadorDeInput} 
                                            className={"form-control" +  (this.state.erros.peso.length > 0 ? " is-invalid"  : "")} 
                                            id="pesoImc" 
                                            placeholder="080.0" 
                                            mask="999.99"
                                        />
                                        <div className="invalid-feedback">
                                            {this.state.erros.peso.map( (item, index) => <div key={index} >{item}</div>)}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="alturaImc">Altura:</label>
                                        <InputMask 
                                            type="text" 
                                            value={altura} 
                                            name="altura" 
                                            onChange={this.escutadorDeInput} 
                                            className={"form-control" +  (this.state.erros.altura.length > 0? " is-invalid"  : "")} 
                                            id="alturaImc" 
                                            placeholder="1.70" 
                                            mask="9.99"
                                        />
                                        <div className="invalid-feedback">
                                            {this.state.erros.altura.map( (item, index) => <div key={index} >{item}</div>)}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <input type="button" value="Calcular" className="btn btn-primary mt-2" id="btnCalcularIMC" onClick={this.calcularImc}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <ModalAlert ref={this.modalRef} />
                </section>
            </Fragment>
        )
    }
    
}

export default Imc