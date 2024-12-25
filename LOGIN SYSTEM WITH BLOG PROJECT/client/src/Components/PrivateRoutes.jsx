import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PrivateRoutes = ({ children }) => {

    const [cookies] = useCookies(['verificationToken']);
    const token = cookies.verificationToken;

    if (!token) {
        return <Navigate to="/sign-in" />;
    } else {
        return children;
    }
};

export default PrivateRoutes;
