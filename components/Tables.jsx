import {useEffect, useState} from "react";
import axios from "axios";

const Tables = ({trigger_require_access_key}) => {
    const [tables, setTables] = useState([]);

    const Table = ({table}) => {
        return (
            <button disabled={table.status!=="empty"} onClick={() => {
                if(table.status==="empty") {
                    trigger_require_access_key(table.number);
                }
            }}>
                Masa {table.number}
            </button>
        )
    }

    const get_tables = async () => {
        const {data} = await axios.get("/api/tables");
        setTables(data);
    }

    useEffect(() => {
        get_tables();
    }, [])

    return (
        <>
            {tables.length === 0 ? (
                <>Yüklənir...</>
            ) : (
                <>{tables.map((table, i) => (
                    <Table key={i} table={table} />
                ))}</>
            )}
        </>
    )
}

export default Tables;