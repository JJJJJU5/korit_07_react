import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import { GridApi, ColDef, GridReadyEvent } from "ag-grid-community";
import { Button, Snackbar, Alert, Box } from "@mui/material";
import { getItems, deleteItem } from "../api/shoppingapi";
import { ShoppingItem } from "../type";
import EditItem from "../components/EditItem";
import AddItem1 from "../components/AddItem";

import 'ag-grid-community/styles/ag-theme-material.css'
import 'ag-grid-community/styles/ag-grid.css'



function ShoppingItemList() {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [opneSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackBarMsg] = useState("");
  const [snackbarServerity, setSnackBarServerity] = useState<'success' | 'error'>
    ('success')

  const quertClient = useQueryClient();

  const { data: items, isLoding, isError, error } = useQuery<ShoppingItem[], Error>({
    queryKey: ['items'],
    queryFn: getItems,
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      quertClient.invalidateQueries({ queryKey: ['items'] });
      setSnackBarMsg('해당 쇼핑 품목이 정상적으로 삭제되었습니다.');
      setSnackBarServerity('success');
      setOpenSnackbar(true);
    },
    onError: (error) => {
      console.log('삭제 에러 :', error);
      const message = error?.message || '삭제 실패 에러';
      setSnackBarMsg(message)
      setSnackBarServerity('error');
      setOpenSnackbar(true);
    },
  });

  const columnDefs: ColDef<ShoppingItem>[] = [
    {
      field: "product", sortable: true, filter: true, flex: 2
    },
    { field: "amount", sortable: true, filter: true, flex: 1 },
    {
      field: "purchased",
      sortable: true,
      filter: true,
      flex: 1,
      cellRenderer: (params: { value: boolean }) => params.value ? 'Yes' : 'No'
    },
    {
      cellRenderer: (params: { data?: ShoppingItem }) => (
        params.data ? <EditItem itemdata={params.data} /> : null
      ),
    },
    {
      cellRenderer: (params: { data?: ShoppingItem }) => (
        params.data ?
          <Button
            size="small"
            color="error"
            onClick={() => {
              if (window.confirm(`${params.data?.product} 항목을 삭제하시겠습니까?`)) {
                deleteMutate(params.data.id);
              }
            }}
          >Delete
          </Button> : null
      ),
      width: 120,
    },
  ];

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  if (isLoding) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>항목을 가져오는 데 오류가 발생했습니다. {error.message} </span>
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: 'flex-start', mb: 2, mt: 2 }}>
        <AddItem1 />
      </Box>

      <Box className='ag-theme-material' style={{ minHeight: '500px', height: '500px', width: '100%' }}>
        <AgGridReact
          rowData={items}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          onGridReady={onGridReady}
          animateRows={true}
          domLayout="autoHeight"
        />
      </Box>
      <Snackbar
        open={opneSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbarServerity}
          onClose={() => setOpenSnackbar(false)}

        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ShoppingItemList;