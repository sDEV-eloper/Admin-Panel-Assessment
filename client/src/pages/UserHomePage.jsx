import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import Header from "../components/Header";

const UserHomePage = () => {

  const user = useSelector(selectUser);

  return (
  <>
   <Header/>
 <section className="bg-white ">
  <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
    
    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl ">Welcome to User Home Page</h1>
    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 ">Here we have the user details. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat corrupti ab esse tempora nulla asperiores est rem. Reprehenderit, velit cumque.</p>
    
    <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
      <span className="font-semibold text-gray-500 text-2xl uppercase">USER DETAILS</span>
      <div className="flex flex-wrap justify-center items-center mt-8 text-gray-600 sm:justify-between">
      <h2 className="border border-gray-400 rounded-md p-2 ">First Name: {user.firstName}</h2>
      <h2 className="border border-gray-400 rounded-md p-2 " >Last Name: {user.lastName}</h2>
      <h2 className="border border-gray-400 rounded-md p-2 " >Email: {user.email}</h2>
      </div>
    </div> 
  </div>
</section>
</> 
  )
}

export default UserHomePage
