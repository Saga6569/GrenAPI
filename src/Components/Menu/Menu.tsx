
import { useState } from "react"
import HeaderMenu from "./HeaderMenu"
import Users from "./Users"
import { myRequest } from '../../utilits'


const AddChat = (props: any) => {

	const { state, setState } = props;

	const [telephone, setTelephone] = useState('')

	return (
		<div className='AddChat' >
			<button className='Add'
				onClick={async () => {
					if (telephone.length === 10) {

						const myHeaders = new Headers();
						myHeaders.append("Content-Type", "application/json");

						const raw = JSON.stringify({
							"chatId": `7${telephone}@c.us`
						});

						var requestOptions = {
							method: 'POST',
							headers: myHeaders,
							body: raw,
							redirect: 'follow'
						};

						const url = `https://api.green-api.com/waInstance${state.IdInstance}/GetContactInfo/${state.ApiTokenInstance}`

						const request = await myRequest(url, requestOptions)

						const newUser = { telephone: `7${telephone}`, ...request, target: false }
						const users = [...state.users, newUser]

						setState({ ...state, users })
						setTelephone('')
					}
					console.log('должно быть 10 цифр')
				}}
			></button>
			<span>+7</span>
			<input type="tel" id="phone" name="phone" value={`${telephone}`}
				pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
				required
				onChange={(e) => {

					const newValue = (e.target.value)
					setTelephone(newValue)
				}}
			/>
		</div>
	)
}

const Menu = (props: any) => {

	const { state, setState } = props

	return (
		<div className='menu'>
			<HeaderMenu />
			<Users state={state} setState={setState} />
			<AddChat state={state} setState={setState} />
		</div>
	)
}

export default Menu;