import tables from "../../data/tables.json";

export default function handler(req, res) {
    res.status(200).json(tables);
}