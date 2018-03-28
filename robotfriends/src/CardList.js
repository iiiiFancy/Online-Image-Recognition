import React from 'react';
import Card from './Card';

const CardList = ({ robots }) => {
	// const cardArray = robots.map((user, i) => { // user是每个元素，i是loop的序号
	// 	return 
	// 	<Card 
	// 	key = {user.id} 
	// 	id={user.id} 
	// 	name={robots[i].name} 
	// 	email={robots[i].email}
	// 	/>
	// })

	// return (
	// 	<div>
	// 		{cardArray}
	// 	</div>
	// );

	return (
		<div>
			{
				robots.map((user, i) => { // user是每个元素，i是loop的序号
					return (
						<Card 
							key = {user.id} 
							id={user.id} 
							name={robots[i].name} 
							email={robots[i].email}
						/>
					)				
				})
			}
		</div>
	);
}

export default CardList;