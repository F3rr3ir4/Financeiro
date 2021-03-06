import React, { useState } from "react";
import Drawer from "../../components/Drawer";
import Modal from "../../components/Modal";

import formatCurrency from "../../utils/formatCurrency";

import { MdDelete as DeleteIcon } from "react-icons/md";

import Header from "../../components/Header";
import Content from "../../components/Content";

import { useDispatch, useSelector } from "react-redux";
import MenuAdd from "../../components/MenuAdd";
import allActions from "../../store/actions";

export default function Expenses() {
  const [showMenu, setShowMenu] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showMenuAdd, setShowMenuAdd] = useState(false);

  const expenses = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  function showExpenses(item) {
    setItemSelected(item);
    setShowModal(true);
  }

  function addExpense(item) {
    dispatch(allActions.expense.addExpense(item));
  }

  function deleteExpense(item) {
    dispatch(allActions.expense.deleteExpense(item));
  }

  function setExpense(item) {
    dispatch(allActions.expense.setExpense(item));
  }

  return (
    <div className="container">
      <Drawer setShow={setShowMenu} show={showMenu} />
      <Modal
        item={itemSelected}
        show={showModal}
        setShow={setShowModal}
        dataType="expense"
        onSetItem={setExpense}
      />
      <MenuAdd
        onAdd={addExpense}
        setShow={setShowMenuAdd}
        show={showMenuAdd}
        dataType="expense"
      />
      <Header setShowDrawer={setShowMenu}>Despesas</Header>
      <Content onClickAdd={() => setShowMenuAdd(true)}>
        {expenses.map((item) => (
          <li key={item.id} className="grid-item">
            <div className="box-button">
              <button
                className="button-icon"
                onClick={() => deleteExpense(item)}
              >
                <DeleteIcon size={24} color="#00a86b" />
              </button>
            </div>
            <div className="box-text">
              <label className="title" onClick={() => showExpenses(item)}>
                {item.title}
              </label>
              <label onClick={() => showExpenses(item)}>
                {formatCurrency(item.value)}
              </label>
            </div>
          </li>
        ))}
      </Content>
    </div>
  );
}
