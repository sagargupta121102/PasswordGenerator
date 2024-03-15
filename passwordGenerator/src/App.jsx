import { useState, useCallback, useEffect, useRef } from "react"

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [CharactersAllowed, setCharactersAllowed]=useState(false)
  const [Password, setPassword]=useState("")
  const PasswordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(CharactersAllowed) str+=".,/';[]`<>?:{})(*&^%$#@!"
    for(let i=1; i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,CharactersAllowed,setPassword])

  useEffect(()=>{PasswordGenerator()},[length,numberAllowed,CharactersAllowed])
  const passwordRef=useRef(null)

  const copyPasswordtoClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(Password)

  },[Password])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={Password} className="outline-none w-full py-1 px-3"  placeholder="Password" readOnly ref={passwordRef} />
        <button
        onClick={copyPasswordtoClipboard} 
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
      
      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
      <input type="range"  min={6} max={100} value={length} className="cursor-pointer" onChange={(e)=>{setLength(e.target.value)}}/>
      <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={()=>{
          setNumberAllowed((prev)=>!prev)
        }}/>
        <label htmlFor="numberInput">Numbers</label>
        <input type="checkbox" defaultChecked={CharactersAllowed} id="characterInput" onChange={()=>{
          setCharactersAllowed((prev)=>!prev)}}/>
                  <label htmlFor="characterInput">Characters</label>
      </div>
       </div>
       </div>
       
    </>
  )
}

export default App
