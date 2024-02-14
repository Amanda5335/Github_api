import { UserProps } from '../types/user'
import Search from '../components/Search'
import User from '../components/User'
import Error from '../components/Error'

import { useState } from 'react'

const Home = () => {
	const [user, setUser] = useState<UserProps | null>(null)

	const [error, setError] = useState(false)

	const loadUser = async (userName: string) => {
		setError(false)
		setUser(null)

		const res = await fetch(`https://api.github.com/users/${userName}`)

		const dataGithub = await res.json()

		if (res.status === 404) {
			setError(true)
			return
		}

		const { avatar_url, login, location, followers, following } = dataGithub

		const userData: UserProps = {
			avatar_url,
			login,
			location,
			followers,
			following,
		}

		setUser(userData)

		console.log(dataGithub)
	}

	//  starred_url: 'https://api.github.com/users/{login}starred

	// if (error) return <Error/>

	return (
		<div>
			<Search loadUser={loadUser} />
			{user && <User {...user} />}
			{error && <Error />}
		</div>
	)
}

export default Home
