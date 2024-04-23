/*
--------------------------------------- CHANGE LOG ---------------------------------------
Date(DD/MM/YY)        Author      Version         Remarks
------------------------------------------------------------------------------------------
20/03/2024            Amer Syu     1.0.0           - Base Setup 
*/

//Lib
import { useEffect } from "react"
import CryptoJS from "crypto-js"
import { trackPromise } from "react-promise-tracker";
import { onError } from "@apollo/client/link/error";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs"
import { ApolloClient as Client, ApolloProvider, InMemoryCache, from } from "@apollo/client";

//localImport
import { decrypt, encrypt } from "./assets/utilities/cryptoUtil";

const ApolloClient = ({ children }) => {

  useEffect(() => {
    const secretKey = localStorage.getItem("secretKey");
    (!secretKey) && generateKey();
  }, [])

  // const getKey = async () => {
  //   var secretKey = localStorage.getItem("secretKey");
  //   if (!secretKey) {
  //     const { secretKey: sKy } = generateKey();
  //     secretKey = sKy;
  //   }
  //   return {
  //     secretKey
  //   }
  // }

  const generateKey = () => {
    const secretKey = CryptoJS.lib.WordArray.random(32).toString();
    return secretKey;
  }

  const interceptor = async (url, opts) => {
    const { headers } = opts;
    headers["apollo-require-preflight"] = true;
    headers["LANG"] = localStorage.getItem("lang") || "en";
    if (typeof opts.body === "string") {
      // console.log("enter here1", opts, url)
      headers["content-type"] = "text/plain;charset=utf-8";
      // const body = encrypt(opts.body, localStorage.getItem("secretKey"));
      const newOptions = { ...opts, headers };
      return trackPromise(
        fetch(url, newOptions).then((res) => {
          // console.log(res);
          const { status, statusText, headers } = res;
          const init = { status, statusText, headers };
          return res.text().then((data) => {
            // console.log(data,res)
            return new Response(data, init)
          })
        })
      )
    } else {
      return trackPromise(fetch(url, opts))
    }
  }

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    graphQLErrors &&
      graphQLErrors.forEach((err) => {
        console.log(`[GRAPHQL ERROR] ${err.extensions.msg ? err.extensions.msg : err.message}`)
      })
    networkError && console.log(`[NETWORK ERROR] ${networkError.message}`, networkError);
  })

  const uploadLink = createUploadLink({
    uri: import.meta.env.VITE_GQL_HOST,
    fetch: interceptor,
    maxFileSize: 5242880,
  })

  const client = new Client({
    link: from([errorLink, uploadLink]),
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloClient;