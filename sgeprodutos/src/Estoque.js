import'./Tabela_estoque.css'
import'./estoque.css'

function Estoque() {
  return(
    <div className='bodyEstoque'>
     <h1>Estoque</h1>
     <table className='tabelaEstoque'>
      
      <thead>
        <th>ID</th>
        <th>Produto</th>
        <th>Quantidade</th>
        <th>Unidade</th>
        <th>Código de Barras</th>
      </thead>
      <tbody>
        <tr>    {/* Teste */}       
          <td>1</td>
          <td>Maçã</td>
          <td>20</td>
          <td>kg</td>
          <td>22345525564</td>
        </tr>
          <tr>    {/* Teste */}       
          <td>2</td>
          <td>Banana</td>
          <td>4</td>
          <td>kg</td>
          <td>525234564</td>
        </tr>
      </tbody>
     </table>
    </div>
  )

}

export default Estoque;