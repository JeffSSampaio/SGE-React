import'./Estoque.css'

function Estoque() {
  return(
    <div>
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
          <td>maçã</td>
          <td>20</td>
          <td>kg</td>
          <td>22345525564</td>
        </tr>
      </tbody>
     </table>
    </div>
  )

}

export default Estoque;