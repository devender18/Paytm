import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

export default function SendMoney(){
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");
    const id = searchParams.get("id");
    const [amount, setAmount] = useState(0);
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="shadow-2xl h-96 w-1/4 rounded-xl flex-col">
                <div className="flex justify-between items-center h-12 mt-10">
                    <p className="font-bold text-3xl mx-auto mt-5">Send Money</p>
                </div>
                <div className="m-10">
                    <div className="flex justify-start items-center">
                        <div className="bg-green-400 h-12 w-12 rounded-full flex justify-center items-center">
                            <p className="text-white text-2xl">{name[0]}</p>
                        </div>
                        <div className="ml-5">
                            <p className="font-bold text-2xl">{name}</p>
                        </div>

                    </div>

                    <div className="font-medium mt-2">
                        <p>Amount (in Rs)</p>
                    </div>
                    <div className="border rounded-lg flex items-center h-10 mt-3">
                        <input type="text" placeholder="Enter amount" className="ml-2 font-medium outline-none" onChange={(e) => setAmount(e.target.value)}></input>
                    </div>

                    <div className="bg-green-400 rounded-lg h-10 flex justify-center items-center mt-5">
                        <p className="text-white cursor-pointer font-medium " onClick={async ()=>{
                            await axios.post(`http://localhost:3000/api/v1/account/transfer`,{
                                to :  id,
                                amount 
                            },{
                                headers : {
                                    Authorization : `Bearer ${localStorage.getItem("token")}`
                                }
                            })
                        }}>Initiate Transfer</p>
                    </div>
                </div>
            </div>
        </div>
    )
}