import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCar, getCars } from "../api/carapi";
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from "@mui/x-data-grid";
import { Snackbar, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';



function Carlist() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteCar, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    }, onError: () => console.log('실패')
  })
  

  const columns: GridColDef[] = [
    { field: 'brand', headerName: '브랜드', width: 150, },
    { field: 'model', headerName: '모델', width: 150, },
    { field: 'color', headerName: '색상', width: 150, },
    { field: 'registrationNumber', headerName: '차량번호', width: 150, },
    { field: 'modelYear', headerName: '연식', width: 150, },
    { field: 'price', headerName: '가격', width: 150, },
    {
      field: 'edit',
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (<EditCar cardata={params.row} />)
    },
    {
      field: 'delete', headerName: "", width: 150, sortable: false, filterable: false, hideable: false, disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <Tooltip title="삭제">
          <IconButton aria-label="삭제" size="small" onClick={() => {
            if (window.confirm(`${params.row.brand}의 ${params.row.model} 자동차를 삭제하시겠습니까?`))
              mutate(params.row._links.self.href)
          }
          }
          > <RemoveCircleRoundedIcon fontSize="medium"></RemoveCircleRoundedIcon>
          </IconButton>
        </Tooltip>
      )
    }
  ];



  const { data, isSuccess, error } = useQuery({
    queryKey: ['cars'],
    queryFn: getCars,
  });

  if (!isSuccess) {
    return <span>Loading...🚀</span>
  }
  else if (error) {
    return <span>자동차들을 불러오는 데 실패했습니다. ❗</span>
  }
  else {
    return (
      <>
        <AddCar />
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row._links.self.href}
          slots={{ toolbar: GridToolbar }}>

        </DataGrid>

        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="선택한 항목이 삭제되었습니다.❗"
        />
      </>
    )
  }
}

export default Carlist;