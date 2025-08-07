// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import type { Product } from '../data/products';
import styles from './Home.module.css';

const Home = () => {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [precoMinimo, setPrecoMinimo] = useState('');
  const [precoMaximo, setPrecoMaximo] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/produtos')
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error('Erro ao buscar produtos:', err));
  }, []);

  const limparFiltros = () => {
    setFiltroNome('');
    setPrecoMinimo('');
    setPrecoMaximo('');
  };

  const produtosFiltrados = produtos.filter((produto) => {
    const nomeCorresponde = produto.nome.toLowerCase().includes(filtroNome.toLowerCase());
    const precoValidoMin = precoMinimo === '' || produto.preco >= parseFloat(precoMinimo);
    const precoValidoMax = precoMaximo === '' || produto.preco <= parseFloat(precoMaximo);
    return nomeCorresponde && precoValidoMin && precoValidoMax;
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Catálogo de Produtos</h1>

      <input
        type="text"
        placeholder="Buscar por nome (ex: arroz)"
        value={filtroNome}
        onChange={(e) => setFiltroNome(e.target.value)}
        className={styles.inputNome}
      />

      <div className={styles.filtrosPreco}>
        <input
          type="number"
          placeholder="Preço mínimo"
          value={precoMinimo}
          onChange={(e) => setPrecoMinimo(e.target.value)}
          className={styles.inputPreco}
        />
        <input
          type="number"
          placeholder="Preço máximo"
          value={precoMaximo}
          onChange={(e) => setPrecoMaximo(e.target.value)}
          className={styles.inputPreco}
        />
      </div>

      <div className={styles.infoFiltro}>
        <span>
          <strong>{produtosFiltrados.length}</strong> produto(s) encontrado(s)
        </span>
        <button onClick={limparFiltros} className={styles.botaoLimpar}>
          Limpar filtros
        </button>
      </div>

      <ul className={styles.lista}>
        {produtosFiltrados.map((produto) => (
          <li key={produto.id} className={styles.item}>
            <img src={produto.imagem} alt={produto.nome} className={styles.imagem} />
            <h3>{produto.nome}</h3>
            <p>
              <strong>Preço:</strong> R$ {produto.preco.toFixed(2)}
            </p>
            <p>{produto.descricao}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
