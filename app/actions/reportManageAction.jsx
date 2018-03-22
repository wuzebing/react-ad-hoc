export const  BACK_REPORT_MANAGE = "backReportManage";
export const SET_REPORT_MANAGE_PARAMS = " setReportManageParams";

export const SET_BACK_URL = "setBackUrl";

export const setBackUrl = (text) => {
	return (dispatch, getState) => {
		dispatch({
			type: SET_BACK_URL,
			text
		})
	}
}

export const setReportManageParams = (text) => {
	return (dispatch, getState) => {
		dispatch({
			type: SET_REPORT_MANAGE_PARAMS,
			text
		})
	}
}

export const backReportManage = (text) => {
	return (dispatch, getState) => {
		dispatch({
			type: BACK_REPORT_MANAGE,
			text
		})
	}
}