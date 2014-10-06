var fs = require('fs');
var src = './../../../client/models/Vehicles/1/ARC170.obj';

var objToJSON = function(src){

	var model = {
		v:[],
		vt:[],
		vn:[],
		f:[],
                vertices:[]
	};

	var format = function(array,reg){

		array.map(function(v0,i0){
			array[i0] = v0.match(reg);
		});

		return array;
	}

	var add = function(string,name,model){
		var reg = new RegExp(name+'\\s.*\\r\\n','g');
		var array = string.match(reg);
		if(array !== null)
		{		
			model[name] = model[name]
								.concat(format(
										array,
										new RegExp('[^'+name+'\\s*]+[\\w\/][^\\s]*','g')
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
        
        model.v.map(function(v0,i0){
            v0.map(function(v1,i1){
                if(v1.length){
                    model.vertices.push(parseFloat(v1));
                }
            })
        });
        
        var path = src.match(new RegExp('\/[^\/]*$','g'))[0];
        var name =  path.replace('/','').match(new RegExp('[^\.]\\w*'))[0];
        var type = path.replace('/','').match(new RegExp('[^\.]\\w*$','g'))[0];
        

	stream.on('end',function(){
		fs.writeFile(src.replace(path,'')+'/'+name+'.json',JSON.stringify(model),function(){

		})
	})

}

objToJSON(src);