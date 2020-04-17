import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Drawer from "../../components/Drawer";
import Modal from "../../components/Modal";

import { MdDelete as DeleteIcon, MdMenu as MenuIcon } from "react-icons/md";

import "./styles.css";
import formatCurrency from "../../utils/formatCurrency";

export default function Wallet() {
  const navigation = useHistory();

  const [showMenu, setShowMenu] = useState(false);
  const [revenue, setRevenue] = useState("300");
  const [receipt, setReceipt] = useState("0");
  const [expense, setExpense] = useState("258");
  const [walletItems, setWalletItems] = useState([
    { id: "1", title: "Dinheiro", value: "15" },
    { id: "1", title: "Conta Nubank", value: "245" },
    { id: "1", title: "Conta Caixa", value: "0" },
    { id: "1", title: "Conta Neon", value: "0" },
  ]);

  return (
    <div className="container">
      <Drawer setShow={setShowMenu} show={showMenu} navigation={navigation} />
      <header>
        <button className="button-icon" onClick={() => setShowMenu(true)}>
          <MenuIcon size={36} />
        </button>
        <text>Sua carteira</text>
        <button
          className="button-secundary"
          onClick={() => navigation.push("login")}
        >
          Sair
        </button>
      </header>
      <div className="body">
        <div className="header-content">
          <div onClick={() => navigation.push("wallet")}>
            <text>Saldo em contas</text>
            <text>{formatCurrency(revenue)}</text>
          </div>
          <div onClick={() => navigation.push("revenues")}>
            <text>Recebimentos</text>
            <text>{formatCurrency(receipt)}</text>
          </div>
          <div onClick={() => navigation.push("expenses")}>
            <text>Dispesas</text>
            <text>{formatCurrency(expense)}</text>
          </div>
          <div>
            <text>Lucro</text>
            <text>
              {formatCurrency(
                parseFloat(revenue) + parseFloat(receipt) - parseFloat(expense)
              )}
            </text>
          </div>
        </div>
        <ul className="wallet">
          {walletItems.map((item) => (
            <li key={item.id}>
              <button className="button-icon">
                <DeleteIcon size={24} color="#00a86b" />
              </button>
              <text>{item.title}</text>
              <text>{formatCurrency(item.value)}</text>
            </li>
          ))}
        </ul>
        <div className="actions">
          <button className="button-secundary">Adicionar</button>
        </div>
      </div>
    </div>
  );
}
