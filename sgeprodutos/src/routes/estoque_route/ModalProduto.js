import { useState, useEffect } from 'react';
import './cssestoque/ModalProduto.css';

function ModalProduto({ produto, onSalvar, onFechar }) {
  const [form, setForm] = useState({
    id: null,
    nome: '',
    quantidade: '',
    unidade: '',
    codigoBarras: '',
  });

  useEffect(() => {
    if (produto) {
      setForm({
        id: produto.id || null,
        nome: produto.nome || '',
        quantidade: produto.quantidade || '',
        unidade: produto.unidade || '',
        codigoBarras: produto.codigoBarras || '',
      });
    } else {
      setForm({
        id: null,
        nome: '',
        quantidade: '',
        unidade: '',
        codigoBarras: '',
      });
    }
  }, [produto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || !form.quantidade || !form.unidade || !form.codigoBarras) {
      alert("Preencha todos os campos!");
      return;
    }
    if (form.codigoBarras.length !== 8) {
      alert("Código de barras deve ter Extamente 8 numeros!");
      return;
    }

    const codigoExistente = produto.some(
      (p) => p.codigoBarras === form.codigoBarras && p.id !== form.id 
     );

     if(codigoExistente){
      alert("Já existe um produto com esse código de barras !");
      return;
     }

    onSalvar({ ...form, quantidade: parseInt(form.quantidade) });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-conteudo">
        <h2>{produto ? 'Editar Produto' : 'Adicionar Produto'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome do produto"
            value={form.nome}
            onChange={handleChange}
          />
          <input
            type="number"
            name="quantidade"
            placeholder="Quantidade"
            value={form.quantidade}
            onChange={handleChange}
          />
          <input
            type="text"
            name="unidade"
            placeholder="Unidade (ex: kg, un)"
            value={form.unidade}
            onChange={handleChange}
          />
          <input
            type="text"
            name="codigoBarras"
            placeholder="Código de Barras"
            value={form.codigoBarras}
            onChange={handleChange}
          />
          <div className="botoesModal">
            <button type="submit" className="btnSalvar">Salvar</button>
            <button type="button" onClick={onFechar} className="btnCancelar">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalProduto;
