import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle  } from "@mui/material";
import { useEffect, useState } from "react";
import { Item } from "./App";
import { getItems } from "./api/Itemapi";

type AddItemProps = {
  addItem: (item: Item) => void;
}

function AddItem(props: AddItemProps) {
  const [ open, setOpen ] = useState(false);
  const [ item, setItem ] = useState<Item>({
    product: '',
    amount: ''
  })
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const addItem = () => {
    props.addItem(item);
    setItem({product: '',amount: ''});
    handleClose();
  }
  useEffect(() => {
    getItems
  }, [])

  return (
    <>
      <Button onClick={handleOpen} variant="outlined">
        Add Item
      </Button>
      <Dialog open={open} /*onClose={handleClose}*/>
        <DialogTitle>New Item</DialogTitle>
        <DialogContent>
          <TextField value={item.product} margin="dense"
            onChange={e => setItem({...item, product: e.target.value})}
            label="Product/제품명" fullWidth />
          <TextField value={item.amount} margin="dense"
            onChange={e => setItem({...item, amount: e.target.value})}
            label="Amount/수량" fullWidth
          />
        </DialogContent>
        <Button onClick={addItem}>
          Add / 저장
        </Button>
        <Button onClick={handleClose}>
          Cancel / 취소
        </Button>
      </Dialog>
    </>
  );
}

export default AddItem;