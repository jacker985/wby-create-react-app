

import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'
import { createAction } from 'redux-actions';

export const {
	getAuthorizations,
	getAuthorizations_success
} = createHttpAction('getAuthorizations', Interface.auth.getAuthorizations, {
	method: 'get',
	isHttp: true,
	ignoreToast: true,
	ignoreLoading: true,
});

export const resetSiderAuth = createAction('RESET_SIDERMENU_AUTH', () => {
	return [];
})
