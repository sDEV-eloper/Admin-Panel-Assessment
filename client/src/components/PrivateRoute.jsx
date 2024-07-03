import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';  
const PrivateRoute = ({ element, roles }) => {
  const user = useSelector(selectUser);

  if (!user) {
    return (<Navigate to="/login" />);
  }

  if (roles && roles.includes(user.role)) {
    return element;
  } else {
    return <Navigate to="/user" />;
  }
};

export default PrivateRoute;
