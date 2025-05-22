import {Router} from "express"
const router=Router()
router.route("/register").post(
    upload.fields([

        {
        name:"avatar",
        maxcount:1
        },
        {
            name:"coverimage",
            maxcount:1
        }
    ]),
    registeruser


)
console.log("we have finished regusteruser method execution");
export default router
