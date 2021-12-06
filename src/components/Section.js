import {useState, useEffect} from 'react';
import Content from './Content.js' ;

function Section({name, content}) {	
	const [clicked, handleClick] = useState(false);
	const [elems, handleElems] = useState([]);
	
	const onClick = () =>{
		handleClick(function(){
			return !clicked;
		});
	}
	
	useEffect(()=>{
		handleElems(function(array){
			if(!clicked) return;
			return [{name, content}];
		})
	}, [clicked])	
	
	return(	
		<div>
			<div onClick={onClick} style={style} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>{name}</div>
			{
				elems && elems.map(function(el){	
					return <Content key={name} values={{name, content}}/>
				})
			}
		</div>
	)
}

function onMouseOver(e){
	e.currentTarget.style.filter = "brightness(120%)";
}

function onMouseOut(e){
	e.currentTarget.style.filter = "brightness(100%)";
}

const style={
	textAlign:'center',
	backgroundColor:'var(--color2)',
	padding:'1em 0 1em 0',
	margin:'1em',
	borderRadius:'5px',
	boxShadow:'1px 1px 2px #323232, -1px -1px 2px #323232',
	textTransform:'uppercase',
	cursor:'pointer',
	transition:'filter 0.3s ease-in',
}

export default Section;
