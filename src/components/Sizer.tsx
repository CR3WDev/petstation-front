// import { setIsMobile } from '@redux/Reducers/isMobileReducer';
// import { useResizeListener } from 'primereact/hooks';
// import { ReactElement, useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';

// type SizerProps = {
// 	/** Todo o código que deseja ter a variavel isMobile */
// 	children: ReactElement;
// };
// export const Sizer = ({ children }: SizerProps) => {
// 	const dispatch = useDispatch();
// 	const [currentWidth, setCurrentWidth] = useState(0);
// 	const [bindWindowResizeListener, unbindWindowResizeListener] =
// 		useResizeListener({
// 			listener: (event: any) => {
// 				setCurrentWidth(event?.currentTarget?.innerWidth);
// 			},
// 		});

// 	useEffect(() => {
// 		setCurrentWidth(window.innerWidth);
// 	}, []);

// 	useEffect(() => {
// 		bindWindowResizeListener();

// 		return () => {
// 			unbindWindowResizeListener();
// 		};
// 	}, [bindWindowResizeListener, unbindWindowResizeListener]);

// 	useEffect(() => {
// 		if (currentWidth <= 992) {
// 			dispatch(setIsMobile(true));
// 		} else {
// 			dispatch(setIsMobile(false));
// 		}
// 	}, [currentWidth]);

// 	return children;
// };
