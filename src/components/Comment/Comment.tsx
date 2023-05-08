export default function Comment({ index, className }: { index: any; className: any; }) {

	const commentId = `\u0020${index?.id}`;
	const commentName = `\u0020${index?.name}`;
	const commentEmail = `\u0020${index?.email}`;
	const commentBody = `\u0020${index?.body}`;

	return (
		<div className={`${className}`}>
			<b>id:</b>{commentId}<br/>
			<b>name:</b>{commentName}<br/>
			<b>email:</b>{commentEmail}<br/>
			<b>comment:</b>{commentBody}
		</div>
	);
};
