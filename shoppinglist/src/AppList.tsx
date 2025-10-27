import { Container } from '@mui/material'
import { AppBar, Toolbar, Typography } from '@mui/material'
import './App.css'
import { List, ListItem, ListItemText } from '@mui/material';
import AddItem from './AddItem';
import { useMutation, useQuery, useQueryClient, } from '@tanstack/react-query';
import { deleteItem, getItems } from './api/Itemapi';
import { ItemResponse } from './type';


function AppList() {
  
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
    onError: () => console.error("항목 삭제 실패")
  });

  const delBtn = (item: ItemResponse) => {
    mutate(item);
  };

    

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['items'],
    queryFn: getItems,
  });

  if (isLoading) {
    return <span>로딩중</span>
  }
  if (!isSuccess) {
    return <span>에러</span>
  }
  else return (
    <>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant='h6'>
              쇼핑 리스트 Shopping List
            </Typography>
          </Toolbar>
        </AppBar>
        <AddItem />
        <List >
          {
            data.map((item : ItemResponse) =>
              <ListItem key={item._links.self.href} divider>
                <ListItemText primary={item.product} secondary={item.amount}></ListItemText>
              </ListItem>
            )
          }
        </List>
      </Container>
    </>
  )
}
export default AppList
