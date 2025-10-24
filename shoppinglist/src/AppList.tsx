import { Container } from '@mui/material'
import { AppBar, Toolbar, Typography } from '@mui/material'
import './App.css'
import { List, ListItem, ListItemText } from '@mui/material';
import AddItem from './AddItem';
import { useQuery, } from '@tanstack/react-query';
import { getItems } from './api/Itemapi';


function AppList() {

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
            data.map((item) =>
              <ListItem key={item.} divider>
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
