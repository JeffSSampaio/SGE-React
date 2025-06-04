import'./cssestoque/Tabela_estoque.css'
import editIcon from '../imgs/imgeditProd.svg'
import deleteIcon from '../imgs/imgdelProd.svg'
function TabelaEstoque(){
    return(
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
          
          <td className='acoesTabela'>
            <button className="btnAcaoTabela  btneditarProd"><img src={editIcon} alt="Editar" /></button>
            <button className="btnAcaoTabela  btndelProd"><img src={deleteIcon} alt="Excluir" /></button>
          </td>
        </tr>
      </tbody>
     </table>
    )
}
export default TabelaEstoque;