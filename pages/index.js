import {useEffect, useState} from "react";
import axios from "axios";
import toastConfig from "../config/toast.config";
import {toast} from "react-toastify";
import Tables from "../components/Tables";
import Register from "../components/Register";

export default function Home() {
    const [accessGiven, setAccessGiven] = useState(false);
    const [table, setTable] = useState(0);

  const try_access_key = async (access_key, table) => {
    const {data} = await axios.post('/api/return_access_request', {
      requested_key: access_key
    })
    if(data.accessGiven) {
      setAccessGiven(true);
      setTable(table);
    } else {
      if(data.err) {
        toast.error(data.message, toastConfig);
      }
    }
  }

  const trigger_require_access_key = (table) => {
    const access_key = window.prompt("Əməliyyat açarı");

    try_access_key(access_key, table);
  }

  useEffect(() => {
    if(typeof window !== "undefined") {
      // block;
    }
  }, [typeof window !== "undefined"])

  return (
      <>
        {accessGiven ? (
            <Register table={table} />
        ) : (
            <Tables trigger_require_access_key={trigger_require_access_key} />
        )}
      </>
  )
}
