[{
    id:'abcdefg',
    name: 'Andrew',
    room: 'The Office Fans'
}]


//addUser(id, name, room);
//removeUser(id);
//getUser(id);
//getUserList(room)


class Users{
    constructor(){
        this.users = [];
    }

    addUser(id, name, room){
        // console.log('addUser: ', name)
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
        //console.log('removeUser: ', id)
        var user =  this.getUser(id);

        if(user){
            this.users = this.users.filter((user)=> user.id !== id);
        }
        return user;
    }

    getUser(id){
        return this.users.filter((user) => user.id === id)[0]
    }

    getUserList(room){
        //console.log('getUserList: ', this.users)
        var users = this.users.filter((user)=>{
            return user.room === room;
        })
        var namesArray = users.map((user)=>{
            return user.name
        })

        return namesArray;
    }
}

module.exports = {Users};