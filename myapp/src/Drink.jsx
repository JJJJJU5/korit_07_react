function Drink(props){
  return <h1 style={{color : props.color , fontSize : props.size} } >Would you like some {props.drink}?</h1>
}
export default Drink