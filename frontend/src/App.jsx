import "./App.css";
import axios from 'axios';
import React, { useState } from "react";


function App() {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [time, setTime] = useState("");

	const handleSubmit = event => {
		event.preventDefault()
		console.log(event)


		const postData = async () => {
			const response = await fetch("http://127.0.0.1:8000/quote", {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: `name=${name}&message=${message}`
			});
			//const quotes = await response.json()
		}
		postData()


	};
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
					<option value="1">Last day test</option>
					<option value="7">Last week</option>
					<option value="30">Last month</option>
					<option value="365">Last year</option>
					<option value="all">Last year</option>
				</select>
				<button type="submit">Submit</button>
			</form>

			<h2>Previous Quotes</h2>
			{/* TODO: Display the actual quotes from the database */}
			<div className="messages">
				<p>Peter Anteater</p>
				<p>Zot Zot Zot!</p>
				<p>Every day</p>
			</div>
		</div>
	);
}

export default App;
