import Loadable from 'react-loadable';
import Loading from '../Loading'

const lazyLoadComponent = (importComponent) => {
	return Loadable({
		loader: importComponent,
		loading: Loading,
		delay: 300,
		timeout: 10000,
	});
}
export default lazyLoadComponent
