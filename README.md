<h1>OBJ to JSON Exporter</h1>

<h4>First question "Man WhaT A... Why i need this?"</h4>
    <h4>My answer you don't. But. If you want make you life EASE you could try!</h4>

<h2>So whats next?</h2>

You like webGL or don't) your developer way faces with 3D models, 
    so -> you need some model in -> some file format;
    Blender,3dsMax ... this only start);
    One of popular and easy 3D model format is .obj you can export to this format model or find already done model.

    So you have model, but how you say :
        <h4>" How this help me How I can use data from, browser doesn't know anything about .obj"</h4>,

        My answer you can, you can export this .obj to JSON;
            <h4> You say : "Ohhh this need some additional tools or around stuff need new knowledges ..."</h4>
            <h4> I say -> You know JS and this enough</h4>

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
  
        <pre>
            npm install git://github.com/sfiluyk/obj-to-JSON.git
        </pre>
 

How export :

 Add to .js file;

        <code>
            var obj_to_JSON = reqiure('obj-to-JSON');
            var src = 'link to you .obj file'

            obj_to_JSON(src);
        </code>


One of way run this .js like: 
    
Write in terminal :
            <pre>
               node (your .js file name)
            </pre>


    <h3>Thats all -> now you have in your src folder new objName.json file , use it and enjoy</h3>