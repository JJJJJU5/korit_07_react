import { Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { addCar } from "../api/carapi";
import CarDialogContent from "./CarDialogContent";


function AddCar() {
  const [open, setOpen] = useState(false)
  const [car, setCar] = useState({
    brand: "",
    model: "",
    color: "",
    registrationNumber: "",
    modelYear: 0,
    price: 0,
  });
  const [tme, setTme]= useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClickClose = () => {
    setOpen(false)
    setCar({
      brand: "",
      model: "",
      color: "",
      registrationNumber: "",
      modelYear: 0,
      price: 0,
    })
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setCar({ ...car, [e.target.name]: e.target.value });

  const queryClient = useQueryClient();

  const { mutate } = useMutation(addCar, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] })
      handleClickClose();
      setTme(true);
    },
    onError: () => console.log('실패')
  })

  const handleSave = () => {
    mutate(car);
    handleClickClose();
  }
  
  return (
    <>
      <button onClick={handleClickOpen}> 추가</button>
      <Dialog open={open}>
        <DialogTitle>차량 추가</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleSave}> 저장 | Save </button>
          <button onClick={handleClickClose}> 취소 | Cancel </button>
        </DialogActions>
      </Dialog>
      <Snackbar 
        open={tme}
        autoHideDuration={2000}
        onClose={() => setTme(false)}
        message = "선택한 항목이 추가되었습니다.❗"
      />    
      </>
  );
}

export default AddCar;