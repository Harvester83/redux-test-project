import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { addUser, fetchUsers, userSelector } from "../store/user/slice";

const UserPage = () => {
  const selectedUsers = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const [newUserName, setNewUserName] = useState<string>("");
  const [newUserEmail, setNewUserEmail] = useState<string>("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    const newUser = {
      id: (selectedUsers.users.length + 1).toString(),
      name: newUserName,
      email: newUserEmail,
    };

    dispatch(addUser(newUser));
  };


  return (
    <div>
      {selectedUsers.loading && <div>Loading...</div>}
      {selectedUsers.users.map((user) => (
        <li key={user.id}>
          {user.id} | {user.name} | {user.email}
        </li>
      ))}

      <div>
        <input
          type="text"
          placeholder="Name"
          aria-label="name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Email"
          aria-label="email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
        ></input>
        <button type="submit" className="btn" onClick={handleAddUser}>
          Add
        </button>
      </div>
    </div>
  );
};
export default UserPage;
