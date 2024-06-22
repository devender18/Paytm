import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users} from "../components/Users";
export default function Dashboard(){
    return (
        <>
            <div>
                <div className="m-2">
                    <Appbar />
                    <Balance balance="10,000" />
                    <Users />
                </div>
            </div>
        </>
    )
}