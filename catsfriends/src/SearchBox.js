import React from 'react';

const SearchBox = ({searchField, searchChange}) => {
	return (
		<div className = 'pa2'>
			<input 
				className = 'pa3 ba b--green bg-lightest-blue'
				type = 'search' 
				placeholder = 'search cats'
				onChange = {searchChange} // 持续监听并返回给prop searchChange
			/>
			<p> Search Box </p>
		</div>
	);
}

export default SearchBox;