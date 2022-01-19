import React from 'react'
import { useContext, useState } from 'react'
import { ModalContext } from '../context/Modal.Context'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'

function getModalStyle() {
	const top = 50
	const left = 50

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	}
}

const useStyles = makeStyles(theme => ({
	paper: {
		position: 'absolute',
		width: 600,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}))

const Receta = ({ receta }) => {
	//Configuracion del Modal de Material UI
	const [modalStyle] = useState(getModalStyle)
	const [open, setOpen] = useState(false)

	const classes = useStyles()

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const { informacion, setIdReceta, setInformacion } = useContext(ModalContext)

	// Muestra y formatea los ingredientes
	const mostrarIngredientes = informacion => {
		let ingredientes = []
		for (let i = 1; i < 16; i++) {
			if (informacion[`strIngredient${i}`]) {
				ingredientes.push(
					<li key={i}>
						{' '}
						{informacion[`strIngredient${i}`]} {informacion[`strMeasure${i}`]}
					</li>
				)
			}
		}

		return ingredientes
	}

	return (
		<div className='col-md-4 mb-3'>
			<div className='card'>
				<h2 className='card-header'>{receta.strDrink}</h2>
				<img
					className='card-img-top'
					src={receta.strDrinkThumb}
					alt={`${receta.strDrink}`}
				/>
				<div className='card-body'>
					<button
						className='btn btn-block btn-primary'
						type='button'
						onClick={() => {
							setIdReceta(receta.idDrink)
							handleOpen()
						}}
					>
						Ver Receta
					</button>
					<Modal
						open={open}
						onClose={() => {
							setIdReceta(null)
							setInformacion({})
							handleClose()
						}}
					>
						<div style={modalStyle} className={classes.paper}>
							<h2>{informacion.strDrink}</h2>
							<h3 className='mt-4'>Instrucciones</h3>
							<p>{informacion.strInstructions}</p>

							<img
								className='img-fluid my-4'
								src={informacion.strDrinkThumb}
								alt=''
							/>

							<h3>Ingredientes y cantidades</h3>
							<ul>{mostrarIngredientes(informacion)}</ul>
						</div>
					</Modal>
				</div>
			</div>
		</div>
	)
}

export default Receta
