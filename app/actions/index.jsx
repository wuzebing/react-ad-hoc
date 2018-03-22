/*
 * @version 1.0.0
 * action 类型
 */
export const ADD_USER = 'addUser';
export const REMOVE_USER = 'removeUser';
export const SEARCH = 'search';

export const DO_ADD_REPORT_DETAIL = "doAddReportDetail" ;

//申请发布
export const ADD_REPORT_DETAIL = 'addReportDetail';

export const doAddReportDetail = (obj) => {
    return (dispatch, getState) => {
        dispatch({
            type: DO_ADD_REPORT_DETAIL,
            obj,
        });
    };
};

/*
 * action 创建函数
 * @method  addTodo添加新事项
 * @param  {String} text 添加事inde项的内容
 */
export const addUser = (text) => {
    return (dispatch, getState) => {
        dispatch({
            type: ADD_USER,
            text,
        });
    };
};

export const removeUser = (index) =>{
    return (dispatch, getState) => {
        dispatch({
            type: REMOVE_USER,
            index,
        });
    };
}

export const addReportDetail = (text) => {
    return (dispatch, getState) => {
        dispatch({
            type: ADD_REPORT_DETAIL,
            text
        })
    }
}

/*
 * @method  search 查找事项
 * @param  {String} text 查找事项的内容
 */

export function search(text) {
    return {
        type: SEARCH,
        text,
    };
}

