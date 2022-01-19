import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

export const ModalContext = createContext()

export default function ModalProvider(props) {
	const [idReceta, setIdReceta] = useState(null)
	const [informacion, setInformacion] = useState({})

	useEffect(() => {
		if (!idReceta) return
		const obtenerInformacion = async () => {
			const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`
			// console.log(url)
			const resultado = await axios(url)
			// console.log(resultado.data.drinks[0])
			setInformacion(resultado.data.drinks[0])
		}
		obtenerInformacion()
	}, [idReceta])

	return (
		<ModalContext.Provider
			value={{
				informacion,
				setInformacion,
				setIdReceta,
			}}
		>
			{props.children}
		</ModalContext.Provider>
	)
}
