const imageValidate=(images)=>
{
    let imagesTable=[];
    if(Array.isArray(images))
    {
        imagesTable=images;
    }
    else
    {
        imagesTable.push(images);//if we assign directly,imagesTable will become a string
    }
    if(imagesTable.length>3)
        return {error:"Send only 3 images at once"}
    imagesTable.map((image)=>
    {
        if(image.size>5242880 )
        return {error:"Size too large(above 5 MB)"};
        const filetypes=/jpg|jpeg|png/
        const mimetype=filetypes.test(image.mimetype);
        if(!mimetype)
        return {error:"Incorrect file type(should be jpg,jpeg or png)"}
    })
    return null;
}
module.exports=imageValidate;
/*The test() method is a built-in method in JavaScript regular expressions that tests whether a string matches a pattern (in this case, the regular expression). If the string matches the pattern, the test() method returns true. Otherwise, it returns false.
The image.mimetype property contains the MIME type of the image file. In this case, we are checking if the MIME type corresponds to one of the allowed image formats (jpg, jpeg, or png). */