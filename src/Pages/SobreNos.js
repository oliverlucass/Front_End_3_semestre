import { Fragment } from "react"

const SobreNos = () => {
    return (
        <Fragment>
            <hr />
            <section className="missao-visao-valores" id="sessaoSobreNos">
                <h4 className="display-4 text-center text-info">Sobre nós</h4>
                <span className="text-center introducao-missao-visao-valores my-5">
                    Nós do Saúde UNASP levamos muito a sério nosso serviço e atendimento ao cliente, veja abaixo nossa Missão, Visão e Valores! 
                </span>
                <div className="row">
                    <div className="missao col-md-4">
                        <span className="display-4 text-info">Missão</span>
                        <span className="texto">
                            Construir um Brasil com muito mais saúde!
                        </span>
                    </div>
                    <div className="visao  col-md-4">
                        <span className="display-4 text-info">Visão</span>
                        <span className="texto">
                            Ser a referência brasileira em saúde e ainda tendo o melhor atendimento ao cliente!
                        </span>
                    </div>
                    <div className="valores  col-md-4">
                        <span className="display-4 text-info">Valores</span>
                        <div className="texto">
                            <ul>
                                <li>Confiança</li>
                                <li>Comprometimento</li>
                                <li>Respeito</li>
                                <li>Integridade</li>
                            </ul>
                        </div>
                    </div>               
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <iframe title="mapa" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1459.2515734266078!2d-46.78208003386618!3d-23.66644551405044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1648957274059!5m2!1spt-BR!2sbr" width="100%" height="300" ></iframe>
                    </div>
                    <div className="col-md-6">
                        <p>O Saúde UNASP Está localizado na Estrada de Itapecerica, 5859 - Capão Redondo, São Paulo - SP, 05890-020.</p>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default SobreNos