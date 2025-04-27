import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Reccomend from "./components/Reccomend"
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.clear()
    client.resetStore()
    setPage("authors")
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        { token ? (
          <>
          <button onClick={() => setPage("add")}>add book</button>
          <button onClick={() => setPage("recomend")}>recomend</button>
          <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>
      <Authors show={page === "authors"} token={token}/>
      <Books show={page === "books"} />
      {token && <NewBook show={page === "add"} />}
      {token && <Reccomend show={page === "recomend"} user={user}/>}
      {!token && <LoginForm show={page === "login"} setToken={setToken} setUser={setUser} setPage={setPage}/>}
    </div>
  );
};

export default App;
