const expect = require('chai').expect;

describe('Rock, Paper, Scissor Game', () => {
  it('should create a round', () => {
    browser.url('http://localhost:3000/');
    browser.waitForText('.RoundComponent-footer');    

    /* Create round */
    browser.click('#playRound');    
    browser.waitForText('.resultClass');    

    /* Assert one round*/
    let rounds = browser.getText('.resultClass')    
    expect(rounds).not.to.equal(undefined)

  });

  it('should reset rounds', () => {
    browser.url('http://localhost:3000/');
    browser.waitForText('.RoundComponent-footer');    

    /* Create Round */
    browser.click('#playRound');    
    browser.waitForText('.resultClass');    

    /* Reset Game */
    browser.click('#resetGame');        

    /* Assert no-rounds*/
    let existing = browser.elements('.resultClass').isExisting()
    expect(existing).to.equal(false)

  });
});