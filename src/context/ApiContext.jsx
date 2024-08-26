import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'

const ApiContext = createContext()

export const ApiContextProvider = ({ children }) => {

    const [accessToken, setAccessToken] = useState({});

    // const AccessTokenApi = async () => {
    //     try{
    //         const response = await axios.post(`https://dev.abdm.gov.in/gateway/v0.5/sessions`, {
    //             clientId: "SBX_002928",
    //             clientSecret: "5b24ab9e-2194-4f5f-aca3-fdb0a4872312",
    //             grantType: "client_credentials"
    //         }, {
    //             headers: {
    //                 'Content-Type': 'application/json;charset=utf-8',
    //                 'Accept': 'application/json, text/plain, */*',
    //             }
    //         });
    //         setAccessToken(response.data)
    //     } catch (error) {
    //         console.log(error)
    //     } 
    // }

    // useEffect(() => {
    //     AccessTokenApi()
    // }, [])

    return (
        <ApiContext.Provider value={{  }}>
            {children}
        </ApiContext.Provider>
    )
}

export const ApiAccess = () => {
    return useContext(ApiContext)
}