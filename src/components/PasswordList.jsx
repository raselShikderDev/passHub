/* eslint-disable react/prop-types */
import { MdContentCopy, MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PasswordList = ({ arryPasss, removeItem, EditItem }) => {
  const copyText = (text) => {
    toast("Copied to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <section className="pt-10 w-full sm:w-[96%] mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

      <div className=" font-sans">
        <div className="w-full sm:w-[90%] mx-auto space-y-3">
          <h2 className="text-3xl font-bold font-sans">Your Passwords</h2>
          <table className="table-fixed space-y-3 w-full ">
            <thead className="mb-2">
              <tr className="bg-green-300">
                <th className="bg-green-300 border border-white">Website</th>
                <th className="bg-green-300 border border-white">Username</th>
                <th className="bg-green-300 border border-white">Password</th>
                <th className="bg-green-300 border border-white">Actions</th>
              </tr>
            </thead>
            <tbody className="space-y-3">
              {arryPasss.map((item, index) => {
                const { websiteURL, username, password, id } = item;
                return (
                  <tr key={index} className="">
                    <td className="bg-green-100 border border-white py-1 px-2">
                      <div className="flex justify-between items-center">
                        <a
                          href={websiteURL}
                          className="overflow-x-scroll web-cell"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {websiteURL}
                        </a>{" "}
                        <button
                          className="cursor-pointer group"
                          onClick={() => copyText(item.websiteURL)}
                        >
                          <MdContentCopy className="group-active:scale-110" />
                        </button>
                      </div>
                    </td>
                    <td className="bg-green-100 border border-white py-2 px-2">
                      <div className="flex justify-between items-center">
                        <p>{username}</p>{" "}
                        <button
                          className="cursor-pointer group"
                          onClick={() => copyText(item.username)}
                        >
                          <MdContentCopy className="group-active:scale-110" />
                        </button>
                      </div>
                    </td>
                    <td className="bg-green-100 border border-white py-2 px-2">
                      <div className="flex justify-between items-center">
                        <p>{password}</p>
                        <button
                          className="cursor-pointer group"
                          onClick={() => copyText(item.password)}
                        >
                          <MdContentCopy className="group-active:scale-110" />
                        </button>
                      </div>
                    </td>
                    <td className="bg-green-100 border text-center  border-white py-2 px-2">
                      <button onClick={()=> EditItem(id)} className="text-green-500 active:scale-110 hover:text-green-400 font-bold  text-sm px-3 rounded">
                        <FaRegEdit className="text-lg" />
                      </button>
                      <button onClick={()=> removeItem(id)} className="text-red-500 active:scale-110 hover:text-red-400 font-bold  text-sm px-3 rounded">
                        <MdDeleteForever className="text-lg" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PasswordList;
