import { ChangeEvent } from "react";
import { Car } from "../types";
import { DialogContent } from "@mui/material";

type DialogFormProps = {
  car: Car;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function CarDialogContent({car, handleChange }: DialogFormProps) {
  return (
      <DialogContent>
        <input type="text" name="brand" value={car.brand} placeholder="Brand" onChange={handleChange} /> <br />
        <input type="text" name="model" value={car.model} placeholder="Model" onChange={handleChange} /> <br />
        <input type="text" name="color" value={car.color} placeholder="Color" onChange={handleChange} /> <br />
        <input type="text" name="registrationNumber" value={car.registrationNumber} placeholder="Num" onChange={handleChange} /> <br />
        <input type="text" name="modelYear" value={car.modelYear} placeholder="M-Y" onChange={handleChange} /> <br />
        <input type="text" name="price" value={car.price} placeholder="Price" onChange={handleChange} /> <br />
      </DialogContent>
  );
}

export default CarDialogContent