import React from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const [form, setform] = useState({ site: "", usernames: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordArray, setpasswordArray] = useState([]);
  const passwordRef = useRef();

  useEffect(() => {
    let passwords = localStorage.getItem("password");

    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const toggleIcon = () => {
    setShowPassword((prevShowPassword) => {
      const newShowPassword = !prevShowPassword;
      passwordRef.current.type = newShowPassword ? "text" : "password";
      return newShowPassword;
    });
  };
  const copyText = (text) => {
    toast("🦄 Copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    navigator.clipboard.writeText(text);
  };

  const savePassword = () => {
    console.log(form);
    setpasswordArray([...passwordArray, {...form , id : uuidv4()}]);
   
    localStorage.setItem("password", JSON.stringify([...passwordArray, {...form , id : uuidv4()}]));
    console.log([...passwordArray, form]);
    setform({ site: "", usernames: "", password: "" })
    toast("🦄 Saved successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  };  

  const editPassword = (id) =>{
 console.log("editing password"+ id)
 let e = confirm("Are you sure you really want to edit this?")
 if(e){
 setform(passwordArray.filter(item=>item.id==id)[0]);
 setpasswordArray(passwordArray.filter(item=>item.id!==id));
 }

  
   
  //  localStorage.setItem("password", JSON.stringify([...passwordArray, {...form , id : uuidv4()}]));

}
  
  const deletePassword = (id) =>{
    console.log("delete password"+ id)
    
    let c = confirm ("do you really want to delete?")
    if (c){

    
    setpasswordArray(passwordArray.filter(item=>item.id!==id));
    localStorage.setItem("password", JSON.stringify((passwordArray.filter(item=>item.id!==id))));
  }
  toast("🦄 Deleted successfully!", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
}

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[100vh] w-[100vw] rounded-full bg-green-400 opacity-20 blur-[300px]"></div>
      </div>
      <div className="  w-[70vw] mx-auto mt-16">
        <div className="logo items-center flex w-full justify-center">
          <ul>
            <li className="text-black font-bold text-3xl">
              <span className="text-green-600">&lt;</span>Pass
              <span className="text-green-600">OP/&gt;</span>
            </li>
          </ul>
        </div>
        <div className="text flex w-full items-center justify-center">
          <p>Your own Password Manager</p>
        </div>
        <div className="input w-full flex justify-center ">
          <input
            className=" w-[70rem] flex items-center outline-none border border-green-300 rounded-xl h-7  max-[680px]:w-[26rem] "
            type="text"
            placeholder="Enter Website URL"
            value={form.site}
            name="site"
            onChange={handleChange}
          />
        </div>
        <div className="input  flex gap-5 justify-center max-[680px]:flex-col">
          <input
            className=" w-[60rem] mt-5 flex items-center  outline-none border border-green-300 rounded-xl h-7 pl-2 ml-[35px] max-[680px]:w-[60vw] "
            type="text"
            placeholder="Enter Username"
            value={form.usernames}
            name="usernames"
            onChange={handleChange}
          />
          <div className="flex items-center justify-center">
          <input
            className="  mt-5 flex items-center flex-row outline-none border border-green-300 rounded-xl h-7 pl-2  max-[680px]:mt-0 max-[680px]:ml-9 max-[680px]:w-[26rem] "
            type="password"
            ref={passwordRef}
            placeholder="Enter Password"
            value={form.password}
            name="password"
            onChange={handleChange}
          />
         
          <span
            className=" relative top-[10px] right-[25px] max-[680px]:top-0 "
            onClick={toggleIcon}
          >
            
            {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
          </span>
          </div>
        </div>
        <div className="button w-full flex items-center justify-center">
          <button
            onClick={savePassword}
            className="bg-green-400 mt-7 border border-black p-2 w-48 rounded-full flex justify-center items-center gap-2 max-[680px]:mt-0 "
            type="button"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div>
          <span className="text-2xl font-bold ml-24 max-[1390px]:justify-center flex max-[1390px]:ml-0 max-[1390px]:pt-3 ">Your Passwords</span>
        </div>
        {passwordArray.length === 0 && (
          <div className="ml-24 mt-5 text-xl "> No passwords to show..... </div>
        )}
        {passwordArray.length > 0 && (
          <table className="table-auto w-[60vw] mx-auto mt-5 overflow-hidden rounded-xl">
            <thead>
              <tr className="bg-green-900  text-white   ">
                <th>Site</th>
                <th>Username</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="bg-green-200   ">
              {passwordArray.map((item, index) => {
                return (
                  <tr key={index} className=" ">
                    <td className="  py-2   flex justify-center items-center border border-white gap-1 ">
                      <a href={item.site} target="_blank">
                        <span> {item.site}</span>
                      </a>
                      <div
                        onClick={() => {
                          copyText(item.site);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/depeqmsz.json"
                          trigger="hover"
                          style={{
                            width: "25px",
                            height: "25px",
                            cursor: "pointer",
                          }}
                        ></lord-icon>
                      </div>
                    </td>
                    <td className="  py-2  border border-white  ">
                      <div
                        className="flex justify-center items-center gap-1  "
                        onClick={() => {
                          copyText(item.usernames);
                        }}
                      >
                        <span>{item.usernames}</span>
                        <div>
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              cursor: "pointer",
                            }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="text-center  py-2  border border-white  ">
                      <div
                        className=" flex justify-center items-center gap-1"
                        onClick={() => {
                          copyText(item.password);
                        }}
                      >
                        <span>{item.password}</span>
                        <lord-icon
                          src="https://cdn.lordicon.com/depeqmsz.json"
                          trigger="hover"
                          style={{
                            width: "25px",
                            height: "25px",
                            cursor: "pointer",
                          }}
                        ></lord-icon>
                      </div>
                    </td>
                    <td className="text-center  py-2  border border-white  ">
                      <div
                        className=" flex justify-center items-center gap-1"
                        onClick={() => {}}
                      >
                        <span className="flex justify-center items-center gap-5" onClick={()=>{editPassword(item.id)}}>
                          <script src="https://cdn.lordicon.com/lordicon.js"></script>
                          <lord-icon
                            src="https://cdn.lordicon.com/wkvacbiw.json"
                            trigger="hover"
                            style={{
                              width: "30px",
                              height: "30px",
                              cursor: "pointer",
                              
                            }}
                            ></lord-icon></span>
                           <span className="flex justify-center items-center gap-5" onClick={()=>{deletePassword(item.id)}}>
                         
                          <script src="https://cdn.lordicon.com/lordicon.js"></script>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{
                              width: "30px",
                              height: "30px",
                              cursor: "pointer",
                            }}
                          ></lord-icon>
                        </span> 
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Manager;
