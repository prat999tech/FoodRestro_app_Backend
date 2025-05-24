import {Router} from "express"
const router=Router()
router.route("/registerrestro").post(
    upload.fields({
        name:"coverImage",
        maxcount:1
    }),
    createrestaurent
)