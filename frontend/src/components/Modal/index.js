import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";

import formatCurrency from "../../utils/formatCurrency";

import { MdClose as CloseIcon } from "react-icons/md";

import "./styles.css";

export default function ModalCenter({
  item,
  show,
  setShow,
  dataType,
  onSetItem,
}) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("0");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const expenseCategories = [
    "Outros",
    "Alimentação",
    "Casa",
    "Educação",
    "Lazer",
    "Telefonia",
    "Saúde",
    "Transporte",
    "Vestiário",
    "Viagem",
  ];

  useEffect(() => {
    loadItem();
  }, [item]);

  function loadItem() {
    setId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setValue(item.value);
    setColor(item.color ? item.color : "#00A86B");
    setCategory(item.category ? item.category : "Outros");
    setDate(item.date ? item.date : new Date().toISOString().split("T")[0]);
  }

  function add() {
    if (title === "" || value === "") {
      alert("Faltou algo\nVerifique os dados e tente novamente");
      return;
    }

    var formatedValue = String(value).replace(/,/g, ".");

    if (formatCurrency(formatedValue).includes("NaN")) {
      alert("Erro\nValor inválido, digite novamente");
      return;
    }

    var item;

    if (dataType === "expense") {
      item = {
        id,
        title,
        description,
        value: formatedValue,
        category,
        date:
          date === ""
            ? new Date().toISOString().split("T")[0]
            : new Date(date).toISOString().split("T")[0],
      };
    } else if (dataType === "receipt") {
      item = {
        id,
        title,
        description,
        value: formatedValue,
        date:
          date === ""
            ? new Date().toISOString().split("T")[0]
            : new Date(date).toISOString().split("T")[0],
      };
    } else {
      item = {
        id,
        title,
        description,
        value: formatedValue,
        color,
      };
    }

    onSetItem(item);
    setShow(false);
  }

  return (
    <Modal open={show} className="modal">
      <div className="body-modal">
        <div className="box-button">
          <button className="button-icon" onClick={() => setShow(false)}>
            <CloseIcon size={24} color="#00A86b" />
          </button>
        </div>
        <div className="box-label">
          <label>Título: </label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="box-text-area">
          <label>Descrição: </label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="box-label">
          <label>Valor: R$</label>
          <input
            type="number"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        {dataType === "expense" ? (
          <>
            <div className="box-label">
              <label>Pagamento: </label>
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>
            <div className="box-label">
              <label>Categoria: </label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {expenseCategories.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
          </>
        ) : dataType === "receipt" ? (
          <div className="box-label">
            <label>Pagamento: </label>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
        ) : (
          <div className="box-color">
            <label>Cor: </label>
            <input
              type="color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />
          </div>
        )}
        <div className="box-button-add">
          <button className="button-secundary" onClick={add}>
            Salvar
          </button>
        </div>
      </div>
    </Modal>
  );
}
