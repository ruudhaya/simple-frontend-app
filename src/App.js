import { useState } from "react";
import "./App.css";

// Application to get email address and send it to the server through a POST request
// On successful response, Show a message saying 'Thanks for subscribing'
// On error response, Show a message saying 'Sorry, something went wrong'
// Add a loading state to show a loading message while the request is in progress
// Add a disabled state to the button to prevent multiple clicks while the request is in progress
// Add a disabled state to the input to prevent editing while the request is in progress
// Add a 'Submit another email' button to reset the form and show the form again

function App() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(true);

  // const handleLoading = () => {
  //   setLoading(true);
  //   setDisabled(true);
  //   setDisabledInput(true);
  //   setShowButton(true);
  // };

  // const resetLoading = () => {
  //   setLoading(false);
  //   setDisabled(false);
  //   setDisabledInput(false);
  //   setShowButton(false);
  // };
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const subscribeUrl = `${serverUrl}/subscribers`;

  const handleSubmit = (e) => {
    // get the email address from the form
    const email = e.target.elements.email.value;
    // handleLoading();
    // send the email address to the server
    fetch(subscribeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEmail(data.email);
        setShowForm(false);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => {
        // resetLoading();
      });
    e.preventDefault();
  };
  return (
    <div className="App">

      <div className="App-body">
      <h1>Subscribe</h1>
        {showForm && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
            <button type="submit">Send</button>
          </form>
        )}
        {email && (
          <div>
            <p>Thanks for subscribing</p>
            <button type="button" onClick={() => setShowForm(true)}>
              Submit another email
            </button>
          </div>
        )}
        {error && <p>Sorry, something went wrong</p>}
      </div>
    </div>
  );
}

export default App;
