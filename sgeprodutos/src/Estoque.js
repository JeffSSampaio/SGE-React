import TabelaEstoque from './TabelaEstoque';
import'./Tabela_estoque.css'
import'./estoque.css'
import logo from './logoSgeProdutoLaranja.svg'

function Estoque() {
  return(
  
    <div className='bodyEstoque'>
      <header className='headerEstoque'>
        <img src={logo} alt="Logo SGE Produtos" className='logoSgeProdutos'/>
      </header>
     
      <h1> Estoque </h1>
      <TabelaEstoque></TabelaEstoque>
     
      
    </div>
   
  )

}

export default Estoque;