var spawn = require('child_process').spawn,
input,
fs = require('fs');

var arguments = process.argv.splice(2);
console.log(arguments[0])

var rgb = spawn('convert', [arguments[0], 'rgb:-']);

rgb.stdout.on('data', function(data) {
	input = new Buffer(data);
})

rgb.on('exit', function(code) {
	
	var css = fs.createWriteStream('./style.css');
	var jade = fs.createWriteStream('./index.jade')
	
	jade.write('.droplit')
	css.write('.droplit{\ndisplay:-webkit-box;\n-webkit-box-orient:vertical;\n}\n')
	css.write('.row{\ndisplay:-webkit-box;\n-webkit-box-orient:horizontal;}\n')
	css.write('.pixel{\nheight:1px;\nwidth:1px;\ndisplay:-webkit-box;}')
	
  for (var i=0; i < input.length; i+=3) {
	  if(i%75){
		jade.write('\n    .pixel._' + i)
		css.write('\n._' + i + '{background : rgb(' + input[i]+','+input[i+1]+','+input[i+2] + ');}')
			//console.log(input[i],input[i+1],input[i+2])
	  
	}else{
		jade.write('\n  .row')
		jade.write('\n    .pixel._' + i)
		css.write('\n._' + i + '{background : rgb(' + input[i]+','+input[i+1]+','+input[i+2] + ');}')
		
	}
  };
})