import { ToastContainer } from 'react-toastify';
import Router from "./routes/routes.js"
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/Auth/AuthProvider.js';

function App() {
	return (
		<div className='flex w-full min-h-screen bg-black'>
			<AuthProvider>
				<Router/>
				<ToastContainer />
			</AuthProvider>
		</div>
	);
}	

export default App;
