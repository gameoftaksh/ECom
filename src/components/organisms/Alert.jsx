import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { closeAlert } from "../../reducer/Actions";


const Alert = (props) => {
  const [classAlert, setClassAlert] = useState("alert");

  // Automatically close the alert after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000); // Close after 5 seconds

    return () => clearTimeout(timer); // Clean up on component unmount
  }, []);

  const handleClose = () => {
      setClassAlert("alert d-none");
      props.closeAlert();
  };
    return (
        <>
          <div
                className={`${classAlert} fixed top-18 right-0 z-[var(--toastify-z-index)] p-4 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 animate-slide-in`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
                        <path d="M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">{props.message}</p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      onClick={handleClose}
                      className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Close</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="relative w-full h-1 mt-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-500 animate-progress-bar"
                    style={{ animationDuration: '5s' }}
                    onAnimationEnd={handleClose} // Dismiss alert when animation ends
                  ></div>
                </div>
          </div>
        </>
    );
};

export default connect(null, { closeAlert })(Alert);