import { Component, Fragment, React, createRef } from "react"
import EnderecoApi from "../Services/EnderecoApi" 
import CadastroApi from "../Services/CadastroApi"
import ReactInputMask from "react-input-mask-format"
import ModalAlert from "../Components/ModalAlert"
import ModalAlterarRemover from "../Components/ModalAlterRemover"

class Cadastro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listaEstados: [],
            formCadastro: {...{}, ...this.getFieldsForm()},
            erros: {...{}, ...this.getFieldErrors()}
        }

        this.modalRef = createRef()
    }

    aceitarTermo = () =>{
        this.setState({ 
            formCadastro: {
                ...this.state.formCadastro, aceito: !this.state.formCadastro.aceito
            }
        })
    }

    getFieldsForm = () => {
        return  {
                nomeCompleto: "",
                dataNascimento: "",
                sexo: "F",
                cep: "",
                cpf: "",
                uf: "",
                cidade: "", 
                logradouro: "", 
                numeroLogradouro: "", 
                email: "", 
                expectativa: "", 
                aceito: false
        }
    }

    getFieldErrors = () => {
        return {
            nomeCompleto: [],
            dataNascimento: [], 
            sexo: [], 
            cep: [], 
            cpf: [], 
            uf: [],  
            cidade: [],  
            logradouro: [],  
            numeroLogradouro: [],  
            email: [],  
            expectativa: []
        }
    }

    mostrarModal = (title, body) => {
        this.modalRef.current.handleShow({show: true, title, body})
    }

    mostralModalAlterarRemover = (title, body) => {
        this.modalRef.current.handleShow({show: true, title, body})
    }

    componentDidMount(){
        EnderecoApi.getEstados()
            .then(resp =>  this.setState( {listaEstados: resp.data}) )
    }

    resetErros = () =>{
        this.setState({ 
            erros: {...{}, ...this.getFieldErrors()}
        })
    }

    escutadorDeInputFormCadastro = event => {
        const { name, value } = event.target
        this.setState({
            formCadastro: {...this.state.formCadastro, [name]: value }
        })
    }

    pesquisarEndereco = () =>{
        EnderecoApi.getEndereco(this.state.formCadastro.cep)
        .then( resp => {
            this.setState({
                formCadastro: {...this.state.formCadastro, ...{
                    cidade: resp.data.localidade,
                    uf: resp.data.uf,
                    logradouro: resp.data.logradouro
                }}
            })
        })
    }

    pesquisarDocumento = () =>{
        CadastroApi.consultarCadastro(this.state.formCadastro.cpf)
        .then( response => {
            console.log(response)
            if(response.status == 200){
                this.mostralModalAlterarRemover("Atenção", "Usuario Cadastro!!")
            }
        })
    }

    enviarFormularioCadastro = () => { 
        this.resetErros()
        const form = this.state.formCadastro
        form.cpf = form.cpf.replace(/\D/g, "")
        form.cep = form.cep.replace(/\D/g, "")

        CadastroApi.cadastrar(form)
        .then( response => { 
            if(response.data && response.data.message){
                this.mostrarModal("Atenção!", response.data.message)
            }else{
                this.mostrarModal("Atenção!", response.data.message)
            }
            this.setState( {formCadastro: this.getFieldsForm()})
        })
        .catch( e =>{
            console.log(e.response) 
            if(e.response && e.response.status === 422 && e.response.data.errors){
                let errosFormCadastro = {}
                Object.entries(e.response.data.errors).forEach((obj, index) => {
                    const nomeDoCampo = obj[0]
                    const listaDeErros = obj[1]
                    if(index === 0){
                        this[`ref-cadastro-${nomeDoCampo}`].focus()
                    }
                    errosFormCadastro = {...errosFormCadastro, [nomeDoCampo]: listaDeErros}
                })
                this.setState({ 'erros': {...this.state.erros, ...errosFormCadastro}})
            }else if(e.response 
                && e.response.data
                    && e.response.data.message){
                this.mostrarModal("Atenção!", e.response.data.message)
            }else{
                this.mostrarModal("Atenção!", "Ocorreu um erro inesperado...")
            }
        })  
    }
    
    render() {
        const formCadastro = this.state.formCadastro
        return (
            <Fragment>
                <hr />
                <section className="cadastro" id="sessaoCadastro">
                    <h3 className="display-4 text-center text-info">Cadastro</h3>
                    <span className="texto-formulario">
                        Você quer ter uma <strong>vida saudável</strong>, com muito mais <strong>vigor</strong> e <strong>longevidade</strong>?
                        Preencha o formulário abaixo e um de nossos especialistas entrará em contato com você.
                    </span>
                    <form id="formCadastro" className="mt-5">
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <label htmlFor="cadastroNomeCompleto">Nome Completo:</label>
                                <input 
                                type="text" 
                                className={"form-control" +  (this.state.erros.nomeCompleto.length > 0 ? " is-invalid"  : "")} 
                                id="cadastroNomeCompleto" 
                                value={formCadastro.nomeCompleto} 
                                onChange = {this.escutadorDeInputFormCadastro}
                                ref={ input => this["ref-cadastro-nomeCompleto"] = input }
                                name="nomeCompleto" 
                                placeholder="Nome Completo" />
                                <div className="invalid-feedback">
                                    {this.state.erros.nomeCompleto.map( (item, index) => <div key={index} >{item}</div>)}
                                 </div>
                            </div>
                            
                            <div className="col-md-4 mb-3">
                                <label htmlFor="dataNascimento">Data de Nascimento:</label>
                                <input 
                                type="date" 
                                className={"form-control" +  (this.state.erros.dataNascimento.length > 0 ? " is-invalid"  : "")} 
                                value={formCadastro.dataNascimento}
                                name="dataNascimento"
                                onChange = {this.escutadorDeInputFormCadastro}
                                ref={ input => this["ref-cadastro-dataNascimento"] = input }
                                id="dataNascimento" />
                                <div className="invalid-feedback">
                                    {this.state.erros.dataNascimento.map( (item, index) => <div key={index} >{item}</div>)}
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="row">
                                    <fieldset>
                                        <legend className="col-form-label col-sm-2 pt-0">Sexo:</legend> 
                                        <div className="col-sm-10">
                                            <div className="form-check">
                                                <input className="form-check-input" 
                                                type="radio" 
                                                name="sexo" 
                                                onChange={this.escutadorDeInputFormCadastro}
                                                id="cadastroFeminino" 
                                                value="F" 
                                                defaultChecked={formCadastro.sexo==="F"}/>
                                                    <label className="form-check-label" htmlFor="cadastroFeminino" name="sexo">
                                                        Feminino
                                                    </label>
                                            </div>
                                            <div className="form-check">
                                                <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                onChange={this.escutadorDeInputFormCadastro}
                                                name="sexo" 
                                                id="cadastroMasculino" 
                                                value="M" 
                                                defaultChecked={formCadastro.sexo==="M"}/>
                                                    <label className="form-check-label" htmlFor="cadastroMasculino">
                                                        Masculino
                                                    </label>
                                            </div>
                                            <div className="form-check">
                                                <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                name="sexo" 
                                                onChange={this.escutadorDeInputFormCadastro}
                                                id="cadastroOutro" 
                                                value="O"
                                                defaultChecked={formCadastro.sexo==="O"}
                                                 />
                                                    <label className="form-check-label" htmlFor="cadastroOutro">
                                                        Outro
                                                    </label>
                                                    <div className="invalid-feedback">
                                        {this.state.erros.sexo.map( (item, index) => <div key={index} >{item}</div>)}
                                        </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="cadastroCpf">CPF:</label>
                                <ReactInputMask 
                                type="text" 
                                className={"form-control" +  (this.state.erros.cpf.length > 0 ? " is-invalid"  : "")}
                                id="cpf"
                                value={formCadastro.cpf} 
                                onChange = {this.escutadorDeInputFormCadastro}
                                onBlur = {this.pesquisarDocumento}
                                ref={ input => this["ref-cadastro-cpf"] = input }
                                name= "cpf"
                                placeholder="000.000.000-00" 
                                mask="999.999.999-99" />
                                <div className="invalid-feedback">
                                    {this.state.erros.cpf.map( (item, index) => <div key={index} >{item}</div>)}
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="cadastroCep">CEP:</label>
                                <ReactInputMask 
                                type="text" 
                                className={"form-control" +  (this.state.erros.cep.length > 0 ? " is-invalid"  : "")} 
                                id="cep" 
                                value={formCadastro.cep}
                                onChange={this.escutadorDeInputFormCadastro}
                                ref={ input => this["ref-cadastro-cep"] = input }
                                onBlur={this.pesquisarEndereco}
                                name="cep"
                                placeholder="00000-000" 
                                mask="99999-999" />
                                <div className="invalid-feedback">
                                    {this.state.erros.cep.map( (item, index) => <div key={index} >{item}</div>)}
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cadastroLogradouro">Logradouro:</label>
                                <input type="text" 
                                className={"form-control" +  (this.state.erros.logradouro.length > 0 ? " is-invalid"  : "")} 
                                name="logradouro"
                                id="cadastroLogradouro" 
                                value={formCadastro.logradouro}
                                onChange={this.escutadorDeInputFormCadastro}
                                ref={ input => this["ref-cadastro-logradouro"] = input }
                                placeholder="Logradouro" />
                                <div className="invalid-feedback">
                                    {this.state.erros.logradouro.map( (item, index) => <div key={index} >{item}</div>)}
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="cadastroNumeroLogradouro">Número Logradouro:</label>
                                <input 
                                type="text" 
                                className={"form-control" +  (this.state.erros.numeroLogradouro.length > 0 ? " is-invalid"  : "")}
                                id="cadastroNumeroLogradouro" 
                                value={formCadastro.numeroLogradouro}
                                onChange = {this.escutadorDeInputFormCadastro}
                                ref={ input => this["ref-cadastro-numeroLogradouro"] = input }
                                name="numeroLogradouro"
                                placeholder="Número Logradouro" />
                                <div className="invalid-feedback">
                                    {this.state.erros.numeroLogradouro.map( (item, index) => <div key={index} >{item}</div>)}
                                </div> 
                            </div>
                            <div className="col-md-12 mb-3">
                                <label htmlFor="cadastroEmail">Endereço de email:</label>
                                <input 
                                type="email" 
                                className={"form-control" +  (this.state.erros.email.length > 0 ? " is-invalid"  : "")} 
                                id="cadastroEmail" 
                                value={formCadastro.email} 
                                onChange = {this.escutadorDeInputFormCadastro}
                                ref={ input => this["ref-cadastro-email"] = input }
                                name="email" 
                                aria-describedby="emailHelp" 
                                placeholder="Seu email" />
                                <div className="invalid-feedback">
                                    {this.state.erros.email.map( (item, index) => <div key={index} >{item}</div>)}
                                </div>
                                <small id="emailHelp" className="form-text text-muted">Nunca vamos compartilhar seu email, com ninguém.</small>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="mr-sm-2" htmlFor="cadastroUf">Estado:</label>
                                <select 
                                className={"form-control custom-select mr-sm-2" +  (this.state.erros.uf.length > 0 ? " is-invalid"  : "")} 
                                id="cadastroUf" 
                                name="uf"
                                onChange = {this.escutadorDeInputFormCadastro}
                                ref={ input => this["ref-cadastro-uf"] = input }
                                value={formCadastro.uf}>
                                    <option value="">Selecione...</option>
                                    {this.state.listaEstados.map( item => <option key={item.uf} value={item.uf}>{item.nome}</option>)}
                                </select>
                                <div className="invalid-feedback">
                                    {this.state.erros.uf.map( (item, index) => <div key={index} >{item}</div>)}
                                </div>
                            </div>
                            <div className="col-md-8 mb-3">
                                <label htmlFor="cadastroCidade">Cidade:</label>
                                <input type="text" 
                                    className={"form-control" +  (this.state.erros.cidade.length > 0 ? " is-invalid"  : "")} 
                                    id="cadastroCidade"
                                    name="cidade"
                                    onChange = {this.escutadorDeInputFormCadastro}
                                    ref={ input => this["ref-cadastro-cidade"] = input }
                                    value={formCadastro.cidade}
                                    placeholder="Cidade" />
                                <div className="invalid-feedback">
                                    {this.state.erros.cidade.map( (item, index) => <div key={index} >{item}</div>)}
                                </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <label htmlFor="cadastroExpectativa">Qual sua expectativa?</label>
                            <textarea 
                                className={"form-control" +  (this.state.erros.expectativa.length > 0 ? " is-invalid"  : "")} 
                                id="cadastroExpectativa" 
                                name="expectativa"
                                value={formCadastro.expectativa}
                                onChange = {this.escutadorDeInputFormCadastro}
                                ref={ input => this["ref-cadastro-expectativa"] = input }
                                rows="5"></textarea>
                                <div className="invalid-feedback">
                                    {this.state.erros.expectativa.map( (item, index) => <div key={index} >{item}</div>)}
                                </div>
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="cadastroDeAcordo" onChange={this.aceitarTermo} checked={formCadastro.aceito}/>
                                <label className="form-check-label" htmlFor="cadastroDeAcordo">Estou de acordo com os termos</label>
                            </div>
                            <div className="col-md-12 mb-3">
                                <button id="btnSubmitCadastro" type="button" className="btn btn-primary" onClick={this.enviarFormularioCadastro} disabled={!formCadastro.aceito}>Enviar</button>
                            </div>
                        </div>
                    </form>
                </section>
                <ModalAlert ref={this.modalRef} />
                <ModalAlterarRemover ref={this.modalRef} />
            </Fragment>
        )
    }
    
}

export default Cadastro;
