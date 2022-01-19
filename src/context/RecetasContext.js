import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const RecetasContext = createContext()

export default function RecetasProvider(props) {
	const [recetas, setRecetas] = useState([])
	const [busqueda, buscarRecetas] = useState({
		nombre: '',
		categoria: '',
	})
	const [consultar, setConsultar] = useState(false)

	const { nombre, categoria } = busqueda

	useEffect(() => {
		if (consultar) {
			const obtenerRecetas = async () => {
				const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre.replaceAll(
					' ',
					','
				)}&c=${categoria.replaceAll(' ', '_')}`
				// console.log(url)
				const resultado = await axios(url)
				setRecetas(resultado.data.drinks)
			}
			obtenerRecetas()
		}
	}, [busqueda, categoria, consultar, nombre])

	return (
		<RecetasContext.Provider value={{ recetas, buscarRecetas, setConsultar }}>
			{props.children}
		</RecetasContext.Provider>
	)
}
