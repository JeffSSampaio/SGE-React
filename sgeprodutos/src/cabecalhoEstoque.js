import'./estoque.css'
import logo from './imgs/logoSgeProdutoLaranja.svg'

function CabecalhoEstoque() {
    return (
      <header className='headerEstoque'>
        <img src={logo} alt="Logo SGE Produtos" className='logoSgeProdutos'/>
      </header>
    );
}
export default CabecalhoEstoque;