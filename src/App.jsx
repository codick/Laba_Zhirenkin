import './App.css';
import Home from './components/Main';
import { useEffect, useState } from 'react';
import uuid from "react-uuid";
import {BrowserRouter as  Router,
  Routes,
  Route,
  Link,
  Navigate
  } from 'react-router-dom'
import Registration from './components/Registration';
import Log_in from './components/Log_in';
import BuyCart from './components/BuyCart';
import Order from './components/Order';
import { DataContext } from './components/Context';
import Loading from './components/Loading'

function App() {

  const [pets, setPets] = useState()
  const [isLoad, setIsLoad] = useState(true)


  let initAccounts = [
    {id:1, name: 'Timurchik', age:10, password: '123123123', BuyCart: [], order: []},
    {id:2, name: 'Azatik', age:1010, password: 'klye1123123', BuyCart: [], order: []},
    {id:3, name: 'NIKITKA', age:16, password: '123123123', BuyCart: [], order: []}
  ]


  const [accounts, setAccounts] = useState(initAccounts)

  const [user, setUser] = useState(null)


  async function GetPets() {
    setIsLoad(true)
    const api = await fetch('https://petstore.swagger.io/v2/pet/findByStatus?status=available')
    const data = await api.json()
    setPets(data)
    setIsLoad(false)
    console.Log_in(data);
  }

  useEffect(() => {
    GetPets()
  }, [])


    return <Router>
      <header className='header'>
        <nav className='menu'>
          <ul className='list'>
            <li className='elem'>{user !== null ? <p>Привет, {user.name} !</p> : ''}</li>
            {user !== null ? <><li className='elem'><a className='Log_inout' onClick={() => setUser(null)}>Выйти</a></li> <li className='elem'><Link to='/BuyCart'>Корзина</Link></li></> : <><li className='elem'><Link to='/Registration'>Регистрация</Link></li>
            <li className='elem'><Link to='/Log_in'>Залогиниться</Link></li><li className='elem'><Link>Заказ</Link></li></>}
            <li className='elem'><Link to='/' >Главная страница</Link></li>
          </ul>
        </nav> 
      </header>
      <section className='container'>
      {isLoad ? <Loading/> : 
      <DataContext.Provider value={{user, setUser, accounts, setAccounts, pets}}>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Registration' element={user ? <Navigate to="/" /> :  <Registration />} />
            <Route path='/Log_in' element={user ? <Navigate to="/" /> :  <Log_in />} />
            <Route path='/BuyCart'element={!user ? <Navigate to="/" /> : <BuyCart />} />
            <Route path='/order'element={!user ? <Navigate to="/" /> : <Order />} />
      </Routes>
      </DataContext.Provider>
      }
      </section>
    </Router>  
}
export default App;
