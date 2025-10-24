import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ChangeEvent, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query"; 
import { Item } from "./type"; 
import { addItems, deleteItem } from "./api/Itemapi"; 




function AddItem() {
    
    const queryClient = useQueryClient(); 
    

    
    const [ open, setOpen ] = useState(false);
    const [ item, setItem ] = useState<Item>({
        product: '',
        amount: '',
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);

        setItem({ product: '', amount: '' }); 
    };
    
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setItem(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    
    const { mutate, isPending } = useMutation({
        mutationFn: addItems, 
        onSuccess: () => {
            
            queryClient.invalidateQueries({ queryKey: ['items'] });
            handleClose(); 
        },
        onError: () => console.error("항목 추가 실패")
    });

    const handleSave = () => {
        if (item.product && item.amount) {
            mutate(item); 
        } else {
            alert("제품명과 수량을 입력해주세요.");
        }
    };
    
    const handleDelete = () => {
        deleteItem()
    }


    return (
        <>
            <Button onClick={handleOpen} variant="outlined">
                Add Item
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Item</DialogTitle>
                <DialogContent>
                    <TextField 
                        name="product"
                        value={item.product} 
                        margin="dense"
                        onChange={handleChange}
                        label="Product/제품명" 
                        fullWidth 
                    />
                    <TextField 
                        name="amount"
                        value={item.amount} 
                        margin="dense"
                        onChange={handleChange}
                        label="Amount/수량" 
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave} > Save /  저장
                    </Button>
                    <Button onClick={handleClose}>
                        Cancel / 취소
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddItem;