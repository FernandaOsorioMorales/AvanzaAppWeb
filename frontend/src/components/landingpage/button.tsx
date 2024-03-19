import React from "react";
import { Link } from "react-router-dom";

const Button : React.FC= () => {
    return (
        <div className="flex justify-center py-12">
            <Link to="/login" className= "text-black text-3xl text-center bg-white p-6">Sign In</Link>
        </div>
    );
}

export default Button;