import TabelaEstoque from './TabelaEstoque';
import'./Tabela_estoque.css'
import CabecalhoEstoque from './cabecalhoEstoque';
import'./estoque.css'
import imgAdd from './imgs/imgAddProd.svg'
function Estoque() {
  return(
  
    <div className='bodyEstoque'>
 
     <CabecalhoEstoque></CabecalhoEstoque>
     
    <div className='containerEstoque'>
      <div className='containerTituloEstoque'>
      <h1 className='tituloTabela'> Estoque </h1>
      <button className='butaoaddprod' > 
      <img src={imgAdd} alt='adicionar produto'></img>  
      </button>
      </div>
      <TabelaEstoque></TabelaEstoque>
     
    </div>

     
    </div>
   
  )

}

export default Estoque;