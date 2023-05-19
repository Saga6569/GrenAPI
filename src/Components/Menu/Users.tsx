
interface IValues {
	avatar: string;
	category: string;
	chatId: string;
	description: string;
	email: string;
	isArchive: boolean;
	isDisappearing: boolean;
	isMute: boolean;
	lastSeen: null;
	muteExpiration: null;
	name: string;
	products: [];
	telephone: string;
	target: boolean;
}

const Users = (props: any) => {
	const { state, setState } = props;

	console.log(state)

	const itemsUser = state.users.map((el: IValues, i: number) => {
		const bc = el.target ? '#8e8787' : ''
		return (
			<div key={i} className='user' style={{ backgroundColor: bc }}
				onClick={() => {
					const users = state.users.map((user: IValues) => {
						if (user.telephone !== el.telephone) {
							user.target = false
						}
						user.target = true
						return user
					})
					setState({ ...state, users })
				}}
			>
				<img src={el.avatar} className='avatar' alt=""></img>
				<div className='body'>
					<span>{el.telephone}</span>
					<span className='status'>xx</span>
				</div>
				<div className='time'></div>
			</div>
		)
	})

	return (
		<div className="usersItem" >
			{itemsUser}
		</div>
	)
};

export default Users;