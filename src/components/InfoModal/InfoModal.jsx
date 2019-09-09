import React from 'react';
import classNames from "classnames";
import css from "./InfoModal.module.css";

const InfoModal = ({ handleClose, isOpened }) => (
  <>
    <section onClick={handleClose} className={classNames(css.section, { [css.opened]: isOpened })} />
    <div className={classNames(css.modal, { [css.opened]: isOpened })}>
      <div className={css.tableContainer}>
        <div className={css.headingWrap}>
          <h1 className={css.heading}>
            Добро пожаловать в симулятор G-машины
          </h1> 
          <button onClick={handleClose} className={css.close} />
        </div>
        <p className={css.subtitle}>
          В качестве команд G-машины используется последовательность макросов, приведенная в таблице:
        </p>
        <table>
          <tbody>
            <tr>
              <th className={css.head}>№</th>
              <th className={css.head}>Макрос</th>
              <th className={css.head}>Параметр</th>
              <th className={css.head}>Значение</th>
            </tr>
            <tr><td className={css.ceil}>1</td><td className={css.ceil}>PUSH</td><td className={css.ceil}>m число</td><td className={css.ceil}>Помещает на вершину стека новый элемент. Его значением является  содержимое элемента на m ниже УВС.</td></tr>
            <tr><td className={css.ceil}>2</td><td className={css.ceil}>PUSHINT</td><td className={css.ceil}>i указатель</td><td className={css.ceil}>Помещает указатель на вершину содержащую число.</td></tr>
            <tr><td className={css.ceil}>3</td><td className={css.ceil}>Slide</td><td className={css.ceil}>m число</td><td className={css.ceil}> Копирует  УВС в ячейку на m позиций ниже УВС.</td></tr>
            <tr><td className={css.ceil}>4</td><td className={css.ceil}>UPDATE</td><td className={css.ceil}>m число</td><td className={css.ceil}> Копирует содержимое УВС в ячейку на m позиций ниже УВС. УВС выталкивается из стека</td></tr>
            <tr><td className={css.ceil}>5</td><td className={css.ceil}>GET</td><td className={css.ceil}>-</td><td className={css.ceil}>Извлекает содержимое УВС  стека. Выталкивает УВС. Помещает извлеченное значение в дамп</td></tr>
            <tr><td className={css.ceil}>6</td><td className={css.ceil}>MKAP</td><td className={css.ceil}>-</td><td className={css.ceil}>Создает альфа вершину, для которой левым и правым указателями являются соответственно УВС и УВС-1. Дважды выталкивает содержимое стека. Вставляет в стек созданный указатель на альфа вершину</td></tr>
            <tr><td className={css.ceil}>7</td><td className={css.ceil}>MKINT</td><td className={css.ceil}>-</td><td className={css.ceil}>Создает константную вершину, значение которой взято с вершины дампа. Выталкивает содержимое вершины дампа. Вставляет ее в стек.</td></tr>
            <tr><td className={css.ceil}>8</td><td className={css.ceil}>ALLOC</td><td className={css.ceil}>m число</td><td className={css.ceil}>Создает m новых пустых вершин, вставляет их последовательно в стек. </td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
);

export default InfoModal;
