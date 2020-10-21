import { useEffect, useState } from "react";

// when we provide one JSX inside another JSX,
// inner element provided to outer element is called children.
const Route = ({ path, children }) => {
	const [currentPath, setCurrentPath] = useState(window.location.pathname);

	useEffect(() => {
		const onLocationChange = () => {
			setCurrentPath(window.location.pathname);
		};

		window.addEventListener("popstate", onLocationChange);

		return () => {
			window.removeEventListener("popstate", onLocationChange);
		};
	}, []);

	return currentPath === path ? children : null;
};

export default Route;
