import access_keys from "../../data/access_keys.json";

export default function handler(req, res) {
    if(req.method === "POST") {
        const access_key = req.body.requested_key;

        const access_response = access_keys[access_keys.findIndex(_key => (
            _key === access_key
        ))]

        if(access_response === undefined) {
            return res.status(200).json({
                err: true,
                message: "Açar düzgün daxil olunmadı"
            })
        }

        return res.status(200).json({
            accessGiven: true
        })
    }
}