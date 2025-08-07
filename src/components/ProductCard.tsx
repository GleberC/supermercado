import type { Product } from '../data/products';
import styles from './ProductCard.module.css';

type Props = {
  produto: Product;
};

const ProductCard = ({ produto }: Props) => {
  return (
    <div className={styles.card}>
      <h2>{produto.nome}</h2>
      <img src={produto.imagem} alt={produto.nome} />
      <p>{produto.descricao}</p>
      <strong>R$ {produto.preco.toFixed(2)}</strong>
    </div>
  );
};

export default ProductCard;
