import React from "react"
import AuthContext from "./AuthContext"

function Hello() {
  const username = React.useContext(AuthContext);

  return(<>
    안녕하세요 {username}
  </>)
}
export default Hello;