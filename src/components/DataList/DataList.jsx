import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';



const DataList = ({ nameHeader1, nameHeader2, nameHeader3, field1, field2, field3, data }) => {

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
            sortable: false,
            headerAlign: 'center',
            renderCell: (params) => (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div>
                        <IconButton aria-label="info">
                            <InfoIcon titleAccess='Ver detalhes' />
                        </IconButton>
                    </div>
                    <div>
                        <IconButton aria-label="edit">
                            <EditIcon titleAccess='Editar' />
                        </IconButton>
                    </div>
                    <div>
                        <IconButton aria-label="delete">
                            <DeleteIcon titleAccess='Excluir' />
                        </IconButton>
                    </div>
                </div>
            ),
        },

        // {
        //     field: 'fullName',
        //     headerName: 'Full name',
        //     description: 'This column has a value getter and is not sortable.',
        //     sortable: false,
        //     width: 160,
        //     valueGetter: (params) =>
        //         `${params.row.model || ''} ${params.row.plate || ''}`,
        // }, da pra formatar os dados antes de mostrar com essa função valueGetter
    ];

    // const rows = [
    //     { id: 1, plate: 'Snow', model: 'Jon', color: 'azul' },
    //     { id: 2, plate: 'Lannister', model: 'Cersei', color: 'azul' },
    //     { id: 3, plate: 'Lannister', model: 'Jaime', color: 'azul' },
    //     { id: 4, plate: 'Stark', model: 'Arya', color: 'azul' },
    //     { id: 5, plate: 'Targaryen', model: 'Daenerys', color: null },
    //     { id: 6, plate: 'Melisandre', model: null, color: 'azul' },
    //     { id: 7, plate: 'Clifford', model: 'Ferrara', color: 'azul' },
    //     { id: 8, plate: 'Frances', model: 'Rossini', color: 'azul' },
    //     { id: 9, plate: 'Roxie', model: 'Harvey', color: 'azul' },
    // ];

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
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
};

export default DataList;