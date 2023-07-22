import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { User, fetchUsers, userSelector } from "../store/user/slice";

const UserPage = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  //const [error, setError] = useState<string | undefined>(undefined);
  // const [newUserName, setNewUserName] = useState<string>("");
  // const [newUserEmail, setNewUserEmail] = useState<string>("");

   const selectedUsers = useAppSelector(userSelector);
//  const selectedUsers = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(selectedUsers.loading);
    //setError(selectedUsers.error);
    setUsers(selectedUsers.users);
  }, [selectedUsers]);

//   const handleAddUser = () => {
//     const newUser = {
//       id: (selectedUsers.length + 1).toString(),
//       name: newUserName,
//       email: newUserEmail,
//     };

//     dispatch(addUser(newUser));
//   };

  function handleFetchUser() {
    dispatch(fetchUsers());
  }
  return (
    <div>
    {loading && <div>Loading...</div>}
    {/* {error && <div>Error: {error}</div>} */}
    {users?.map((user) => (
      <li key={user.id}>
        {user.id} | {user.name} | {user.email}
      </li>
    ))}
    <button className="btn" onClick={handleFetchUser}>Fetch</button>
  </div>
  );
};
export default UserPage;
