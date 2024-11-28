import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineDataSaverOn } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import Logo from "./Logo";
import { useState, useEffect } from "react";
import PasswordList from "./PasswordList";

const Hero = () => {
  const [showPass, setShowPass] = useState(true);
  const [arryPasss, setArryPasss] = useState([]);
  const [formValue, setFormValue] = useState({
    websiteURL: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    try {
      let password = localStorage.getItem("passwords");
      if (password) {
        setArryPasss(JSON.parse(password));
      }
    } catch (error) {
      console.error(`data is invalid - reseting again: ${error}`);
      localStorage.setItem("passwords", JSON.stringify([]));
      setArryPasss([]);
    }
  }, []);

  // Handling Password show and hide button
  const handlePassShowBtn = () => {
    setShowPass((prev) => !prev);
  };

  // Handling Input values
  const handleInput = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  // Handling From Submit Button
  const handleFormSubmitBtn = (e) => {
    e.preventDefault();
    // localStorage.setItem({websiteURL: formValue.websiteURL, username:formValue.username, password:formValue.password})
    setArryPasss((prev) => {
      const updatedPasswords = [...prev, { ...formValue, id: uuidv4() }];
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      return updatedPasswords;
    });
    setFormValue({
      websiteURL: "",
      username: "",
      password: "",
    });
  };

  // Handling Delet Button
  const removeItem = (id) => {
    setArryPasss((prev) => {
      const updatedarryPass = prev.filter((item) => item.id !== id);
      localStorage.setItem("passwords", JSON.stringify(updatedarryPass));
      return updatedarryPass;
    });
    console.log("deleting by: ", id);
  };

  const EditItem = (id) => {
    console.log("Editing by: ", id);
    setFormValue(() => {
      const updatedarryPass = arryPasss.filter((item) => item.id === id)[0];
      return updatedarryPass;
    });
    setArryPasss(() => {
      const updatedarryPass = arryPasss.filter((item) => item.id !== id);
      return updatedarryPass;
    });
  };

  return (
    <section className="font-mono py-10 pt-20">
      <div className="container w-full ">
        <div className=" w-full sm:w-2/3 mx-auto">
          <h2 className="text-center hidden sm:block">
            <a href="#">
              <Logo />
            </a>
          </h2>
          <p className="text-base sm:text-lg text-center font-mono leading-tight">
            Most Advanced & Secured Password Manager
          </p>
          <div className="mt-4 sm:mt-10 w-full">
            <form
              onSubmit={handleFormSubmitBtn}
              className="flex container flex-col justify-center items-center gap-3 w-[90%] sm:w-full"
            >
              <div className="w-[90%] sm:w-full grid grid-cols-1">
                <input
                  type="text"
                  name="websiteURL"
                  onChange={handleInput}
                  value={formValue.websiteURL}
                  placeholder="Enter Your Website URL"
                  className="rounded-full pl-2 py-0.5 outline-none border-[1px] w-full border-[#67c656]"
                />
              </div>
              <div className="w-[90%] sm:w-full relative flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between items-center">
                <input
                  type="text"
                  name="username"
                  onChange={handleInput}
                  value={formValue.username}
                  placeholder="Enter Username"
                  className="rounded-full pl-2 py-0.5 outline-none border-[1px] w-full sm:w-[60%] border-[#67c656]"
                />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  onChange={handleInput}
                  value={formValue.password}
                  placeholder="Enter Password"
                  className="rounded-full pl-2 py-0.5 outline-none border-[1px] w-full sm:w-[37%] border-[#67c656]"
                />
                <div className="absolute right-2 lg:right-3 transform translate-y-[47px] sm:translate-y-0.5 ">
                  <button type="button" onClick={handlePassShowBtn}>
                    {showPass ? (
                      <FaEyeSlash className="text-gray-700" />
                    ) : (
                      <FaEye className="text-gray-700" />
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  disabled={
                    !formValue.websiteURL ||
                    !formValue.username ||
                    !formValue.password
                  }
                  className="font-bold hover:scale-105 hover:bg-green-500 bg-green-400 px-6 py-1 rounded-full border-[0.5px] border-black flex gap-2 items-center"
                >
                  <MdOutlineDataSaverOn />
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <PasswordList
        arryPasss={arryPasss}
        EditItem={EditItem}
        removeItem={removeItem}
      />
    </section>
  );
};

export default Hero;
