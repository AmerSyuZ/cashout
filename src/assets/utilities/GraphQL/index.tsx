import React, { Dispatch, SetStateAction, useRef } from "react";
import { Obj } from "../common";
import Query from "./Query";
import { t } from "i18next";
import Loading from "../../components/loading";

export { Query };

export const gqlDefaultErrMsg = "An error occurred";

// All type declaration that will be used inside Query / Mutation components
type result = any;
type error = string;
type children = (props: {
	result: result;
	error: error;
}) => React.ReactNode | void;
type onComplete = (result: result, error: error) => void;
type onSuccessClose = (result: result) => void;
type onErrorClose = (error: error) => void;
type setResponseData = Dispatch<SetStateAction<Obj>>;
type setErrorMessage = Dispatch<SetStateAction<string>>;
type setOpenModal = Dispatch<SetStateAction<boolean>>;
type setIsSuccess = Dispatch<SetStateAction<boolean>>;
type setModalBody = Dispatch<SetStateAction<string>>;

//common prop type declaration for Query / Mutation
export interface gqlCommonProps {
	showLoading?: boolean;
	showSuccess?: boolean;
	successMsg?: string;
	showFailure?: boolean;
	failMsg?: string;
	onComplete?: onComplete;
	onSuccessClose?: onSuccessClose;
	onErrorClose?: onErrorClose;
	modalTitle?: string;
	children?: children;
	mode?: string;
}

//For onComplete props type declaration
type completeFuncInputs = {
	res: result;
	err: error;
	onComplete: onComplete;
	showSuccess: boolean;
	showFailure: boolean;
	successMsg: string;
	failMsg: string;
	setResponseData: setResponseData;
	setErrorMessage: setErrorMessage;
	setOpenModal: setOpenModal;
	setIsSuccess: setIsSuccess;
	setModalBody: setModalBody;
	isRedirect?: boolean;
};

//Query / Mutation's render type declaration
type gqlRenderFuncInputs = {
	openModal: boolean;
	setOpenModal: setOpenModal;
	modalBody: string;
	isSuccess: boolean;
	onSuccessClose: onSuccessClose;
	onErrorClose: onErrorClose;
	loading: boolean;
	responseData: result;
	errorMessage: error;
	modalTitle: string;
	children: children;
};

// Function to handle modal close
const handleClose = (
	success: boolean,
	result: result,
	err: error,
	onSuccessClose?: onSuccessClose,
	onErrorClose?: onErrorClose,
) => {
	if (success && !!onSuccessClose) {
		onSuccessClose(result);
	}
	if (!success && !!onErrorClose) {
		onErrorClose(err);
	}
};

// On error, message handler
const getErrorMsg = (errorMessage: string = gqlDefaultErrMsg) => {
	// Example messages
	// -> GraphQL error: [sequenceNo: 2342342]: Error
	// -> Network error: Network error
	// -> something.com/something?some=thing (For Mutations)

	let message: string[] = errorMessage.split(":");

	if (errorMessage.includes("Network error")) {
		return undefined;
	}

	// try to change here and see whats going on...
	if (
		errorMessage.includes("sequenceNo") ||
		errorMessage.includes("requestId")
	) {
		if (import.meta.env.VITE_APP_SHOW_ERROR_SEQUENCENO === "true") {
			if (message.length > 1) message.splice(0, 1);
		} else {
			if (message.length > 1) message.splice(0, 3);
		}
		return message.join(":");
	} else {
		if (message.length > 1) message.splice(0, 1);
		return message.join(":");
	}
};

// Function executed after every query / mutation
export const complete = ({
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
	isRedirect = false,
}: completeFuncInputs) => {
	// console.log(res)
	// console.log(err)
	if (!res && !err) err = getErrorMsg(err);

	if (!!onComplete) onComplete(res, err);

	if (res) {
		setIsSuccess(true);
		setResponseData(res);

		if (showSuccess) {
			setOpenModal(true);
			setModalBody(successMsg || t("Modal.Success.Title"));
		} else {
			setModalBody(undefined);
		}
	} else {
		const errMsg = failMsg || getErrorMsg(err);

		setModalBody(errMsg);
		setErrorMessage(errMsg);
		setResponseData(undefined);
		setIsSuccess(false);

		if (showFailure && !isRedirect && !!errMsg) {
			setOpenModal(true);
		}
	}
};

// Function that render modal on query / mutation completion
export const gqlRender = ({
	openModal,
	setOpenModal,
	modalBody,
	isSuccess,
	onSuccessClose,
	onErrorClose,
	loading,
	responseData: result,
	errorMessage: error,
	modalTitle,
	children,
}: gqlRenderFuncInputs) => {
	return (
		<>
			{/* {console.log("loading val",loading)} */}
			<Loading isLoading={loading} />
			{openModal && (
				<p>test</p>
				// <ModalResult
				//   show
				//   setShow={setOpenModal}
				//   isSuccess={isSuccess}
				//   warningError={false}
				//   title={modalTitle}
				//   body={modalBody}
				//   onClose={() => {
				//     handleClose(isSuccess, result, error, onSuccessClose, onErrorClose);
				//     setOpenModal(false);
				//   }}
				//   onHide={() => {
				//     handleClose(isSuccess, result, error, onSuccessClose, onErrorClose);
				//     setOpenModal(false);
				//   }}
				//   onProceed={() =>
				//     handleClose(isSuccess, result, error, onSuccessClose, onErrorClose)
				//   }
				// />
			)}
			{!loading &&
				!!children &&
				(result || error) &&
				children({
					result,
					error,
				})}
		</>
	);
};
