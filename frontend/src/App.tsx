import { ToastContainer } from 'react-toastify';
import Router from "./routes/routes.js"
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/Auth/AuthProvider.js';
import { SessionProvider } from './context/Session/SessionProvider.js';

function App() {
	return (
		<div className='flex w-full min-h-screen bg-black'>
			<AuthProvider>
				<SessionProvider>
					<Router/>
					<ToastContainer />
				</SessionProvider>
			</AuthProvider>
		</div>
	);
}	

export default App;
