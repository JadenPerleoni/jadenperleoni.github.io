import { useState, useEffect } from "react";
import { createTransaction, getBalance } from "../../api/index.js";

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken;
}

function getUser() {
  let username = sessionStorage.getItem("username");
  username = JSON.parse(username);
  return username;
}

function Home() {

  const username = getUser();

  const [form, setForm] = useState({
    amount: "",
    type: "credit",
    createdBy: username
  });
  const [balance, setBalance] = useState(0);

  const token = getToken();

  const handleSubmit = (event) => {
    event.preventDefault();
    createTransaction(token, form);
  };

  useEffect(() => {
    getBalance(token, { username: username }).then((res) =>
      setBalance(res.data)
    );
  }, []);


  return (
    <div>
      <h2>Hello, {username}</h2>
      <h2>You have a balance of: {balance}</h2>

      <div className="App">
        <div className="login-form">
          <h1>Create Transaction</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Amount:
              <input
                type="text"
                name="amount"
                value={form.amount || ""}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
            </label>
            <label>
              Type:
              <select
                value={form.type || ""}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
