import "./App.css";
import React, { useState } from "react";
import Quotes from './Quotes.jsx';


function App() {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [time, setTime] = useState(1);
	const [data, setData] = useState("");



	const handleSubmit = event => {
		event.preventDefault()
		const getData = async () => {
			console.log(time)
			const response = await fetch(`http://127.0.0.1:8000/time/${time}`, {
				method: "GET",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
			});

			const quotes = await response.json()
			setData(quotes)

		}

		const postData = async () => {
			const response = fetch("http://127.0.0.1:8000/quote", {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: `name=${name}&message=${message}`
			});
		}
		postData()
		getData()

	};
	if (data) {
		return (
			<div className="App">
				{/* TODO: include an icon for the quote book */}
				<h1>Hack @ UCI Tech Deliverable</h1>

				<h2>Submit a quote</h2>
				{/* TODO: implement custom form submission logic to not refresh the page */}
				<form onSubmit={handleSubmit}>
					<label htmlFor="input-name" >Name</label>
					<input onChange={(event) => setName(event.target.value)} type="text" name="name" id="input-name" required />
					<label htmlFor="input-message">Quote</label>
					<input onChange={(event) => setMessage(event.target.value)} type="text" name="message" id="input-message" required />
					<select onChange={(event) => setTime(event.target.value)}>
						<option value="1" selected>Last day</option>
						<option value="7">Last week</option>
						<option value="30">Last month</option>
						<option value="365">Last year</option>
					</select>
					<button type="submit">Submit</button>
				</form>

				<h2>Previous Quotes</h2>
				<div className="messages">
					<Quotes {...data} />
				</div>
			</div>
		);
	}
	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}
			<h1>Hack @ UCI Tech Deliverable</h1>

			<h2>Submit a quote</h2>
			{/* TODO: implement custom form submission logic to not refresh the page */}
			<form onSubmit={handleSubmit}>
				<label htmlFor="input-name" >Name</label>
				<input onChange={(event) => setName(event.target.value)} type="text" name="name" id="input-name" required />
				<label htmlFor="input-message">Quote</label>
				<input onChange={(event) => setMessage(event.target.value)} type="text" name="message" id="input-message" required />
				<select onChange={(event) => setTime(event.target.value)}>
					<option value="1" selected>Last day</option>
					<option value="7">Last week</option>
					<option value="30">Last month</option>
					<option value="365">Last year</option>
				</select>
				<button type="submit">Submit</button>
			</form>

			<h2>Previous Quotes</h2>
			{/* TODO: Display the actual quotes from the database */}
			<div className="messages">

			</div>
		</div>
	);
}

export default App;
