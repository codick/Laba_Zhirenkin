import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "./Context";

export default function BuyCart() {

  const context = useContext(DataContext)

  function contains(arr, elem) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === elem) {
        return true;
      }
    }
    return false;
  }

  function AddOrder(user) {
    let copy = Object.assign({}, user);
    console.warn(copy.BuyCart);
    for (let elem of copy.BuyCart) {
      copy.order.push(elem)
    }
    copy.BuyCart = []
    context.setUser(copy);
  }

  function DelPet(id) {
    context.setPets(
      context.pets.map((pet) => {
        if (pet.id == id && contains(context.user.BuyCart, id)) {
          let copy = Object.assign({}, context.user);
          for (let i = 0; i < copy.BuyCart.length; i++) {
            if (copy.BuyCart[i].id === id) {
              copy.BuyCart.splice(i, 1);
            }
          }
          context.setUser(copy);
        }
        return pet;
      })
    );
  }

  function setelem(elem, id) {
    let copy = Object.assign({}, context.user);
    for (var i = 0; i < copy.BuyCart.length; i++) {
      if (copy.BuyCart[i].id === id) {
        copy.BuyCart[i].kol = elem;
      }
    }

    context.setUser(copy);
  }
  let result = context.user.BuyCart.map((order, index) => {
    let pet;
    for (var i = 0; i < context.pets.length; i++) {
      if (context.pets[i].id === order.id) {
        console.log(context.pets, order);
        pet = context.pets[i];
        return (
          <div key={pet.id} className="block">
            <h1 className="title">{pet.name}</h1>
            <p className="text">Статус:{pet.status}</p>
            {context.user !== null ? (
              <label htmlFor="elem">Колличество: </label>
            ) : (
              ""
            )}
            {context.user !== null ? (
              <input
              className="elemInput"
                id="elem"
                type="elember"
                value={context.user.BuyCart[index].kol}
                onChange={(event) => {
                  setelem(event.target.value, context.user.BuyCart[index].id);
                }}
              />
            ) : (
              ""
            )}
            {context.user !== null ? (
              <button onClick={() => DelPet(pet.id)}>
                Удалить с корзины
              </button>
            ) : (
              ""
            )}
          </div>
        );
      }
    }
  });

  return (
    <div>
      {result}
      <Link to='/order'><button
        onClick={() => {
          AddOrder(context.user);
        }}>
        Добавить в заказ
      </button></Link>
    </div>
  );
}
