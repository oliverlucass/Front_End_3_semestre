import 'bootstrap/dist/css/bootstrap.min.css'

import Menu from './Pages/Menu'
import Home from './Pages/Home'
import Imc from './Pages/Imc'
import Cadastro from './Pages/Cadastro'
import SobreNos from './Pages/SobreNos'
import Footer from './Pages/Footer'

function App() {
  return (
    <div>
      <Menu />
      <main className="container">
        <Home />
        <Imc />
        <Cadastro />
        <SobreNos />
        <Footer />
      </main>
    </div>
  )
}

export default App
