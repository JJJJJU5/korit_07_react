import { Container } from '@mui/material'
import { AppBar, Toolbar, Typography } from '@mui/material'
import './App.css'
import { useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import AddItem from './AddItem';
import { Item } from './type';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getItems } from './api/Itemapi';


function App() {

  const usequery = useQueryClient();

  const [items, setItems] = useState<Item[]>([]);

  const addItem = (item: Item) => {
    setItems([item, ...items]);}
  const { data, isSuccess, error } = useQuery({
    queryKey: ['items'],
    queryFn: getItems,
  });

  if (!isSuccess) {
    return <span>로딩중</span>
  }
  else if (error) {
    return <span>에러</span>
  }
  const itemList = data

    return (
      <>
        <Container>
          <AppBar position="static">
            <Toolbar>
              <Typography variant='h6'>
                쇼핑 리스트 Shopping List
              </Typography>
            </Toolbar>
          </AppBar>
          <AddItem addItem={addItem} />
          <List >
            {
              itemList.map((item, index) =>
                <ListItem key={index} divider>
                  <ListItemText primary={item.product} secondary={item.amount}></ListItemText>
                </ListItem>
              )
            }
          </List>
        </Container>
      </>
    )
  }
export default App
