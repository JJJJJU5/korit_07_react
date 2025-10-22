import { ChangeEvent, useState } from "react";
import { CarResponse, Car, CarEntity } from "../types";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import CarDialogContent from "./CarDialogContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCar } from "../api/carapi";
type FormProps = {
  cardata: CarResponse
  car?: Car
}

function EditCar({ cardata }: FormProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [car, setCar] = useState<Car>({
    brand: "",
    model: "",
    color: "",
    registrationNumber: "",
    modelYear: 0,
    price: 0,
  });
  const { mutate } = useMutation(updateCar, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
    },
    onError: () => {
      console.log("실패")
    },
  }
  )

  const handleOpen = () => {
    setOpen(true)
    // Modal이 열렸을 떄 특정 id 값에 맞는 정보를 불러오면 좋겠다. 그래서 AddCar에서의 handleClickOpen()과 코드라인의 차이가 생긴다.
    setCar({
      ...cardata
      // brand : cardata.brand,
      // model : cardata.model,
      // color : cardata.color ,
      // registrationNumber : cardata.registrationNumber,
      // modelYear : cardata.modelYear,
      // price : cardata.price,
    })
  };
  const handleClose = () => {setOpen(false)
    setCar({
      brand: "",
      model: "",
      color: "",
      registrationNumber: "",
      modelYear: 0,
      price: 0,
    })
  };
  const handleSave = () => {
    const url = cardata._links.self.href;
    const CarEntity: CarEntity = { car, url };
    mutate(CarEntity);

    setOpen(false)
  };
  // AddCar.tsx에서 그대로 복사
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCar({ ...car, [e.target.name]: e.target.value })
  }

  return (
    <>
      <button onClick={handleOpen}>수정</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent> 수정</DialogContent>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleSave}>저장</button>
          <button onClick={handleClose}>취소</button>
        </DialogActions>
      </Dialog>
    </>
    )
}

export default EditCar;