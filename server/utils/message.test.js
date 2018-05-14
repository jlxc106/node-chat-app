var expect = require("expect");

var { generateMessage } = require("./message");

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
