import { 
  collection, 
  getDoc,       
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  onSnapshot
} from "firebase/firestore";

import { db } from "../firebase";

const COLLECTION_NAME = "produtos";
const CONTADOR_COLLECTION = "metadados";
const CONTADOR_DOC = "produtosContador";

export const produtosService = {
  // Buscar todos os produtos em tempo real, ordenados por id numérico
  ouvirTodos(callback) {
    const q = query(collection(db, COLLECTION_NAME), orderBy("id"));
    return onSnapshot(q, (querySnapshot) => {
      const produtos = [];
      querySnapshot.forEach((doc) => {
        produtos.push({ id: doc.id, ...doc.data() });
      });
      callback(produtos);
    });
  },

  // Adicionar produto com ID sequencial numérico salvo no documento
  async adicionar(produto) {
    const contadorRef = doc(db, CONTADOR_COLLECTION, CONTADOR_DOC);
    const contadorSnap = await getDoc(contadorRef);

    let novoId;

    if (contadorSnap.exists()) {
      const proximoId = contadorSnap.data().proximoId;
      novoId = proximoId;

      await updateDoc(contadorRef, {
        proximoId: proximoId + 1,
      });
    } else {
      novoId = 1;
      await setDoc(contadorRef, { proximoId: 2 });
    }

    await setDoc(doc(db, COLLECTION_NAME, novoId.toString()), {
      id: novoId,
      nome: produto.nome,
      quantidade: produto.quantidade,
      unidade: produto.unidade,
      codigoBarras: produto.codigoBarras,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    });
  },

  async atualizar(id, produto) {
    const produtoRef = doc(db, COLLECTION_NAME, id.toString());
    await updateDoc(produtoRef, {
      nome: produto.nome,
      quantidade: produto.quantidade,
      unidade: produto.unidade,
      codigoBarras: produto.codigoBarras,
      atualizadoEm: new Date(),
    });

    return { id, ...produto };
  },

  async deletar(id) {
    await deleteDoc(doc(db, COLLECTION_NAME, id.toString()));
    return true;
  }
};
