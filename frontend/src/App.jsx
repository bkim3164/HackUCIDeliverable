import "./App.css";
import React, { useState } from "react";
import Quotes from './Quotes.jsx';
import QuoteBook from './quotebook.png';

function App() {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [time, setTime] = useState(1);
	const [data, setData] = useState("");



	const handleSubmit = event => {
		event.preventDefault()

		const getData = async () => {
			try {
				const response = await fetch(`http://127.0.0.1:8000/time/${time}`, {
					method: "GET",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
				});

				const quotes = await response.json()
				setData(quotes)
			} catch (Error) {
				console.log(Error)
			}

		}

		const postData = async () => {
			try {
				const response = fetch("http://127.0.0.1:8000/quote", {
					method: "POST",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					body: `name=${name}&message=${message}`
				});
			}
			catch (Error) {
				console.log(Error)
			}
		}
		postData()
		getData()
		document.getElementById("form").reset();

	};
	if (data) {
		return (
			<div className="App">
				{/* TODO: include an icon for the quote book */}
				<div className="header">
					<img src={QuoteBook} className="quotebook" />
					<h1>Hack @ UCI Tech Deliverable</h1>
				</div>
				<div className="submit-quote">
					<h2>Submit a Quote!</h2>
					{/* TODO: implement custom form submission logic to not refresh the page */}
					<form onSubmit={handleSubmit} id="form" className="form">
						<label htmlFor="input-name" className="form-name">Name</label>
						<input onChange={(event) => setName(event.target.value)} type="text" name="name" id="input-name" label="Enter name" required />
						<label htmlFor="input-message" className="form-quote">Quote</label>
						<input onChange={(event) => setMessage(event.target.value)} type="text" name="message" id="input-message" label="Enter message" required />
						<label htmlFor="input-message" className="form-quote">Timeframe</label>
						<select className="form-select" onChange={(event) => setTime(event.target.value)}>
							<option value="1" selected>Last day</option>
							<option value="7">Last week</option>
							<option value="30">Last month</option>
							<option value="365">Last year</option>
						</select>
						<button className="form-submit" type="submit">Submit</button>
					</form>
				</div>

				<h2 className="quote" >Previous Quotes</h2>
				<div className="messages">
					<Quotes {...data} />
				</div>
			</div>
		);
	}
	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}
			<div className="header">
				<img src={QuoteBook} className="quotebook" />
				<h1>Hack @ UCI Tech Deliverable</h1>
			</div>

			<div className="submit-quote">
				<h2>Submit a Quote!</h2>
				{/* TODO: implement custom form submission logic to not refresh the page */}
				<form onSubmit={handleSubmit} className="form">
					<label htmlFor="input-name" className="form-name">Name</label>
					<input onChange={(event) => setName(event.target.value)} type="text" name="name" id="input-name" required />
					<label htmlFor="input-message" className="form-quote">Quote</label>
					<input onChange={(event) => setMessage(event.target.value)} type="text" name="message" id="input-message" required />
					<label htmlFor="input-message" className="form-quote">Timeframe</label>
					<select className="form-select" onChange={(event) => setTime(event.target.value)}>
						<option value="1" selected>Last day</option>
						<option value="7">Last week</option>
						<option value="30">Last month</option>
						<option value="365">Last year</option>
					</select>
					<button className="form-submit" type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
}

export default App;
