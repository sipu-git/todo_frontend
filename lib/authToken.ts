import axios from "axios";

export  function setAuthToken(token:string | null){
    if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("verifyToken",token)
    }
    else{
        delete axios.defaults.headers.common["Authorization"]
        localStorage.removeItem("verifyToken")
    }
}
