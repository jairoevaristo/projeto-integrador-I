import { ToastContainer } from 'react-toastify';
import Router from "./routes"

import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/Auth/AuthProvider.js';
import { SessionProvider } from './context/Session/SessionProvider.js';
import { TeamProvider } from './context/Team/TeamProvider.js';

function App() {
	return (
		<div className='flex w-full min-h-screen bg-black'>
			<AuthProvider>
				<TeamProvider>
					<SessionProvider>
						<Router/>
						<ToastContainer/>
					</SessionProvider>
				</TeamProvider>
			</AuthProvider>
		</div>
	);
}	

export default App;
