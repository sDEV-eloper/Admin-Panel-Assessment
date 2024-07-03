import { useEffect, useState } from 'react';
import axios from 'axios';
import { MdAdd } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import Header from '../components/Header';


const Admin = () => {


  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState({
    createUserModal: false,
    updateUserModal: false,
    deleteModal: false,
    selectedUser: null,
  });

  const fetchUsers = () => {
    axios
      .get('/api/admin/users')
      .then((response) => setUsers(response.data.filter(user => user.role === 'user')))
      .catch((error) => console.error(error));
  };
  

  useEffect(() => {
   fetchUsers();
  }, []);

  const openModal = (modalType, user = null) => {
    setModalOpen({ ...modalOpen, [modalType]: true, selectedUser: user });
  };

  const closeModal = (modalType) => {
    setModalOpen({ ...modalOpen, [modalType]: false, selectedUser: null });
  };

  const handleAddUser = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newUser = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    axios
      .post('/api/admin/users', newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        fetchUsers()
        closeModal('createUserModal');
      })
      .catch((error) => console.error(error));
  };

  const handleUpdateUser = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedUser = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
    };

    axios
      .put(`/api/admin/users/${modalOpen.selectedUser._id}`, updatedUser)
      .then((response) => {
        setUsers(
          users.map((user) =>
            user._id === modalOpen.selectedUser._id ? response.data : user
          )
        );
        fetchUsers()
        closeModal('updateUserModal');
      })
      .catch((error) => {
        console.error('Error updating user:',error);
        
      });
  };

  const handleDeleteUser = () => {
    
    axios
      .delete(`/api/admin/users/${modalOpen.selectedUser._id}`)
      .then(() => {
        setUsers(users.filter((user) => user._id !== modalOpen.selectedUser._id));
        fetchUsers()
        closeModal('deleteModal');
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Header />
      <section className="bg-gray-50 p-3 sm:p-5 antialiased">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => openModal('createUserModal')}
                  className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                  <MdAdd />
                  Add User
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      First Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Last Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Email
                    </th>
                  
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b">
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                        {user.firstName}
                      </td>
                      <td className="px-4 py-3">{user.lastName}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3 flex items-center justify-end gap-4">
                        <button
                          onClick={() => openModal('updateUserModal', user)}
                          className="text-sm font-medium hover:bg-green-800 px-6 py-2 text-center text-white rounded-md focus:outline-none bg-green-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openModal('deleteModal', user)}
                          className="text-sm font-medium hover:bg-red-700 px-3 py-2 text-center text-white rounded-md focus:outline-none bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      {modalOpen.createUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <form onSubmit={handleAddUser}>
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-2xl font-semibold">Add User</h3>
                  <button
                    type="button"
                    onClick={() => closeModal('createUserModal')}
                    className="p-1 ml-auto border-0 text-black opacity-50 float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
                  >
                    <IoClose />
                  </button>
                </div>
                <div className="relative p-6 flex-auto bg-gray-100">
                  <div className="mb-4">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="mt-1 p-2 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="mt-1 p-2 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="mt-1 p-2 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      className="mt-1 p-2 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    type="submit"
                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => closeModal('createUserModal')}
                    className="ml-2 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg border border-gray-300 text-sm font-medium px-4 py-2 focus:z-10"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {modalOpen.updateUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <form onSubmit={handleUpdateUser}>
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-2xl font-semibold">Update User</h3>
                  <button
                    type="button"
                    onClick={() => closeModal('updateUserModal')}
                    className="p-1 ml-auto border-0 text-black opacity-50 float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
                  >
                    <IoClose />
                  </button>
                </div>
                <div className="relative p-6 flex-auto bg-gray-100">
                  <div className="mb-4">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      defaultValue={modalOpen.selectedUser.firstName}
                      className="mt-1 p-2 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      defaultValue={modalOpen.selectedUser.lastName}
                      className="mt-1 p-2 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      defaultValue={modalOpen.selectedUser.email}
                      className="mt-1 p-2 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    type="submit"
                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => closeModal('updateUserModal')}
                    className="ml-2 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg border border-gray-300 text-sm font-medium px-4 py-2 focus:z-10"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {modalOpen.deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-2xl font-semibold">Delete User</h3>
                <button
                  type="button"
                  onClick={() => closeModal('deleteModal')}
                  className="p-1 ml-auto border-0 text-black opacity-50 float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
                >
                  <IoClose />
                </button>
              </div>
              <div className="relative p-6 flex-auto bg-gray-100">
                <p>Are you sure you want to delete {modalOpen.selectedUser.firstName} {modalOpen.selectedUser.lastName}?</p>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                <button
                  type="button"
                  onClick={handleDeleteUser}
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => closeModal('deleteModal')}
                  className="ml-2 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg border border-gray-300 text-sm font-medium px-4 py-2 focus:z-10"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
