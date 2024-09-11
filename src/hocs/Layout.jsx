import Navbar from "../components/organisms/Navbar";
import Alert from "../components/organisms/Alert";
import { connect } from "react-redux";
import { useEffect } from "react";
import { verify, getUser, googleLogin } from "../reducer/Actions";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const Layout = (props) => {
  const location = useLocation();

  useEffect (() => {
    const values = queryString.parse(location.search);
    const code = values.code;
    
    if ( code ) {
        props.googleLogin( code );
    } else {
        props.verify();
        props.getUser();
        console.log("user data is stored in redux store");
    }
  }, [location]);
  
  const hideNavbarRoutes = ["/login", "/signup", "/change-password",'/reset-password'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <div>
            {props.message? <Alert message={props.message}/>: null}
            {props.children}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
      message: state.AuthReducer.message,
      access: state.AuthReducer.access,
      refresh: state.AuthReducer.refresh,
      isAuthenticated: state.AuthReducer.isAuthenticated,
      user: state.AuthReducer.user
  }
}

export default connect(mapStateToProps, { verify, getUser, googleLogin })(Layout);
