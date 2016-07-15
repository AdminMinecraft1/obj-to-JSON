<h1>OBJ to JSON Exporter</h1>

<h4>First question "Man WhaT A... Why i need this?"</h4>
    <h4>My answer you don't. But. If you want make you life EASY you could try!</h4>

<h2>So whats next?</h2>

If you like WebGL, your way as developer to faces with 3D models;

So -> you need some model, in -> some file format;

Blender,3DSMax ... this only start of all list);

One of popular and easy 3D models format is "*".obj,
 you can export to this format your model or find already done model in this format.

So you have model, you may say :

<h4>" How this help me. How I can use data from, browser doesn't know anything about "*".obj"</h4>

<h5>My answer you can, you can export this from "*".obj to JSON</h5>

<h4> You say : "Ohhh this need some additional tools or some around stuff, need new knowledge ..."</h4>
<h4> I say -> You know JS?! and this enough</h4>

You need : 
          ->vertices , 
          ->vertices normals, 
          ->textures coords and so on ...

<h3>Easy</h3>

<h2>How to use :</h2>

I think you have node and npm, if no -> not problem :
    Nodejs.Go to <a href ="http://nodejs.org/">node js</a> and install it(node include npm);
    (node this is powerful tool if you don't use it till this moment try you will enjoy)

open terminal :
  
        
            npm install git://github.com/sfiluyk/obj-to-JSON.git
      
 

<h3>How export</h3>
 Add to .js file :

      
            var obj_to_JSON = reqiure('obj-to-JSON');
            var src = 'link to you .obj file'

            obj_to_JSON.export(src);
       


<h3>One of way run this .js </h3>  
Write in terminal :
          
               node (your .js file name)
         


<h3>Thats all -> now you have in your src folder new objName.json file , use it and enjoy</h3>
