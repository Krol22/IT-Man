function GSM() {}

GSM.prototype.update = delta => {
  this.currentState.update(delta);
}

GSM.prototype.changeState = async newState => {
  await newState.init();
  this.currentState = newState;
}

module.exports = GSM;
