import React, { useEffect, useState } from 'react'
import { Layout } from '../../layout/Layout';
import axios from 'axios';


export const Pedidos = () => {
  const [pedidos, setPedidos] = useState([])

  useEffect(() =>{
    const fetchData = async() =>{
      await axios.get('http://localhost:3000/api/listar/pedidos')
      .then((response) =>{
        if(response.status === 200){
          const data = response.data.pedidos
          setPedidos(data)
        }
      })
    }
    fetchData()
  }, [])


  return (
    <Layout  title={'Listado de pedidos'} component={
      <div>
        <p>Lista de pedidos</p>
      </div>
    } />

  )
}
