var fs = require('fs');

var objToJSON = function(src){

	var model = {
		v:[],
		vt:[],
		vn:[],
		f:[]
	};

	var remove = function(array,regs){

		array.map(function(v0,i0){
			regs.map(function(v1,i1){
				array[i0] = array[i0].replace(v1,'');
			})
			array[i0] = array[i0].split(/\s/g);
		});

		return array;
	}

	var add = function(string,name,model){
		var reg = new RegExp(name+'\\s.*\\r\\n','g');
		var array = string.match(reg);
		if(array !== null)
		{		
			model[name] = model[name]
								.concat(remove(
										array,
										[
											new RegExp(name+'\\s','g'),
											/\r\n/g,
											/\s/
										]
									));
		}
	}

	var stream = fs.createReadStream(src);


	stream.on('data',function(line){
		line = line.toString();

		add(line,'v',model);
		add(line,'vt',model);
		add(line,'vn',model);
		add(line,'f',model);

	
	})

	stream.on('end',function(){
		fs.writeFile('./../../../3D Models/Vehicles/7/7.json',JSON.stringify(model),function(){

		})
	})

}

objToJSON('./../../../3D Models/Vehicles/7/ARC170.obj')