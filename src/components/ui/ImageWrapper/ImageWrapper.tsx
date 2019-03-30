import classnames from 'classnames';
import * as React from 'react';

import placeholderImage from '@assets/images/svg/placeholder.svg';

import './style.less';

const Img = ({ src, alt, className, ...props }: { src: any; alt: any; className?: string }) => {
	return (
		<img
			className={classnames(className ? className : '')}
			src={src}
			alt={alt}
			onError={(event: any) => {
				event.target.onerror = undefined;
				event.target.src = placeholderImage;
			}}
			{...props}
		/>
	);
};

export interface ImageWrapperProps {
	alt?: string;
	className?: string;
	src?: string;
	render: boolean;
}

const ImageWrapper = (props: ImageWrapperProps) =>
	props.render ? (
		<section className={classnames('Image__Container', props.className ? props.className : '')}>
			<React.Suspense
				fallback={
					<section className="Image__Container">
						<img className="Image__Placeholder" src={placeholderImage} alt={props.alt} />
					</section>
				}
			>
				<section className="Image__Container">
					<Img alt={props.alt} className={props.className} src={props.src} />
				</section>
			</React.Suspense>
		</section>
	) : (
		<section />
	);

export default ImageWrapper;
