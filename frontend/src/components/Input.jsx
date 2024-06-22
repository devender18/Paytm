export function Input({ title, holderValue, onChange }) {
  return (
    <div className="flex-col items-center justify-between">
      
        <div className="flex justify-start items-center p-1 m-1">
          <label className="font-medium">{title}</label>
        </div>
        <div className="border-slate rounded-md border-2 flex justify-start items-center p-1 m-1 ml-2">
          <input type="text" id="name" placeholder={holderValue} onChange={onChange} className="border-none w-full outline-none" />
        </div>
      
    </div>
  );
}
