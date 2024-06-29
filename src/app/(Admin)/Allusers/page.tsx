"use client"

import React, { useEffect, useState } from "react";

import User from "@/type/admin";
import Loading from "@/components/loading";
import ErrorPage from "@/components/error";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchData = async () => {
    try {
      const response = await fetch("/api/GetAllUsers"); // Update the endpoint as needed
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: User[] = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Error fetching user data");
      setLoading(false);
    }
  };
  useEffect(() => {
    

    fetchData();
  }, []);

  async function Deletebutton(UserEmail : any){
    try{
      const response = await fetch(`/api/DeleteUser`, {
        method: "POST", 
        body: JSON.stringify({ email: UserEmail }), 
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json(); 
      if (data.success) {
        console.log("User deleted successfully!");
      }
      setLoading(false);
    }catch(error){
      console.error("Error fetching user data:", error);
      setError("Error in delete of User ");
      setLoading(false);
    }finally{
        fetchData();
    }
  }

  if (loading) {
    return <Loading/>
  }

  if (error) {
    return <ErrorPage
            error={error}/>
  }

  return (
    <div className="container mx-auto bg-gradient-to-tr from-blue-500 via-blue-300 to-blue-700">
      <h1 className="text-3xl font-bold text-center text-blue-400">
        User List
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-md rounded-lg p-6 border border-blue-500 mr-7 ml-7 mb-3"
          >
            <span onClick={()=> {Deletebutton(user.userEmail)}} className="  bg-red-500 font-bold rounded-md p-1 text-white cursor-pointer">Delete</span>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              {user.userEmail}
              
            </h2>
            <p className="text-gray-700">
              Count: <span className="font-medium">{user.count}</span>
            </p>
            {user.urls.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-blue-500 mb-2">
                  URLs:
                </h3>
                <ul className="list-disc list-inside text-blue-500">
                  {user.urls.map((url, index) => (
                    <li key={index}>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="underline text-blue-500 hover:text-blue-600">
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
