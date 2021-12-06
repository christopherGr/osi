import {useState, useEffect} from 'react';
import Section from './Section.js';
const {ipcRenderer} = window.require('electron');

function Main() {	
	
	const [components, setComponents] = useState();
	
	useEffect(async ()=>{
		const result = await ipcRenderer.invoke("require");
		const array = [];
		for(var name in result){
			array.push({name:name, content:result[name]});
		}
		setComponents(array);
	}, [])
	
	return(
		<div style={style}>
			{
				components && components.map(component =>{
					return <Section key={component.name} {...component}/>
				})
			}
		</div>
	)
}

const style = {
	display:'flex',
	flexDirection:'column',
	justifyContent:'space-around',
	flexGrow : '1',
}

export default Main;
