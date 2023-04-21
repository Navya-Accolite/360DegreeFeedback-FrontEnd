import { useState ,createContext,useContext} from "react";
const AuthContext =createContext(null);
export const Auth=(props) => {
    const[isAuthenticated,setIsAuthenticated]=useState(false);
    const[emailId,setEmailId]=useState("");
    const[accessToken,setAccessToken]=useState([]);
    const[name,setName]=useState("");
    const updateusermail=(e)=>setEmailId(e);
    const updateaccessToken=(e)=>setAccessToken(e);
    const updatename=(e)=>setName(e);
    const handleLogin=()=>{
        setIsAuthenticated(true);
    }
    const handleLogout=()=>{
        setIsAuthenticated(false);
        setEmailId("");
        setAccessToken("");
        localStorage.clear();
    }
    return(
        <AuthContext.Provider
        value={{
            isAuthenticated,
            emailId,
            accessToken,
            setEmailId,
            setAccessToken,
            handleLogin,
            handleLogout
        }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
export default AuthContext;