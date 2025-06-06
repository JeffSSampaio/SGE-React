import { useState, useEffect } from "react";
import { produtosService } from '../../services/produtosService';
import ModalProduto from './ModalProduto';
import CabecalhoEstoque from './cabecalhoEstoque';
import TabelaEstoque from './TabelaEstoque';
import imgAdd from '../imgs/imgAddProd.svg';
import './cssestoque/estoque.css';
import exportImg from '../imgs/botaoRell.svg'

function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [modo, setModo] = useState(null); // 'editar' ou 'adicionar'

  useEffect(() => {
    // Escuta em tempo real a coleção de produtos (já ordenada por id)
    const unsubscribe = produtosService.ouvirTodos(setProdutos);
    return () => unsubscribe(); // cleanup ao desmontar
  }, []);

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


  const salvarProduto = async (dados) => {
    try {
      if (modo === 'editar') {
        await produtosService.atualizar(dados.id, dados);
        alert("Produto atualizado com sucesso!");
      } else {
        await produtosService.adicionar(dados);
        alert("Produto adicionado com sucesso!");
      }
      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto. Tente novamente.");
    }
  };

  const deletarProduto = async (id) => {
    const confirmado = window.confirm("Tem certeza que deseja excluir este produto?");
    if (confirmado) {
      try {
        await produtosService.deletar(id);
        alert("Produto excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
        alert("Erro ao excluir produto. Tente novamente.");
      }
    }
  };

  function exportarCSV() {
    if (!produtos.length) {
      alert("Nenhum produto para exportar!");
      return;
    }

    const confirmarExportacao = window.confirm("Tem certeza que quer exportar o relatório do estoque?");
    if (confirmarExportacao) { 
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
        <TabelaEstoque produtos={produtos} onEditar={abrirModalEditar} onDeletar={deletarProduto} />
      </div>

      {modo && <ModalProduto produto={produtoEditando} onSalvar={salvarProduto} onFechar={fecharModal} />}
    </div>
  );
}

export default Estoque;
