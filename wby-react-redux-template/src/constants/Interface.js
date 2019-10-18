export default {
	sourceRulesUrl: {
		add: '/sourceRule/add',
		delete: '/rbac/deleteResourceRule',
		get: '/sourceRule/getSourceRules'
	},
	roleUrl: {
		add: '/rbac/addRoles',
		delete: '/rbac/deleteRoles',
		update: '/rbac/updateRoles',
		get: '/rbac/getRolesList'
	},
	roleRelationUrl: {
		update: '/rbac/updateUserRole',
		get: '/rbac/getUserRoleList'
	},
	auth: {
		getAuthorizations: 'rbac/getAuthorizations'
	}
}
