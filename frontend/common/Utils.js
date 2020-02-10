function processDataUsers(users){
    return users.map(user=>(({id, name, email, ...rest})=>({id, name, firstName: name.split(" ")[0], lastName: name.split(" ")[1], email, ...rest}))(user));
}

export {processDataUsers};