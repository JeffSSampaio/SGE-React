import { useState, useEffect } from "react";
import ModalProduto from './ModalProduto';
import CabecalhoEstoque from './cabecalhoEstoque';
import TabelaEstoque from './TabelaEstoque';
import imgAdd from '../imgs/imgAddProd.svg';
import './cssestoque/estoque.css'; 

function Estoque() {
  // Carrega o estado inicial do localStorage
  const [produtos, setProdutos] = useState(() => {
    const produtosSalvos = localStorage.getItem("estoque");
    return produtosSalvos ? JSON.parse(produtosSalvos) : [];
  });

  const [produtoEditando, setProdutoEditando] = useState(null);
  const [modo, setModo] = useState(null); // 'editar' ou 'adicionar'

  // Salva a lista no localStorage sempre que 'produtos' mudar
  useEffect(() => {
    localStorage.setItem("estoque", JSON.stringify(produtos));
  }, [produtos]);

  const abrirModalEditar = (produto) => {
    setProdutoEditando(produto);
    setModo('editar');
  };

  const abrirModalAdicionar = () => {
    setProdutoEditando(null);
    setModo('adicionar');
  };

  const fecharModal = () => {
    setProdutoEditando(null);
    setModo(null);
  };

  const salvarProduto = (dados) => {
    if (modo === 'editar') {
      setProdutos(produtos.map(p => p.id === dados.id ? dados : p));
    } else {
      const novo = { ...dados, id: Date.now() };
      setProdutos([...produtos, novo]);
    }
    fecharModal();
  };

  const deletarProduto = (id) => {
    const confirmado = window.confirm("Tem certeza que deseja excluir este produto?");
    if (confirmado) {
      setProdutos(produtos.filter(p => p.id !== id));
    }
  };

  return (
    <div className='bodyEstoque'>
      <CabecalhoEstoque />
      <div className='containerEstoque'>
        <div className='containerTituloEstoque'>
          <h1 className='tituloTabela'>Estoque</h1>
          <button className='butaoaddprod' onClick={abrirModalAdicionar}>
            <img src={imgAdd} alt='adicionar produto' />
          </button>
        </div>
        <TabelaEstoque 
          produtos={produtos} 
          onEditar={abrirModalEditar} 
          onDeletar={deletarProduto} 
        />
      </div>

      {modo && (
        <ModalProduto
          produto={produtoEditando}
          onSalvar={salvarProduto}
          onFechar={fecharModal}
        />
      )}
    </div>
  );
}

export default Estoque;
