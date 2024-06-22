export function Button({title, onClick}){
    return (
        <>
            <div className="flex items-center justify-center bg-black rounded-lg h-10 m-1 ml-2 cursor-pointer">
                <div className="text-white text-md  font-sans" onClick={onClick}>
                    {title}
                </div>
            </div>
        </>
    )
}