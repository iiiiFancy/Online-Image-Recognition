import React from 'react';

const Card = ({id, name, email}) => {
	return (
		<div className = 'tc bg-light-sliver dib br3 pa3 ma3 grow'>
			<img alt = 'robot' src = {`https://robohash.org//${id}vbnmkjfgdrwetyrf?set=set4`} />
			<div>
				<h2> {name} </h2>
				<p> {id}</p>
				<p> {email}</p>
			</div>
		</div>
	);
}

export default Card;