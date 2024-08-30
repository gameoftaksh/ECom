import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
// import { closeAlert } from "../reducer/Actions";
import { closeAlert } from "../../reducer/Actions";


const Alert = (props) => {
    const [classAlert, setClassAlert] = useState("alert");
    const handleClose = () => {
        setClassAlert("alert d-none");
        props.closeAlert();
    };
    return (
        <>
        <div className={`${classAlert} fixed top-18 right-4 w-1/5`}>
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{props.message}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
                </div>
        </div>
        </>
    );
};

export default connect(null, { closeAlert })(Alert);


// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// // import { closeAlert } from "../reducer/alertSlice";
// import { closeAlert } from "../../reducer/Actions";


// const Alert = ({ message }) => {
//     const [classNameAlert, setClassAlert] = useState("alert");
//     const dispatch = useDispatch();

//     const handleClose = () => {
//         setClassAlert("alert d-none");
//         dispatch(closeAlert());
//     };

//     return (
//         <div className={classAlert}>
//             <div className="flex">
//                 <div className="p-4">{message}</div>
//                 <button
//                     className="ml-auto mr-2 m-auto bg-transparent border-none text-gray-500 hover:text-gray-700 focus:outline-none"
//                     type="button"
//                     onClick={handleClose}
//                 >
//                     &times;
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Alert;