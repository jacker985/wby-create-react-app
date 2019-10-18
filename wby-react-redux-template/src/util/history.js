import createHistory from 'history/createBrowserHistory';
import qs from "qs";
const history = createHistory();
function addQuery(history) {
	const location = history.location;
	history.location = { ...location, query: qs.parse(location.search, { ignoreQueryPrefix: true }) };
}

addQuery(history);

export const unlisten = history.listen(() => {
	// 每次页面跳转都会执行
	addQuery(history);
});
export default history;
