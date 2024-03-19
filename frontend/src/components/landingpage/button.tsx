import React from "react";

const Button : React.FC= () => {
    return (
        <div className="flex justify-center py-12">
            <button className= "text-black text-3xl text-center bg-white p-6">Sign In</button>
        </div>
    );
}

export default Button;