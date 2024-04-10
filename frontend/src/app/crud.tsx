import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import css from '../css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Navigate, Route, useNavigate } from 'react-router-dom';

export type CrudColDef = GridColDef & {
    /** configures how this property is to be validated before being sent to the server, if absent, the property is not sent */
    crudType?: "id" | "number" | "string",
    /** configures whether this property is editable when creating or modifying a row, defaults to true */
    crudEnabled?: boolean,
    /** configures whether this property is visible when creating or modifying a row, defaults to true */
    crudVisible?: boolean,
    /** makes the text in the table less important */
    cellClassName?: "crud-cell-dim",
};
type CrudProps<T> = { path: string, title: string, list: () => Promise<{ rows: T[] }>, columns: CrudColDef[] };

export function CrudRoute<T>(props: CrudProps<T>) {
    const crud_list = <CrudList {...props} />;
    const crud_new = <CrudNew {...props} />;
    return (
        <Route path={props.path}>
            <Route path="" element={crud_list} />
            <Route path="new" element={crud_new} />
            <Route path="*" element={<Navigate to="/404" />} />
        </Route>
    );
}

function CrudList<T>(props: CrudProps<T>) {
    const { path, title, list, columns } = props;
    const [rows, setRows] = useState<T[]>([]);
    const [selection, setSelection] = useState<GridRowSelectionModel>([]);
    const navigate = useNavigate();
    useEffect(() => {
        list().then(x => {
            setRows(x.rows);
        });
    }, []);
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: '0.5rem' }}>
                <Typography component="h1" variant="h5" sx={{ marginRight: '3rem' }}>{title}</Typography>
                <Button disabled={selection.length != 0} onClick={crudAdd} startIcon={<AddIcon />}>Add</Button>
                <Button disabled={selection.length != 1} onClick={crudEdit} startIcon={<EditIcon />}>Edit</Button>
                <Button disabled={selection.length == 0} onClick={crudDelete} startIcon={<DeleteIcon />}>Delete</Button>
            </Box>
            <div style={{ height: '400px', width: '100%', flexGrow: 1, flexShrink: 1 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    density='compact'
                    checkboxSelection
                    getRowId={(x) => x.id}
                    onRowSelectionModelChange={setSelection}
                />
            </div>
        </Box>
    );
    function crudAdd() {
        navigate(`/${path}/new`);
    }
    function crudEdit() {
        alert("TODO! edit");
        //if (selection.length == 1) navigate(`/${path}/edit/${selection[0]}`);
    }
    function crudDelete() {
        alert("TODO! delete");
    }
}

function CrudNew<T>(props: CrudProps<T>) {
    const columns = props.columns.filter(x => x.crudVisible !== false);
    const autoFocusIndex = columns.findIndex(x => x.crudEnabled !== false);

    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [validating, setValidating] = useState(false);
    const [data, setData] = useState<Record<string, any>>(() => {
        const obj: any = {};
        for (const x of columns) if (x.crudVisible !== false && x.crudEnabled !== false) obj[x.field] = "";
        return obj;
    });
    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Grid container direction="row" sx={{ marginBottom: '0.5rem' }}>
                    <Grid item>
                        <Typography component="h1" variant="h5" sx={{ marginRight: '3rem' }}>{props.title + " - New"}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            {columns.map((x, i) => (
                <Grid item key={i}>
                    <TextField
                        placeholder={x.headerName}
                        fullWidth
                        name={x.field}
                        variant='outlined'
                        onInput={(event) => setData(data => ({...data, [x.field]: (event.target as HTMLInputElement).value}))}
                        required={!saving && x.crudEnabled !== false}
                        disabled={saving || x.crudEnabled === false}
                        autoFocus={!saving && i == autoFocusIndex}
                        error={validating && x.crudEnabled !== false && !valid(data[x.field])}
                    />
                </Grid>
            ))}
            <Grid item>
                <Grid container direction='row' spacing={2}>
                    <Grid item>
                        <Button variant='contained' disabled={saving} startIcon={<SaveIcon />} onClick={crudSave}>Save</Button>
                    </Grid>
                    <Grid item>
                        <Button variant='outlined' disabled={saving} startIcon={<CancelIcon />} onClick={crudCancel}>Cancel</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
    function crudSave() {
        setValidating(true);
        setSaving(true);
        try {
            alert("TODO! saving");
        } finally {
            setSaving(false);
        }
    }
    function crudCancel() {
        navigate("/" + props.path);
    }
    function valid(x: any) {
        return x !== undefined && x !== null && x !== "";
    }
}

css`
.crud-cell-dim {
    color: #00000080;
}
`
