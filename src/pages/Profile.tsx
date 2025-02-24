import { ChangeEvent, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router";
import { addProfile, logout } from "../utils/api";
import {
  FaHeadset,
  FaInfoCircle,
  FaAngleRight,
  FaMale,
  FaFemale,
} from "react-icons/fa";
import { getUserLocal } from "../utils/helperFn";
import { useGetProfile } from "../hooks/QueryHooks";
import { toast } from "react-toastify";
import { useQueryClient } from '@tanstack/react-query'
// import { useGetProfile } from "../hooks/QueryHooks";

type FormEditData = {
  name: string;
  gender: string;
  age: number | string;
};

export function Profile() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [userId] = useState<string | undefined>(getUserLocal().userLocalId);
  const [formEditData, setFormEditData] = useState<FormEditData>({
    name: "",
    gender: "",
    age: "",
  });
  const navigate = useNavigate();
  const { data } = useGetProfile(userId || "");
  const queryClient = useQueryClient()



  // console.log(data, error, userId);

  async function handleLogout() {
    const { error } = await logout();
    if (!error) navigate("/");
  }

  useLayoutEffect(() => {
    if (!userId) {
      navigate("/auth");
    }
    setFormEditData((state) => ({
      ...state,
      name: data?.profile.data?.name || "",
      age: data?.profile.data?.age || "",
      gender: data?.profile.data?.gender.toLowerCase() || "",
    }));
  }, [navigate, userId, data]);

  async function saveEditHandler() {

    console.log("submit")
    if (!isEdit) {
      setIsEdit(true);
      return;
    }
    if (typeof userId == "undefined") return;
    if (formEditData.gender == "male" || formEditData.gender == "female"){
      
      const {error} = await addProfile(
        userId,
        formEditData.name,
        formEditData.gender,
        Number(formEditData.age)
      );
      if (!error) {
        queryClient.invalidateQueries({ queryKey: ['profile'] })
        setIsEdit(false);
      } else {
        toast("Fail update profile");
      }
    }
  }

  function editFormHandler(e: ChangeEvent<HTMLInputElement>) {
    const { name } = e.target;
    setFormEditData((state) => ({ ...state, [name]: e.target.value }));
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl text-center font-light mb-2">Profile</h1>
      </div>

      <div className="my-1">
        <div className="flex justify-center">
          <div className="w-50 h-50 bg-gray-400 rounded-full">
            {/* no photo */}
          </div>
        </div>

        {isEdit ? (
          <div>
            <form action="" className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="border-b focus:ring-0 focus:outline-none"
                name="name"
                id="name"
                value={formEditData.name}
                onChange={editFormHandler}
              />
              <span>Gender</span>
              <div className="grid grid-cols-2 gap-4 my-1">
                <div
                  className={`flex flex-col items-center rounded-md border py-4 ${
                    formEditData?.gender !== "male" && "opacity-25"
                  }`}
                  onClick={() =>
                    setFormEditData((state) => ({ ...state, gender: "male" }))
                  }
                >
                  <FaMale size={32} />
                  Male
                </div>
                <div
                  className={`flex flex-col items-center rounded-md border py-4 ${
                    formEditData?.gender !== "female" && "opacity-25"
                  }`}
                  onClick={() =>
                    setFormEditData((state) => ({ ...state, gender: "female" }))
                  }
                >
                  <FaFemale size={32} />
                  Female
                </div>
              </div>
              {/* <label htmlFor="">Gender</label>
              <input type="text" className="border-b focus:ring-0 focus:outline-none" /> */}
              <label htmlFor="age">Age</label>
              <input
                type="number"
                className="border-b focus:ring-0 focus:outline-none"
                name="age"
                id="age"
                value={formEditData?.age}
                onChange={editFormHandler}
              />
              {/* <div> */}
              <div className="grid grid-cols-2 gap-3 my-2">
                <div
                  className="flex justify-center border border-gray-500 dark:border-gray-600 py-2 rounded"
                  onClick={saveEditHandler}
                >
                  <span>Save</span>
                </div>
                <div
                  onClick={() => setIsEdit(false)}
                  className="flex justify-center bg-gray-300 border-gray-300 dark:bg-gray-700 border dark:border-gray-700 py-2 rounded"
                >
                  <span>Cancel</span>
                </div>
              </div>
              {/* </div> */}
            </form>
          </div>
        ) : (
          <div className="my-3">
            <div>Name:{data?.profile.data?.name}</div>
            <div>Gender:{data?.profile.data?.gender}</div>
            <div>Age:{data?.profile.data?.age}</div>
          </div>
        )}
      </div>

      {/* <h1>Profile</h1> */}
      <div className="grid grid-cols-2 gap-3" hidden={isEdit}>
        <div
          className="flex justify-center border border-gray-500 dark:border-gray-600 py-2 rounded"
          onClick={saveEditHandler}
        >
          <span>Edit Profile</span>
        </div>
        <div
          onClick={handleLogout}
          className="flex justify-center bg-gray-300 border-gray-300 dark:bg-gray-700 border dark:border-gray-700 py-2 rounded"
        >
          <span>Log Out</span>
        </div>
      </div>

      <div className="gap-2 flex flex-col my-4">
        <div className="flex flex-row justify-between items-center bg-gray-100 dark:bg-gray-600 rounded">
          <div className="flex flex-row py-3 px-3 items-center gap-5 ">
            <div className="dark:bg-slate-700 bg-slate-200  h-10 w-10 rounded-full justify-center flex items-center">
              <FaHeadset />
            </div>
            <div className="flex flex-col text-left">
              <span>Customer Support</span>
              <span className="text-sm font-thin">Get help and support</span>
            </div>
          </div>
          <div className="py-3 px-3">
            <FaAngleRight />
          </div>
        </div>

        <div className="flex flex-row justify-between items-center bg-gray-100 dark:bg-gray-600 rounded">
          <div className="flex flex-row py-3 px-3 items-center gap-5">
            <div className="dark:bg-slate-700 bg-slate-200  h-10 w-10 rounded-full justify-center flex items-center">
              <FaInfoCircle />
            </div>
            <div className="flex flex-col text-left">
              <span>About App</span>
              <span className="text-sm font-thin">
                Learn more about BookGether
              </span>
            </div>
          </div>
          <div className="py-3 px-3">
            <FaAngleRight />
          </div>
        </div>
      </div>
    </div>
  );
}
