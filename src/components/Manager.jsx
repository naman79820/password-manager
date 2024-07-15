import React from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

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

  const savePassword = () => {
    console.log(form);
    setpasswordArray([...passwordArray, form]);
    localStorage.setItem("password", JSON.stringify([...passwordArray, form]));
    console.log([...passwordArray, form]);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
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
            className=" w-[60vw] flex items-center outline-none border border-green-300 rounded-xl h-7 pl-2 "
            type="text"
            placeholder="Enter Website URL"
            value={form.site}
            name="site"
            onChange={handleChange}
          />
        </div>
        <div className="input w-full flex gap-5 justify-center ">
          <input
            className=" w-[49vw] mt-5 flex items-center  outline-none border border-green-300 rounded-xl h-7 pl-2 ml-[35px] "
            type="text"
            placeholder="Enter Username"
            value={form.usernames}
            name="usernames"
            onChange={handleChange}
          />
          <input
            className="  mt-5 flex items-center  outline-none border border-green-300 rounded-xl h-7 pl-2 "
            type="password"
            ref={passwordRef}
            placeholder="Enter Password"
            value={form.password}
            name="password"
            onChange={handleChange}
          />
          <span
            className="relative right-[45px] top-[27px]"
            onClick={toggleIcon}
          >
            {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
          </span>
        </div>
        <div className="button w-full flex items-center justify-center">
          <button
            onClick={savePassword}
            className="bg-green-400 mt-7 border border-black p-2 w-48 rounded-full flex justify-center items-center gap-2 "
            type="button"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>{" "}
            Add Password{" "}
          </button>
        </div>
        <div>
          <span className="text-2xl font-bold ml-24">Your Passwords</span>
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
              </tr>
            </thead>
            <tbody className="bg-green-200   ">
              {passwordArray.map((item, index) => {
                return (
                  <tr key={index} className=" ">
                    <td
                      className="  py-2   flex justify-center items-center border border-white gap-1 "
                    >
                      
                      <a href={item.site} target="_blank">
                       <span> {item.site}</span>
                      </a>
                      <div>
                      <lord-icon
                        src="https://cdn.lordicon.com/depeqmsz.json"
                        trigger="hover"
                        style={{"width":"25px" , "height":"25px" , "cursor":"pointer"}}
                      ></lord-icon>
                      </div>  
                    </td>
                    <td className="  py-2  border border-white  ">
                      <div className="flex justify-center items-center gap-1 ">
                      <span>
                      {item.usernames}</span>
                      <div>
                      <lord-icon
                        src="https://cdn.lordicon.com/depeqmsz.json"
                        trigger="hover"
                        style={{"width":"25px" , "height":"25px" , "cursor":"pointer"}}
                      ></lord-icon>
                      </div>
                      </div>
                    </td>
                    <td className="text-center  py-2  border border-white  ">
                      <div className=" flex justify-center items-center gap-1">
                      <span>{item.password}</span>
                      <lord-icon
                        src="https://cdn.lordicon.com/depeqmsz.json"
                        trigger="hover"
                        style={{"width":"25px" , "height":"25px" , "cursor":"pointer"}}
                      ></lord-icon>
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
