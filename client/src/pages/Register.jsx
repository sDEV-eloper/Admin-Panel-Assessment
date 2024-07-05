import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

  const [firstName, setFirstName]=useState();
  const [lastName, setLastName]=useState();
  const [email, setEmail]=useState();
  const [password, setPassword]=useState();
  const [role, setRole]=useState();
  const [error, setError] = useState('');

  const navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault(); 
    try {
    const response=await axios.post('/api/users/register', {
        firstName,
        lastName,
        email,
        password,
        role
      });
      console.log('User registered successfully:', response);
      navigate('/login')
    } catch (error) {
      console.error('Error registering user', error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  }


  return (
    <>
     <section className="bg-gray-50 ">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
          Create an account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label  className="block  text-sm font-medium text-gray-900 "> First Name</label>
            <input type="text" name="firstName" id="firstName" value={firstName} onChange={(e)=>setFirstName(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="First Name" required />
          </div>
          <div>
            <label  className="block  text-sm font-medium text-gray-900 "> Last Name</label>
            <input type="text" name="lastName" id="lastName" value={lastName}  onChange={(e)=>setLastName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Last Name" required />
          </div>
          <div>
            <label  className="block  text-sm font-medium text-gray-900 "> Email</label>
            <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required />
          {error && <p className="text-red-600 text-sm">*{error}</p> }
          </div>
          <div>
            <label  className="block  text-sm font-medium text-gray-900 ">Password</label>
            <input type="password" name="password" id="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required />
          </div>
          <div>
                  <label className="block  text-sm font-medium text-gray-900 ">Role</label>
                  <select
                    name="role"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary p-2.5 "
                    required
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
          <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 ">Create an account</button>
          <p className="text-sm font-light text-gray-500 ">
            Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline ">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>

    </>
  )
}

export default Register
