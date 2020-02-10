function processDataUsers(users){
    return users.map(user=>(({id, name, email})=>({id, name, firstName: name.split(" ")[0], lastName: name.split(" ")[1], email}))(user));
}

export {processDataUsers};