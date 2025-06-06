import { useState, useEffect } from "react";
import ModalProduto from './ModalProduto';
import CabecalhoEstoque from './cabecalhoEstoque';
import TabelaEstoque from './TabelaEstoque';
import imgAdd from '../imgs/imgAddProd.svg';
import './cssestoque/estoque.css';
import exportImg from '../imgs/botaoRell.svg'

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
      let id = 1;
      if(produtos.length > 0){
        id = Math.max(...produtos.map(p => Number(p.id))) + 1;
      }
      const novo = { ...dados, id: id };
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

  function exportarCSV() {
  if (!produtos.length) {
    alert("Nenhum produto para exportar!");
    return;
  }
  const confirmarExportacao = window.confirm("Tem certeza que quer exportar o relatório do estoque?")
if(confirmarExportacao){ 
  const header = ["ID", "Nome", "Quantidade", "Unidade", "Código de Barras"];
  const linhas = produtos.map(p =>
    [p.id, p.nome, p.quantidade, p.unidade, p.codigoBarras].join(",")
  );
  const csvContent = [header.join(","), ...linhas].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Relatório-estoque-sgeprodutos.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  }
}
  return (
    <div className='bodyEstoque'>
      <CabecalhoEstoque />
      <div className='containerEstoque'>
        <div className='linhaSuperior'>
          <h1 className='tituloTabela'>Estoque</h1>
          <div className="botoesSuperiores">
            <button className='butaoaddprod' onClick={abrirModalAdicionar}>
              <img src={imgAdd} alt='adicionar produto' />
            </button>
            <button className="butaoCsv" onClick={exportarCSV}>
              <img src={exportImg} alt='Exportar Relatorio' />
            </button>
          </div>
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
