import { Heading } from "../components/Heading"
import { Label } from "../components/label"
import { Input } from "../components/Input"
import {Button} from "../components/Button"
import { Link } from "react-router-dom"


export default function Signin(){
    return (
        <div className="bg-cover bg-neutral-500 h-screen w-screen flex justify-center items-center">
            <div className="bg-white h-auto w-96 rounded-2xl flex justify-center items-center">
                <div className="flex-col justify-between items-stretch m-2">
                    <div>
                        <Heading title= "Sign In" />
                    </div>

                    <div className="mt-3">
                        <Label label="Enter your credentials to access your account" />
                    </div>

                    <div className="mt-6"> 
                        <Input title="Email" holderValue="johndoe@example.com"  />
                    </div> 
                    <div className="mt-3"> 
                        <Input title="Password" holderValue=""  />
                    </div> 

                    <div className="mt-4" >
                        <Button title="Sign In" />
                    </div>
                    <div>
                        <div className="flex justify-center items-center m-3">
                            <p className="font-medium">Don&apos;t have an account ? <Link className="underline cursor-pointer" to={"/signup"}>Sign Up</Link></p>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}

