export function Balance({balance}){
    return (
        <div className="flex font-medium h-14 border-b-2 border-b-gray-200 ">
            <div className="flex items-center justify-start ">
                <div className="ml-10 ">
                    <p>Your balance</p>
                </div>
                <div className="ml-3">
                    <p>Rs {balance}</p>
                </div>
            </div>
        </div>
    )
}