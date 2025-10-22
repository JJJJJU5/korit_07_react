import { ChangeEvent } from "react";
import { Car } from "../types";
import { DialogContent, Stack, TextField } from "@mui/material";

type DialogFormProps = {
  car: Car;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function CarDialogContent({ car, handleChange }: DialogFormProps) {
  return (
    <DialogContent>
      <Stack spacing={2} mt={1} >
        <TextField label="브랜드" name="brand" value={car.brand} onChange={handleChange} />
        <TextField label="모델" name="model" value={car.model} onChange={handleChange} />
        <TextField label="색상" name="color" value={car.color} onChange={handleChange} />
        <TextField label="차량번호" name="registrationNumber" value={car.registrationNumber} onChange={handleChange} />
        <TextField label="연식" name="modelYear" value={car.modelYear} onChange={handleChange} />
        <TextField label="가격" name="price" value={car.price} onChange={handleChange} />
      </Stack>
    </DialogContent>
  );
}

export default CarDialogContent