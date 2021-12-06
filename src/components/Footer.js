function Footer() {	
	return (
		<div style={style}>
			<div>
				<div>By Christopher</div>
				<div>Farmakis</div>
			</div>
			
			<div style={rightContainer}>
				<a href="mailto:farmak@hotmail.com">E-mail</a>
				<a  href='https://www.linkedin.com/in/xristoforos-farmakis-85b9b5176/'>Linkedin</a>
				<a  href='https://github.com/christopherGr'>Github</a>
			</div>
			
		</div>
	);
}

const style = {		
	display:'flex',
	flexWrap:'wrap',
	textAlign:'center',
	gap:'1em',
	justifyContent: 'space-around',
	alignItems:'center',
	color: 'var(--color2)',
	backgroundColor: 'var(--color1)',
	textShadow: '1px 1px 5px black',
	boxShadow: '0px 2px 8px #323232',
	padding:'0.5em 0 0.5em 0',	
}

const rightContainer = {
	userSelect:'text',
	display:'flex',
	flexDirection:'column',
}

export default Footer;
