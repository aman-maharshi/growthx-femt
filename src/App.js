import {useState, useRef} from "react"

import { IoImage } from "react-icons/io5"
import { IoIosAdd } from "react-icons/io"

function App() {

  const [enableEdit, setEnableEdit] = useState(true)
  const inputRef = useRef(null)
  const [heroPic, setHeroPic] = useState(null)

  const handleImageUpload = (e) => {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setHeroPic(imageUrl)
  }


  return (
    <div>
      {enableEdit && (
        <div className="p-4 px-8 bg-zinc-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button>Site Builder</button>
            <button>Sections</button>
          </div>
          <div>
            <button onClick={() => setEnableEdit(false)}>Preview</button>
          </div>
        </div>
      )}
      <div className="bg-zinc-200 py-8 px-24 h-[100vh]">
        <div>
          <input 
            type="text" 
            placeholder="Enter site title" 
            className="bg-transparent p-2 outline-none" 
            disabled={!enableEdit}
          />

          <div className="grid grid-cols-3 mt-20 gap-4">
            <div className="p-4 col-span-1">
              <div 
                className={`h-72 w-72 bg-zinc-300 rounded-xl ${heroPic ? "overflow-hidden relative" : "flex items-center justify-center border border-2 border-dashed border-zinc-400"}`}
              >
                <input ref={inputRef} id="hero-image" onChange={handleImageUpload} className="hidden" type="file" disabled={!enableEdit} />
                <button onClick={() => inputRef.current.click()}>
                  {heroPic ? <img src={heroPic} className="absolute top-0 left-0 h-full w-full object-cover" /> : <IoImage className="h-16 w-16 text-zinc-600" />}
                </button>
              </div>
            </div>
            <div className="p-4 col-span-2 flex flex-col justify-center">

              <input 
                type="text" 
                placeholder="Click to add title" 
                className="p-2 bg-transparent outline-none font-medium text-5xl pb-0" 
                disabled={!enableEdit}
              />
              <input 
                type="text" 
                placeholder="Click to add subtitle" 
                className="p-2 outline-none bg-transparent"
                disabled={!enableEdit}
              />
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <input 
              type="text" 
              placeholder="Enter your name here" 
              className="p-2 outline-none bg-transparent font-bold"
              disabled={!enableEdit}
            />
            <input 
              type="text" 
              placeholder="Enter email" 
              className="p-2 outline-none bg-transparent"
              disabled={!enableEdit}
            />
          </div>

          <div className="mt-10 p-4 border border-2 border-dashed border-zinc-400 rounded-lg flex items-center justify-center gap-2 cursor-pointer bg-zinc-300 font-bold">
            <IoIosAdd className="h-6 w-6 font-bold" /> Click to add sections
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
