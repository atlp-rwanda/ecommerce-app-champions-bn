// eslint-disable-next-line import/prefer-default-export
export  const updateOrCreate = async (model,where,newItem) =>{
    const foundItem = await model.findOne({where});
    if(!foundItem){
        const item = await model.create(newItem);
        return {item,created:true};
    }

    const item = await model.update(newItem,{where});
    return {item,created:false};
};

// export { updateOrCreate };