import logo from './logo.svg';
import './App.css';
import { useState, useRef } from 'react';
import axios from "axios"
import CanvasDraw from "react-canvas-draw";
function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [isPark, setisPark] = useState(null);
  const canvas = useRef(); 
  const [isPark2, setisPark2] = useState(null);
  const [isSelected, setSelected] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setSelected(true)

  };
  function check(e) {
    e.preventDefault()
    const formData = new FormData();
    formData.append("file", selectedFile);
    axios.post("http://localhost:5000/predict", formData).then(res => {
    console.log(res.data)  
    if (res.data.pred === "park") {
        setisPark(true)
      } else {
        setisPark(false)
      }
    })
  }
  function check2(e) {
    e.preventDefault()
    const formData = new FormData();
    console.log(canvas.current.getDataURL())
    
    
    axios.post("http://localhost:5000/predict2", {img:canvas.current.getDataURL()}).then(res => {
    console.log(res.data)  
    if (res.data.pred === "park") {
        setisPark2(true)
      } else {
        setisPark2(false)
      }
    })
  }
  return (
    <div className='bg-gray-800 h-screen text-white grid grid-cols-2 place-items-center gap-5'>
      <div className='p-7 rounded-xl bg-gray-700 shadow-2xl max-w-screen-sm '>
        <div className='font-bold text-4xl'>Parkinson's Disease Detector</div>
        <form onSubmit={check} className='mt-5   flex flex-col gap-5'>
      
          {!isSelected ?
            <label for="file" className='text-center border p-6 rounded-xl border-gray-800 hover:bg-gray-600 hover:border-0 w-full '>Upload Drawing</label>
            :
            <img className='w-1/2 mx-auto rounded-lg' alt='' src={URL.createObjectURL(selectedFile)} />
          }
          <input onChange={changeHandler} hidden id='file' type={"file"}></input>

          {
            isPark === null ? <div className='font-bold'>Waiting for image...</div> :

              isPark ?
                <div className='text-red-400 font-bold'>
                  <div>Parkinson Detected</div>
                  <div className='text-white font-normal'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </div>
                </div> :
                <div className='text-green-400 font-bold'>
                  <div>No Parkinson Detected</div>
                  <div className='text-white font-normal'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </div>
                </div>
          }
          <button type='submit' className='p-3 rounded-lg bg-yellow-500 text-black'>Check</button>




        </form>

      </div>
      <div className='p-7 rounded-xl bg-gray-700 shadow-2xl max-w-screen-sm '>
        <div className='font-bold text-4xl'>Parkinson's Disease Live Tester</div>
        <div className=''>
          <CanvasDraw ref={canvas} canvasHeight={300} canvasWidth={300} backgroundColor="#fff" brushRadius={5} />
        </div>
        <form onSubmit={check2} className='mt-5   flex flex-col gap-5'>
        {
            isPark === null ? <div className='font-bold'>Waiting for image...</div> :

              isPark ?
                <div className='text-red-400 font-bold'>
                  <div>Parkinson Detected</div>
                  <div className='text-white font-normal'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </div>
                </div> :
                <div className='text-green-400 font-bold'>
                  <div>No Parkinson Detected</div>
                  <div className='text-white font-normal'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </div>
                </div>
          }
          <button type='submit' className='p-3 rounded-lg bg-yellow-500 text-black'>Check</button>
        </form>
      </div>
    </div>
  );
}

export default App;
