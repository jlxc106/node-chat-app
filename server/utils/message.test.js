var expect = require("expect");

var { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
	it("should generate the correct message object", () => {
		var from = "jay";
		var text = "test me";
		var message = generateMessage(from, text);
		expect(message.from).toBe("jay");
		expect(message.text).toBe("test me");
		expect(message.createdAt).toBeA("number");
	});
});

describe("generateLocationMessage", ()=>{
    it('should generate the correct location object', ()=>{
        var from = 'me';
        var latitude = 123;
        var longitude = 456;
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`
        // var location = {latitude, longitude};
        var locationMessage = generateLocationMessage(from, latitude, longitude);
        expect(locationMessage).toInclude({from, url});
		expect(locationMessage.createdAt).toBeA("number");
    })
})