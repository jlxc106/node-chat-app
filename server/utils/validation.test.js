const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', ()=>{
     it('should reject non-string values', ()=>{
         var name = 123;
         var room = false;
         var isName = isRealString(name);
         var isRoom = isRealString(room);
         expect(isName).toBe(false);
         expect(isRoom).toBe(false);
     })

     it('should reject string with only spaces', ()=>{
        var name = '         ';
        var room = '     ';
        var isName = isRealString(name);
        var isRoom = isRealString(room);
        expect(isName).toBe(false);
        expect(isRoom).toBe(false);
     })

     it('should allow string with non-space characters', ()=>{
        var name = 'e         z';
        var room = 'c l a p';
        var isName = isRealString(name);
        var isRoom = isRealString(room);
        expect(isName).toBe(true);
        expect(isRoom).toBe(true);
     })


})

