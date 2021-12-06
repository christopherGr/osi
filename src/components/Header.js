import img from '../imgs/save.png';
import {useState, useEffect}  from 'react';
const { ipcRenderer } = window.require('electron');

function Header() {
	const [username, setUsername] = useState();	
	
	useEffect(async()=>{
		const result = await ipcRenderer.invoke('require', 'user-info');
		setUsername(result.username);
	}, [])
	
	const [date, setDate] = useState(function(){return getDate()});
		
	function getDate(){
		const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		const day = new Date().getDay();
		const hours = new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours();
		const minutes = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes();
		const seconds = new Date().getSeconds() < 10 ? `0${new Date().getSeconds()}` : new Date().getSeconds();
		return `${week[day]}, ${hours}:${minutes}:${seconds}`;
	}
	
	const updateTime = setInterval(function(){
		setDate(getDate());
	}, 1000);	
	
	return (
	<div style={style}>
		<div style={{margin:'auto'}}>Welcome 
			<div style={{fontWeight:'bold'}}>{username}</div>
		</div> 
		<div style={{fontStyle:'italic', margin:'auto'}}>{date}</div>
		<img onClick={onClick} style={imgStyle} src={img}></img>
	</div>
	);
}

function onClick(){
	ipcRenderer.send("writeFile");
}

const style = {
	display:'flex',
	flexWrap:'wrap',
	textAlign:'center',
	gap:'1em',
	justifyContent: 'space-around',
	color: 'var(--color2)',
	backgroundColor: 'var(--color1)',
	textShadow: '1px 1px 5px black',
	boxShadow: '0px 2px 8px #323232',
	padding:'0.5em 0 0.5em 0'
}

const imgStyle={
	height:"3em",
	marginRight:"1em",
	cursor:"pointer"
}

export default Header;
