import ImgLogo from '@/assets/dog.png';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { useNavigate } from 'react-router-dom';
export const Topbar = () => {
	const navigate = useNavigate();
	return (
		<div
			className="bg-primary flex justify-content-between p-3"
			style={{ height: '60px' }}
		>
			<div className="flex align-items-center">
				<div
					className="mr-6 flex cursor-pointer"
					onClick={() => {
						navigate('/');
					}}
				>
					<div>
						<Image src={ImgLogo} height="30px" width="30px"></Image>
					</div>
					<h2 className="p-0 m-0 ml-2">PetStation</h2>
				</div>
				<div className="flex">
					<Button
						text
						label="Animals"
						className="text-white"
						onClick={() => {
							navigate('/animals');
						}}
					/>
					<Button
						text
						label="Category"
						onClick={() => {
							navigate('/categories');
						}}
						className="text-white"
					/>
				</div>
			</div>
		</div>
	);
};
