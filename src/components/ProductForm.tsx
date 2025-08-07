import { useEffect, useState } from 'react';
import type { Product } from '../data/products';
import { v4 as uuidv4 } from 'uuid';
import styles from './ProductForm.module.css';


type ProductFormProps = {
  onAdd: (produto: Product) => void;
  onUpdate: (produto: Product) => void;
  produtoParaEditar?: Product | null;
};

const ProductForm = ({ onAdd, onUpdate, produtoParaEditar }: ProductFormProps) => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');

  useEffect(() => {
    if (produtoParaEditar) {
      setNome(produtoParaEditar.nome);
      setPreco(produtoParaEditar.preco.toString());
      setDescricao(produtoParaEditar.descricao);
      setImagem(produtoParaEditar.imagem);
    }
  }, [produtoParaEditar]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const novoProduto: Product = {
      id: uuidv4(),
      nome,
      preco: parseFloat(preco),
      descricao,
      imagem,
    };

    if (produtoParaEditar) {
      // PUT
      fetch(`http://localhost:3001/produtos/${produtoParaEditar.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...novoProduto, id: produtoParaEditar.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          onUpdate(data);
          limparCampos();
        })
        .catch((err) => console.error('Erro ao editar produto:', err));
    } else {
      // POST
      fetch('http://localhost:3001/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoProduto),
      })
        .then((res) => res.json())
        .then((data) => {
          onAdd(data);
          limparCampos();
        })
        .catch((err) => console.error('Erro ao adicionar produto:', err));
    }
  };

  const limparCampos = () => {
    setNome('');
    setPreco('');
    setDescricao('');
    setImagem('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2>{produtoParaEditar ? 'Editar Produto' : 'Adicionar Produto'}</h2>
<div className={styles.inputGroup}>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
        className={styles.input}
      />

      <input
        type="number"
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        required
        className={styles.input}
      />

      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        required
        className={styles.input}
      />

      <input
        type="text"
        placeholder="URL da Imagem"
        value={imagem}
        onChange={(e) => setImagem(e.target.value)}
        required
        className={styles.input}
      />
      </div>

      <button type="submit" className={styles.button}>
        {produtoParaEditar ? 'Atualizar' : 'Adicionar'}
      </button>
    </form>
  );
};

export default ProductForm;
