import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';


const DataList = ({
    nameHeader1,
    nameHeader2,
    nameHeader3,
    field1, field2,
    field3, functionEdit,
    functionDelete,
    functionView,
    itUserPage = false,
    data
}) => {

    const [userPage, setUserPage] = useState(itUserPage);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: field1,
            headerName: nameHeader1,
            width: 150,
            editable: false,
        },
        {
            field: field2,
            headerName: nameHeader2,
            width: 120,
            editable: false,
        },
        {
            field: field3,
            headerName: nameHeader3,
            width: 120,
            editable: false,
        },
        {
            field: 'actions',
            headerName: 'Ações',
            flex: 1,
            minWidth: 200,
            sortable: false,
            headerAlign: 'center',
            renderCell: (params) => (
                < div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div>
                        <IconButton aria-label="info" onClick={() => functionView(params.id)} sx={{ marginRight: '20px' }}>
                            <InfoIcon titleAccess='Ver detalhes' />
                        </IconButton>
                    </div>
                    {!userPage &&
                        <>
                            <div>
                                <IconButton aria-label="edit" onClick={() => functionEdit(params.id)} sx={{ marginRight: '20px' }}>
                                    <EditIcon titleAccess='Editar' />
                                </IconButton>
                            </div>
                            <div>
                                <IconButton aria-label="delete" onClick={() => functionDelete(params.id)} sx={{ marginRight: '20px' }}>
                                    <DeleteIcon titleAccess='Excluir' />
                                </IconButton>
                            </div>
                        </>
                    }

                </div >
            ),
        },
    ];

    const rows = data;



    return (
        <Box sx={{ height: 400, width: '100%', marginTop: '20px' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
        </Box>
    );
};

export default DataList;