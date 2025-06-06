import './cssestoque/Tabela_estoque.css'; 
import editIcon from '../imgs/imgeditProd.svg';
import deleteIcon from '../imgs/imgdelProd.svg';

function TabelaEstoque({ produtos, onEditar, onDeletar }) {
  return (
    <table className='tabelaEstoque'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Unidade</th>
          <th>Código de Barras</th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto) => (
          <tr key={produto.id}>
            <td>{produto.id}</td>
            <td>{produto.nome}</td>
            <td>{produto.quantidade}</td>
            <td>{produto.unidade}</td>
            <td>{produto.codigoBarras}</td>
            <td className='acoesTabela'>
              <button className="btnAcaoTabela btneditarProd" onClick={() => onEditar(produto)}>
                <img src={editIcon} alt="Editar" />
              </button>
              <button className="btnAcaoTabela btndelProd" onClick={() => onDeletar(produto.id)}>
                <img src={deleteIcon} alt="Excluir" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TabelaEstoque;
