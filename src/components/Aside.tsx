import { Link } from "react-router-dom";
import styled from "styled-components";

const AsideWrapper = styled.aside`
  ul > dd {
    margin-left: 1rem;
    font-weight: 500;
    font-size: large;
    margin-top: 1rem;
  }
  ul > li {
    margin-left: 1.5rem;
    margin-top: 0.5rem;
    font-size: large;
  }
`;

export const Aside: React.FC = () => {
  return (
    <AsideWrapper className="w-full h-full overflow-hidden bg-zinc-200">
      <ul>
        <dd>Catalogo</dd>
        <li>
          <Link to="products">Produtos</Link>
        </li>
        <li>
          <Link to="collections">Coleções</Link>
        </li>
        <li>Assets</li>
        <dd>Vendas</dd>
        <li>Pedidos</li>
      </ul>
    </AsideWrapper>
  );
};
