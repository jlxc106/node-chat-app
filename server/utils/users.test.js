const expect = require('expect');

const {Users} = require('./users');


describe('Users', ()=>{

    var SeedUsersData;

    beforeEach(()=>{
        SeedUsersData = new Users();
        SeedUsersData.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node course'
        },{
            id: '2',
            name: 'Jen',
            room: 'Node course'
        },{
            id: '3',
            name: 'Ike',
            room: 'React course'
        }
    ]})

    it('should add new user', ()=>{
        var users = new Users();
        user = {
            id: '123',
            name: 'Andrew',
            room: "my room"
        }
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    })

    if('should remove a user', ()=>{
        var userId = '1';
        var user = SeedUsersData.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(SeedUsersData.users.length).toBe(2);
    })

    if('should not remove a user', ()=>{
        var userId = '88';
        var user = SeedUsersData.removeUser(userId);

        expect(user).toNotExist();
        expect(SeedUsersData.users.length).toBe(3);

    })

    it('should find user', ()=>{
        var userId = '2';
        var user = SeedUsersData.getUser(userId);

        expect(user.id).toBe(userId);
    })

    if('should not find user', ()=>{
        var userId = '4';
        var user = SeedUsersData.getUser(userId);
        
        expect(user.id).toNotExist();
    })

    it('should return names for node course', ()=>{
        var userList = SeedUsersData.getUserList('Node course');
        expect(userList).toEqual(['Mike', 'Jen']);
    })

    it('should return names for React course', ()=>{
        var userList = SeedUsersData.getUserList('React course');
        expect(userList).toEqual(['Ike']);
    })
})