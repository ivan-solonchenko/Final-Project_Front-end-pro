export async function getUsers() {
	const response = await fetch('https://jsonplaceholder.typicode.com/users')
     
	const data = await response.json()
	const list = await data;
	return list;
}
