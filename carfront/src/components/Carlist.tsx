import axios from "axios";
import { CarResponse } from "../types";
import { useQuery } from "@tanstack/react-query";
import { List, ListItem, ListItemText } from "@mui/material";


function Carlist() {
  const getCars = async (): Promise<CarResponse[]> => {
    const response = await axios.get('http://localhost:8080/api/cars');
    return response.data._embedded.cars;
  }
  const postCars = async() : Promise<CarResponse[]> => {
    const response = await axios.post('http://localhost:8080/api/cars');
    return response.data._embedded.cars;
  }

  const { data, isSuccess, error } = useQuery({
    queryKey: ['cars'],
    queryFn: getCars,
  });

  if (!isSuccess) {
    return <span>Loading...🚀</span>
  }
  else if (error) {
    return <span>자동차들을 불러오는 데 실패했습니다. ❗</span>
  }
  else {
    return (
      <List>
        {
          data.map((car: CarResponse, i) => (
            <ListItem key={i}>
              <ListItemText
                primary={car.brand}
                secondary={car.model}>
              </ListItemText>
            </ListItem>
          ))
        }
      </List>

    )
  }
}

export default Carlist;