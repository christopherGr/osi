function Content(props) {
	const content = getProps(props);	
	return(
		<div style={containerStyle}>
			{
				Object.keys(content).map(function(key){
					return <div style={style} key={key}>					
						<div style={labelStyle}>{key}: {content[key]}</div>						
					</div>
				})
			}
		</div>
	)
}

function getProps(props){	
	var obj={};
	switch(props.values.name.toLowerCase()){
		case 'cpu':			
			const threads = props.values.content.length;
			const model = props.values.content[0].model;
			const speed = `${props.values.content[0].speed}Hz`;
			obj = {threads, model, speed};
		break;
		case 'memory':
			const totalMem = `${(props.values.content[0]/1000000000).toFixed(1)}GB`;
			const freeMem = `${(props.values.content[1]/1000000000).toFixed(1)}GB`;
			obj = {totalMem, freeMem};
		break;
		case 'os':
			const type = props.values.content[0];
			const platform = props.values.content[1];
			const version = props.values.content[2];
			obj = {type, platform, version};
		break;
		case 'network':	
			const temp = props.values.content.Ethernet[3];
			obj = {...temp};
		break;
		case 'ontime':			
			const ontime = `${(props.values.content/3600).toFixed(0)} minutes`;
			obj = {ontime};
		break;
		default:
	}
	return obj;
}

const containerStyle={
	display:"flex",
	flexDirection:"column",
	justifyContent:"center",
	alignItems:"center",
}

const style={
	/*display:'none',*/
	display:'flex',
	justifyContent:"center",
	padding:"0.5em",	
	backgroundColor:"var(--color1)",
	borderRadius:"5px",
	width:"80%",
	marginTop:"0.5em",
	marginBottom:"0.5em",
	color:"white",
	textShadow:"1px 1px black",
}

const labelStyle={
	textTransform:"capitalize",
}

export default Content;
