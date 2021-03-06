const MiniMeTokenFactory = artifacts.require("MiniMeTokenFactory.sol")
const MiniMeToken = artifacts.require("MiniMeToken.sol")
const BeeFaucet = artifacts.require("BeeFaucet.sol")
const JwtFormatter = require("../../utils/JwtFormatter.js")
const TestUtils = require("../TestUtils.js")

contract("BeeFaucet", accounts => {

    let miniMeTokenFactory, beeFaucet, beeToken;
    const kycProviderPublicAddress = "0xdb2e8d0b7525dd9ce4ad87c38072c26850215aee"

    beforeEach(async () => {
        miniMeTokenFactory = await MiniMeTokenFactory.new();
        beeFaucet = await BeeFaucet.new(miniMeTokenFactory.address, kycProviderPublicAddress)
        const beeTokenAddress = await beeFaucet.getBeeTokenAddress()
        beeToken = MiniMeToken.at(beeTokenAddress)
    })

    describe("BeeFaucet() constructor", () => {

        it("creates a new MiniMeToken representing BEE", async () => {
            assert.equal(await beeToken.totalSupply(), 0, "Total supply is not 0")
            assert.equal(await beeToken.name(), "Bee", "Name is not Bee")
            assert.equal(await beeToken.decimals(), 18, "Decimals is not 18")
            assert.equal(await beeToken.symbol(), "BEE", "Symbol is not BEE")
        })
    })

    describe("claimBee(address receiverAddress, string jwtMessage, uint8 signatureV, bytes32 signatureR, bytes32 signatureS)", () => {

        const receiverAccount = accounts[1]

        it("sends one BEE to receiverAddress if attestation is valid", async () => {
            const jwtWithValidSignature = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJzdWIiOiIyb25qclJZeUZ1Um9Ya2RHalBaUXk4UjZoWGFGeE4yMmFEeCIsImNsYWltIjp7IlVuaXF1ZW5lc3MiOiJJcyB1bmlxdWUifSwiZXhwIjoxNTA4ODY3MDc5NTcwLCJpc3MiOiIyb2hhMVZyVkNhelhwTFRvY1ZSSG9mVVg1dVJEbXZQVWs0QiIsImlhdCI6MTUwNjI3NTA3OTU3MH0.j27nrUtF76OYoEcx2I5tJl1P8LCJj8hpI22Ca1kx7n_hI9K4BgbQyPbEG7tuCEdsGPukPvsUML2s-MSiRrZnfg"
            const formattedJwt = JwtFormatter.format(jwtWithValidSignature)
            await beeFaucet.claimBee(formattedJwt.sha256jwtMessagePart, 27, formattedJwt.jwtSigRHex, formattedJwt.jwtSigSHex, {from: receiverAccount})
            const receiverBalance = await beeToken.balanceOf(receiverAccount)

            assert.equal(receiverBalance, 1, "Receiver's balance should be 1")
        })

        it("doesn't send BEE to receiverAddress if attestation is invalid", async () => {
            const jwtWithInvalidSignature = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJzdWIiOiIyb25qclJZeUZ1Um9Ya2RHalBaUXk4UjZoWGFGeE4yMmFEeCIsImNsYWltIjp7IlVuaXF1ZW5lc3MiOiJJcyB1bmlxdWUifSwiZXhwIjoxNTA4ODY3MDc5NTcwLCJpc3MiOiIyb2hhMVZyVkNhelhwTFRvY1ZSSG9mVVg1dVJEbXZQVWs0QiIsImlhdCI6MTUwNjI3NTA3OTU3MH0.j27nrUtF76OYoEcx2I5tJl1P8LCJj8hpI22Ca1kx70_hI9K4BgbQyPbEG7tuCEdsGPukPvsUML2s-MSiRrZnfg"
            const formattedJwt = JwtFormatter.format(jwtWithInvalidSignature)
            const maxGasUsed = 2000000;

            await TestUtils.assertThrows(() => beeFaucet.claimBee(formattedJwt.sha256jwtMessagePart, 27, formattedJwt.jwtSigRHex, formattedJwt.jwtSigSHex,
                {from: receiverAccount, gas: maxGasUsed}), maxGasUsed)
        })
    })
})