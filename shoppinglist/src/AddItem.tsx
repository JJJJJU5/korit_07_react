// AddItem.tsx
import { Button, TextField, Dialog , DialogActions, DialogTitle , DialogContent}  from "@mui/material";
import { useState } from "react";
import { Item } from "./App";

type AddItemProps = {
  addItem : (item : Item) => void;
}



function AddItem(props: AddItemProps ) {

  const [ item , setItem] = useState<Item>(
    {
      product : '',
      amount : '',
    })

  const [opne , setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // App.tsx의 addItem 함수를 호출하고, item 상태를 전달 
  const addItem = () => {
    props.addItem(item);
    // TextField 있는 내용을 다 지우고 Modal을 닫음
    setItem({
      product : '',
      amount : '',
    })
    handleClose()
  }

  return (
    <>
    <Button onClick={handleOpen} variant= "outlined">
      Add Item
    </Button>
    <Dialog open={opne} onClose={handleClose}>
    <DialogContent>
      <TextField value={item.product} margin="dense" onChange={e => setItem({...item, product: e.target.value})}
        label="Product / 제품명" fullWidth/>
      <TextField value={item.amount} margin="dense" onChange={e => setItem({...item, amount: e.target.value})}
        label="Amount / 수량" fullWidth/>
    </DialogContent>
    <Button onClick={addItem}> Add / 저장</Button>
    <Button onClick={handleClose}> Cancel / 취소</Button>
    </Dialog>
    </>
  );
  // 중복된 이름이 있다면 add 만큼 그 수량을 추가 , 옆에 delete 버튼을 추가해서 삭제 기능 추가 
}

export default AddItem;