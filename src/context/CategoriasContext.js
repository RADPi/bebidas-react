import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

// Crear el Context
export const CategoriasContext = createContext()

// Provider es donbe se ecuentran las funciones y state

const CategoriasProvider = props => {
	// crear el state del Context

	const [categorias, setCategorias] = useState([])

	useEffect(() => {
		const getCategorias = async () => {
			const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`
			const categorias = await axios(url).catch(err => console.log(err))
			setCategorias(categorias.data.drinks)
		}
		getCategorias()
	}, [])

	return (
		<CategoriasContext.Provider value={{ categorias }}>
			{props.children}
		</CategoriasContext.Provider>
	)
}

export default CategoriasProvider
