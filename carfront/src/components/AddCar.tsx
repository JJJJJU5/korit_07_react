import { Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Button, IconButton, Tooltip } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCar } from "../api/carapi";
import CarDialogContent from "./CarDialogContent";
import AddRoundedIcon from '@mui/icons-material/AddRounded';


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
  const [tme, setTme] = useState(false);

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
    if (window.confirm(`저장하시겠습니까?`))
      mutate(car);
    handleClickClose();
  }

  return (
    <>
      <Tooltip title="추가">
        <IconButton size="large" onClick={handleClickOpen}>
          <AddRoundedIcon fontSize="large"></AddRoundedIcon>
        </IconButton>
      </Tooltip>
      <Dialog open={open}>
        <DialogTitle>차량 추가</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleSave}> 저장 | Save </Button>
          <Button onClick={handleClickClose}> 취소 | Cancel </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={tme}
        autoHideDuration={2000}
        onClose={() => setTme(false)}
        message="선택한 항목이 추가되었습니다.❗"
      />
    </>
  );
}

export default AddCar;