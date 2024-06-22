import { Button } from "./Button"
import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function Users(){
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+ filter)
        .then((response)=>{
            setUsers(response.data.user)
        })
    }, [filter])
    return (
        <div className="font-medium">
            <div className="ml-1 h-8">
                <p className="text-lg">Users</p>
            </div>
            <div className="border rounded-md h-10 flex  items-center">
                <input type="text" placeholder="Search users..." className="mx-2 w-full outline-none" onChange={(e) => {
                    setFilter(e.target.value);
                }}/>
            </div>
            <div>
                {users.map(user => <User key= {user._id} user={user} />)}
            </div>
        </div>
    )
}

function User({user}){
    const navigate = useNavigate();
    return (
        <div>
            <div className="my-2 flex justify-between items-center ">
                <div className="flex justify-center items-center ">
                    <div className="bg-gray-200 rounded-full flex justify-center items-center w-12 h-12">
                        <p>{user.firstName[0]}</p>
                    </div>
                    <div className="ml-4">
                        <div>
                            <p className="font-normal">{`${user.firstName} ${user.lastName}`}</p> {/*  */}
                        </div>
                    </div>
                </div>

                <div className="w-48">
                    <Button title = "Send Money" className="" onClick={(e)=>{
                        navigate(`/send?id=${user._id}&name=${user.firstName}`);
                    }}/>
                </div>

            </div>
        </div>
    )
}