import React, {useEffect, useState} from 'react';
import './App.scss';
import axios from "axios";


type commentType = {
	postId: number,
	name: string,
	email: string,
	body: string
}

function App() {
	const [yourNumber, setYourNumber] = useState('')
	const [yourNumberDirty, setYourNumberDirty] = useState(false)
	const [yourNumberError, setYourNumberError] = useState("Ваш номер не должен быть пустым")
	const [formValid, setFormValid] = useState(false)

	const blurHandler = (e: any) => {
		switch (e.currentTarget.name) {
			case 'yourNumber':
				setYourNumberDirty(true)
		}
	}

	const yourNumberHandler = (e: any |React.ChangeEvent<HTMLInputElement> ) => {
		setYourNumber(e.currentTarget.value)

		if (!e.currentTarget.value) {
			setYourNumberError("Ваш номер не должен быть пустым")
		} else {
			setYourNumberError("")
		}
	}

	const handleSubmit = (e: any) => {

		if (yourNumber) {
			axios.post<commentType>(`https://jsonplaceholder.typicode.com/comments`, {body: yourNumber})
				.then(res => {
					console.log('res = ', res);
					console.log('res.data = ', res.data);
					console.log(`Отправленный номер телефона: ${res.data.body}`)
					alert(`Отправленный номер телефона: ${res.data.body}`)
				})
			setYourNumber('')
			setFormValid(false)
			e.preventDefault();
		} else {
			setYourNumberError('Ваш номер не должен быть пустым')
			setYourNumberDirty(true)
			e.preventDefault();
		}




	}
	useEffect(() => {
		if (yourNumberError) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
		// console.log(yourNumber)
	}, [yourNumberError])

	// console.log(yourNumberDirty) - проверка было ли нажато ли поле ввода

	let errorVisibility = !!(yourNumberDirty && yourNumberError)
	// тоже что и let errorVisibility = yourNumberDirty && yourNumberError ? true : false


	return (
	<div className="mainContainer">
		<form className="myForm" onSubmit={handleSubmit}>
			<div className="outBlock yourNumber" style={{borderColor: errorVisibility ? "red" : "white"}}>
				<div className="innerBlock">
					<input name='yourNumber'
						   className="inputStyle"
						   type="number"
						   placeholder="Ваш номер..."
						   onBlur={blurHandler}
						   onChange={yourNumberHandler}
						   value={yourNumber}
					/>

				</div>
			</div>

			<button className="outBlock bookSomething"
					type="submit"
					style={{opacity: formValid ? 1 : 0.6}}>
				{/*<div className="innerBlock">ЗAКАЗАТЬ <i className="fa-solid fa-download"></i></div>*/}
				<div className="innerBlock">ЗAКАЗАТЬ <i className="fa-solid fa-bell fa-shake"></i></div>




			</button>
		</form>

		<h6 className="error" style={{visibility: errorVisibility ? "visible" : "hidden"}}
		>{yourNumberError}</h6>
	</div>
	);
}

export default App;
