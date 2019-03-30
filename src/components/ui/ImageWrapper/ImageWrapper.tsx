import * as React from 'react';

import placeholderImage from '@assets/images/svg/placeholder.svg';

export interface ImageWrapperProps {
	alt?: string;
	className: string;
	src?: string;
	render: boolean;
}

const ImageWrapper = (props: ImageWrapperProps) =>
	props.render ? (
		<React.Suspense
			fallback={<img className={props.className} src={placeholderImage} alt={props.alt} />}
		>
			<Img alt={props.alt} className={props.className} src={props.src} />
		</React.Suspense>
	) : (
		<section />
	);

const Img = ({ src, alt, className }: { src: any; alt: any; className: string }) => {
	return (
		<img
			className={className}
			src={src}
			alt={alt}
			onError={(event: any) => {
				event.target.onerror = undefined;
				event.target.src = placeholderImage;
			}}
		/>
	);
};

export default ImageWrapper;
