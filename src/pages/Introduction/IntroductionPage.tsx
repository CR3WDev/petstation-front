import bgImg from '@/assets/introduction2.png';

export const IntroductionPage = () => {
	return (
		<div style={{ height: 'calc(100vh - 60px)', overflow: 'auto' }}>
			<div
				className="flex justify-content-evenly align-items-center"
				style={{ height: 'calc(100vh - 60px)' }}
			>
				<img src={bgImg} height={'400px'}></img>

				<div
					className="flex flex-column justify-content-center align-items-center"
					style={{ width: '500px' }}
				>
					<div>
						<h1 className="title">
							Easily Manage the Animals in Your Adoption Center
						</h1>
					</div>
					<div>
						<p>
							Our app is the ideal solution for managing the animals in your
							adoption center. With an intuitive interface, you can track each
							animal's history, optimizing care and facilitating the adoption
							process. Ensure every animal receives the necessary care until
							they find a loving home.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
