module.exports =(element,template)=>{
    let output = template.replace(/{%PRODUCTNAME%}/g,element.productName);
    output = output.replace(/{%PRODUCTIMAGE%}/g,element.image);
    output = output.replace(/{%PRODUCTPRICE%}/g,element.price);
    output = output.replace(/{%PRODUCTORIGIN%}/g,element.from);
    output = output.replace(/{%PRODUCTQUANTITY%}/g,element.quantity);
    output = output.replace(/{%PRODUCTNUTRIENT%}/g,element.nutrients);
    output = output.replace(/{%PRODUCTDESCRIPTION%}/g,element.description);
    output = output.replace(/{%PRODUCTID%}/g,element.id);
    
    if(!element.organic){output = output.replace(/{%NOTORGANIC%}/g,"not-organic")};
    return output;
}