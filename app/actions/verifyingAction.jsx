export const SET_VERIFYING_PARAMS = "setVerifyingParams";

export const setVerifyingParams = (text) => {
	return (dispatch, getState) => {
		dispatch({
			type: SET_VERIFYING_PARAMS,
			text
		})
	}
}
