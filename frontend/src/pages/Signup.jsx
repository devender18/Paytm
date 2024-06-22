import { Heading } from "../components/Heading"
import { Input } from "../components/Input"
import { Label } from "../components/label"
import { Button} from "../components/Button"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Signup(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <div className="bg-cover bg-neutral-500 h-screen w-screen flex justify-center items-center " >
            <div id="border" className="bg-white h-1/2 w-96 rounded-2xl ">
                <div id="positionDiv" className="flex-col justify-around items-stretch m-2">

                    <div className="">
                        <Heading title = "Sign Up"/>
                    </div>
                    <div className="mt-2">
                        <Label label="Enter your information to create an account"/>
                    </div>
                    <div className="mt-6"> 
                        <Input title="First Name" holderValue="John" onChange={(e)=>{
                            setFirstName(e.target.value)
                        }}  />
                    </div> 
                    <div className="mt-3"> 
                        <Input title="Last Name" holderValue="Doe" onChange={ (e) =>{
                            setLastName(e.target.value)
                        }}  />
                    </div> 
                    <div className="mt-3"> 
                        <Input title="Email" holderValue="johndoe@gmail.com" onChange={ (e)=>{
                            setUsername(e.target.value)
                        }} />
                    </div> 
                    <div className="mt-3" > 
                        <Input title="Password" holderValue="" onChange={(e)=>{
                            setPassword(e.target.value)
                        }} />
                    </div> 
                    <div className="mt-4" >
                        <Button title="Sign Up" onClick = {async()=>{
                            const response = await axios.post('http://localhost:3000/api/v1/user/signup',{
                                username,
                                firstName,
                                lastName,
                                password
                            });
                            localStorage.setItem("token",response.data.token) 
                            navigate("/dashboard")
                        }}/>
                        
                    </div>
                    <div>
                        <div className="flex justify-center items-center m-3">
                            <p className="font-medium">Aready have an account ? <Link className="underline" to={"/signin"}>Login</Link></p>
                        </div>
                    </div>

                </div>
                
            </div>
        </div>
    )
}