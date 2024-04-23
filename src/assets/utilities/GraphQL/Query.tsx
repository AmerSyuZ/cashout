import React, {
  useState,
  useEffect,
  forwardRef,
  RefAttributes,
  useImperativeHandle,
} from "react";
import { useQuery } from "@apollo/client";
import { Obj } from "../common";
import { WatchQueryFetchPolicy } from "@apollo/client";
import { DocumentNode } from "graphql";
import { gqlCommonProps, complete, gqlRender } from ".";

interface QueryProps extends gqlCommonProps {
  query: DocumentNode;
  variables: Obj;
  fetchPolicy?: WatchQueryFetchPolicy;
}

const Query: React.FC<QueryProps & RefAttributes<any>> = forwardRef(
  (
    {
      query,
      variables,
      fetchPolicy = "network-only",
      showLoading,
      // showLoading = true,
      showSuccess = false,
      showFailure = true,
      successMsg,
      failMsg,
      onComplete,
      onSuccessClose,
      onErrorClose,
      modalTitle,
      children,
    }: QueryProps,
    ref
  ) => {
    const {
      data: queryData,
      error: queryError,
      loading,
      refetch: queryRefetch,
    } = useQuery(query, {
      variables: { ...variables, showLoading },
      fetchPolicy,
    });

    const [responseData, setResponseData] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState(undefined);

    const [openModal, setOpenModal] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [modalBody, setModalBody] = useState(undefined);

    useEffect(() => {
      if (!loading) {
        getResponse(queryData, queryError);
      }
    }, [loading, queryData, queryError]);

    //Expose refetch handle to parent component
    useImperativeHandle(ref, () => ({
      refetch() {
        runRefetch();
      },
    }));

    //refetch function
    const runRefetch = () => {
      setResponseData(undefined);
      setModalBody(undefined);
      setOpenModal(false);
      queryRefetch();
    };

    //Get response function
    const getResponse = (data: any, error: any) => {
      let res = undefined;
      let err = undefined;
      // console.log(data,error)
      if (error) {
        err = error.message;
      } else if (data) {
        const queryName = Object.keys(data)[0];
        if (queryName) {
          const { code, success, result } = data[queryName];

          if (code === "200" && success && result) {
            console.log(data)
            res = result;
          } else {
            err = result?.responseDescription;
          }
        }
      }

      //Trigger complete function
      complete({
        res,
        err,
        onComplete,
        showSuccess,
        showFailure,
        successMsg,
        failMsg,
        setResponseData,
        setErrorMessage,
        setOpenModal,
        setIsSuccess,
        setModalBody,
      });
    };

    //Trigger render function
    return gqlRender({
      openModal,
      setOpenModal,
      modalBody,
      isSuccess,
      onSuccessClose,
      onErrorClose,
      loading,
      responseData,
      errorMessage,
      modalTitle,
      children,
    });
  }
);

export default Query;