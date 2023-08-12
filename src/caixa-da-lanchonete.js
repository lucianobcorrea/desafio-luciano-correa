import { CARDAPIO } from "./cardapio";

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    let total = 0;
    const formaPagamentoInvalida =
      this.verificaMetodoDePagamento(metodoDePagamento);

    if (formaPagamentoInvalida) {
      return formaPagamentoInvalida;
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    const todosItensDoPedido = this.armazenarItensDoPedido(itens);

    for (let item of itens) {
      const [codigo, quantidade] = item.split(",");

      if (CARDAPIO[codigo]?.principal) {
        if (!todosItensDoPedido.includes(CARDAPIO[codigo]?.principal)) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }

      if (quantidade < 1) {
        return "Quantidade inválida!";
      }

      if (CARDAPIO.hasOwnProperty(codigo)) {
        total += CARDAPIO[codigo].valor * parseInt(quantidade);
      } else {
        return "Item inválido!";
      }
    }

    total = this.calculaValorMetodoDePagamento(metodoDePagamento, total);

    return `R$ ${total.toFixed(2).replace(".", ",")}`;
  }

  calculaValorMetodoDePagamento(metodoDePagamento, total) {
    const DESCONTO_DINHEIRO = 0.05;
    const ACRESCIMO_CREDITO = 0.03;

    if (metodoDePagamento === "dinheiro") {
      total = total - DESCONTO_DINHEIRO * total;
    } else if (metodoDePagamento === "credito") {
      total = ACRESCIMO_CREDITO * total + total;
    }

    return total;
  }

  verificaMetodoDePagamento(metodoDePagamento) {
    const FORMAS_PAGAMENTO = ["dinheiro", "debito", "credito"];

    if (!FORMAS_PAGAMENTO.includes(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }
  }

  armazenarItensDoPedido(itens) {
    const todosItensDoPedido = [];

    for (let itensPedido of itens) {
      const [codigo] = itensPedido.split(",");
      todosItensDoPedido.push(codigo);
    }

    return todosItensDoPedido;
  }
}

export { CaixaDaLanchonete };
