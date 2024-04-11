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
import { ConfirmDialog, ErrorAlert } from '../comp';

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
export type CrudProps<T> = { path: string, title: string, list: () => Promise<{ rows: T[] }>, upsert: (value: T) => Promise<unknown>, delete: (ids: number[]) => Promise<unknown>, columns: CrudColDef[] };

type State<T> = "read" | { "write": T | null }

export function Crud<T extends { id: number }>(props: CrudProps<T>) {
    const [crudState, setCrudState] = useState<State<T>>("read");
    return crudState === "read"
        ? <CrudRead setCrudState={setCrudState} {...props} />
        : <CrudWrite setCrudState={setCrudState} row={crudState.write} {...props} />;
}

function CrudRead<T extends { id: number }>(props: CrudProps<T> & { setCrudState: (value: State<T>) => void }) {
    const [confirm, setConfirm] = useState<[string, string] | null>(null);
    const { path, title, list, columns } = props;
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState<T[]>([]);
    const [selection, setSelection] = useState<GridRowSelectionModel>([]);
    useEffect(() => {
        setLoading(true);
        list().then(x => {
            setRows(x.rows);
        }).finally(() => {
            setLoading(false);
        });
    }, []);
    return <>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: '0.5rem' }}>
                <Typography component="h1" variant="h5" sx={{ marginRight: '3rem' }}>{title}</Typography>
                <Button disabled={selection.length != 0} onClick={crudAdd} startIcon={<AddIcon />}>Add</Button>
                <Button disabled={selection.length != 1} onClick={crudEdit} startIcon={<EditIcon />}>Edit</Button>
                <Button disabled={selection.length == 0} onClick={crudDelete} startIcon={<DeleteIcon />}>Delete</Button>
            </Box>
            <div style={{ height: '400px', width: '100%', flexGrow: 1, flexShrink: 1 }}>
                <DataGrid
                    loading={loading}
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
        <ConfirmDialog prompState={[confirm, setConfirm]} onConfirm={crudDeleteConfirm} />
    </>;
    function crudAdd() {
        props.setCrudState({"write": null});
    }
    function crudEdit() {
        if (selection.length != 1) return;
        let row = rows.find(x => x.id == selection[0]);
        if (!row) {
            console.warn(`row with id ${selection[0]} does not exist even though it is selected`);
            props.setCrudState({"write": null}); // as a fallback, do an add
        } else {
            props.setCrudState({"write": row});
        }
    }
    function crudDelete() {
        if (selection.length == 0) return;
        if (selection.length == 1) {
            setConfirm(["Are you sure you want to delete this record?", "Yes, delete this record"]);
        } else {
            setConfirm([`Are you sure you want to delete ${selection.length} records?`, "Yes, delete these records"]);
        }
    }
    function crudDeleteConfirm() {
        setRows(rows.filter(x => !selection.includes(x.id)));
    }
}

function CrudWrite<T extends { id: number }>(props: CrudProps<T> & { setCrudState: (value: State<T>) => void, row: T | null }) {
    const columns = props.columns.filter(x => x.crudVisible !== false);
    const autoFocusIndex = columns.findIndex(x => x.crudEnabled !== false);

    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const [validating, setValidating] = useState(false);
    /*const [data, setData] = useState<Record<string, any>>(() => {
        const obj: any = {};
        for (const x of columns) if (x.crudVisible !== false && x.crudEnabled !== false) obj[x.field] = "";
        return obj;
    });*/
    const [data, setData] = useState<Record<string, any>>(!props.row ? {} : JSON.parse(JSON.stringify(props.row)));
    return <>
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
                        name={"crud_" + x.field}
                        variant='outlined'
                        value={data[x.field]}
                        onInput={(event) => setData(data => ({ ...data, [x.field]: (event.target as HTMLInputElement).value }))}
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
        <ErrorAlert errorState={[error, setError]} />
    </>;
    async function crudSave() {
        setValidating(true);
        for (const column of columns) {
            if (column.crudEnabled !== false && !valid(data[column.field])) {
                console.log(`field ${column.field} not present in`, data);
                setError("All fields must be filled before saving");
                return;
            }
        }
        setSaving(true);
        try {
            await props.upsert(data as T);
            props.setCrudState("read");
        } catch (error) {
            setError("An error occoured when saving the data");
            throw error;
        } finally {
            setSaving(false);
        }
    }
    function crudCancel() {
        props.setCrudState("read");
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
