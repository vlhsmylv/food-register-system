import {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "react-bootstrap";

const Tables = ({trigger_require_access_key}) => {
    const [tables, setTables] = useState([]);

    const Table = ({table}) => {
        return (
            <Button variant={(typeof table.number !== "number") ? "danger" : "success"} disabled={table.status!=="empty"} onClick={() => {
                if(table.status==="empty") {
                    trigger_require_access_key(table.number);
                }
            }}>
                Masa {table.number}
            </Button>
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
                <main style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div>Restoran Sifariş Sistemi</div>
                    <div style={{
                        maxWidth: "400px",
                        flexWrap: "wrap",
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center"
                    }}>
                        {tables.map((table, i) => (
                            <Table key={i} table={table} />
                        ))}
                    </div>
                </main>
            )}
        </>
    )
}

export default Tables;