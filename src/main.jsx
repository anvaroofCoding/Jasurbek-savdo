import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css'
import Firmalar from './pages/firma'
import Ishlar from './pages/ishlar'
import Optom from './pages/optom'
import Royxat from './pages/royxat'
import Xalq from './pages/xalq'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ path: '/xalq', element: <Xalq /> },
			{ path: '/optom', element: <Optom /> },
			{ path: '/firmalar', element: <Firmalar /> },
			{ path: '/royxat', element: <Royxat /> },
			{ path: '/ishlar', element: <Ishlar /> },
		],
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
