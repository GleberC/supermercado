import { useEffect, useState } from 'react';
import type { Product } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import styles from './Admin.module.css';

const Admin = () => {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [produtoParaEditar, setProdutoParaEditar] = useState<Product | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/produtos')
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error('Erro ao buscar produtos:', err));
  }, []);

  const handleAdd = (produto: Product) => {
    setProdutos((prev) => [...prev, produto]);
  };

  const handleUpdate = (produtoAtualizado: Product) => {
    setProdutos((prev) =>
      prev.map((p) => (p.id === produtoAtualizado.id ? produtoAtualizado : p))
    );
    setProdutoParaEditar(null);
  };

  const handleDelete = (id: string) => {
    fetch(`http://localhost:3001/produtos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProdutos((prev) => prev.filter((produto) => produto.id !== id));
      })
      .catch((err) => console.error('Erro ao deletar produto:', err));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Painel do Administrador</h1>

      <ProductForm
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        produtoParaEditar={produtoParaEditar}
      />

      <div className={styles.cardGrid}>
        {produtos.map((produto) => (
          <div key={produto.id} className={styles.cardWrapper}>
            <ProductCard produto={produto} />

            <div className={styles.buttonGroup}>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(produto.id)}
              >
                Deletar
              </button>

              <button
                className={styles.editButton}
                onClick={() => setProdutoParaEditar(produto)}
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
