import { useState, useRef, useEffect } from "react"

import { IoImage } from "react-icons/io5"
import { IoIosAdd } from "react-icons/io"
import { FaCaretDown } from "react-icons/fa";

function App() {
  const [enableEdit, setEnableEdit] = useState(true)
  const [heroPic, setHeroPic] = useState(null)
  const [showSectionsMenu, setShowSectionsMenu] = useState(false)
  const [data, setData] = useState([])
  const inputRef = useRef(null)
  const menuRef = useRef(null)

  const handleImageUpload = (e) => {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setHeroPic(imageUrl)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowSectionsMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuRef])

  const handleAddAboutSection = () => {
    if (data.some(item => item.sectionName === "about")) return
    
    setData([...data, {sectionName: "about", sectionData: {}}])
    setShowSectionsMenu(false)

    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 300);
  }

  return (
    <div className="bg-zinc-200">
      {enableEdit && (
        <div className="p-4 md:px-8 bg-zinc-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-10">
            <button>WEBSITE BUILDER</button>
            <button className="flex gap-2 items-center">Sections <FaCaretDown className="text-white" /></button>
          </div>
          <div>
            <button className="bg-blue-600 px-8 py-2 text-sm rounded-full" onClick={() => setEnableEdit(false)}>Preview</button>
          </div>
        </div>
      )}
      <div className="p-4 md:py-8 md:px-24 min-h-[70vh]">
        <div>
          <input 
            type="text" 
            placeholder="Enter site title" 
            className="bg-transparent p-2 outline-none" 
            disabled={!enableEdit}
          />

          <div className="grid md:grid-cols-3 grid-cols-1 mt-8 md:mt-20 md:gap-4">
            <div className="py-4 md:px-4 col-span-1">
              <div 
                className={`h-60 w-60 md:h-72 md:w-72 bg-zinc-300 rounded-xl ${heroPic ? "overflow-hidden relative" : "flex items-center justify-center border border-2 border-dashed border-zinc-400"}`}
              >
                <input ref={inputRef} id="hero-image" onChange={handleImageUpload} className="hidden" type="file" disabled={!enableEdit} />
                <button onClick={() => inputRef.current.click()}>
                  {heroPic ? <img src={heroPic} className="absolute top-0 left-0 h-full w-full object-cover" /> : <IoImage className="h-16 w-16 text-zinc-600" />}
                </button>
              </div>
            </div>
            <div className="py-4 md:px-4 col-span-2 flex flex-col justify-center">

              <input 
                type="text" 
                placeholder="Click to add title" 
                className="p-2 bg-transparent outline-none font-medium text-3xl md:text-5xl pb-0" 
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
              type="email" 
              placeholder="Enter email" 
              className="p-2 outline-none bg-transparent"
              disabled={!enableEdit}
            />
          </div>
        </div>
      </div>

      {data.map((item, index) => {
        if (item.sectionName === "about") {
          return (
            <div key={index} className="p-4 md:py-8 md:px-24 min-h-[70vh]">
               <div className="grid md:grid-cols-3 grid-cols-1 mt-8 md:mt-20 md:gap-4">
                <div className="col-span-1"></div>
                <div className="py-4 md:px-4 col-span-2">
                  <h3 className="font-bold text-2xl">About Me</h3>
                </div>
              </div>
            </div>
          )
        }
      })}

      {enableEdit && (
        <div className="relative p-4 md:px-8 md:pb-8 grid grid-cols-3 mt-10">
          <div className="col-span-1"></div>
          <div className="col-span-2">
          <div 
            onClick={() => setShowSectionsMenu(true)}
            className="p-4 border border-2 border-dashed border-zinc-400 rounded-lg flex items-center justify-center gap-2 cursor-pointer bg-zinc-300 font-bold"
          >
            <IoIosAdd className="h-6 w-6 font-bold" /> Click to add sections
          </div>

          {showSectionsMenu && (
            <div ref={menuRef} className="absolute bottom-[70px] left-1/2 -translate-x-1/2 p-4 bg-white shadow-xl rounded-xl flex flex-col gap-4 font-normal w-[300px]">
              <button onClick={handleAddAboutSection} className="flex items-center gap-3 p-2 outline-none bg-transparent hover:bg-zinc-100 rounded-xl">
                <IoIosAdd className="h-6 w-6 bg-zinc-200 rounded-full" /> 📌 Add About you
              </button>
              <button className="flex items-center gap-3 p-2 outline-none bg-transparent hover:bg-zinc-100 rounded-xl">
                <IoIosAdd className="h-6 w-6 bg-zinc-200 rounded-full" /> 💡 Add Skillsets
              </button>
              <button className="flex items-center gap-3 p-2 outline-none bg-transparent hover:bg-zinc-100 rounded-xl">
                <IoIosAdd className="h-6 w-6 bg-zinc-200 rounded-full" /> ⚒️ Add Projects
              </button>
              <button className="flex items-center gap-3 p-2 outline-none bg-transparent hover:bg-zinc-100 rounded-xl">
                <IoIosAdd className="h-6 w-6 bg-zinc-200 rounded-full" /> 🌐 Add Experience
              </button>
              <button className="flex items-center gap-3 p-2 outline-none bg-transparent hover:bg-zinc-100 rounded-xl">
                <IoIosAdd className="h-6 w-6 bg-zinc-200 rounded-full" /> 🔗 Add CTA
              </button>
            </div>
          )}

          </div>
        </div>
      )}
    </div>
  );
}

export default App;
