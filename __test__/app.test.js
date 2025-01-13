const axios = require('axios');
const url = "http://localhost:3000/"
describe("Endpoint", () => {
    it("Should Exists", async () => {
        const response = await axios.get(url)
        expect(response.status).toBe(200)
    })
})

describe("Database", () => {
    it.todo("Should 0 bars")
    it.todo("Should One Bar")
    it.todo("Should 5 bars")
    it.todo("Should 0 bars")
})