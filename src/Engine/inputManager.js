const inputManager = {
    update: function() {
        let i;
        for(i = 8; i < 222; i++){
            if(!this.keys[i].isDown)
                continue;

            if(this.keys[i].isDown === this.keys[i].prevIsDown){
                this.keys[i].isPressed = true;
            } else {
                this.keys[i].isPressed = false;
            }

            this.keys[i].prevIsDown = this.keys[i].isDown;
        }

    },
    init: function() {
        this.keys = {};
        for (let i = 8; i < 222; i++){
            this.keys[i] = {
                isDown: false,
                isPressed: false
            };
        }

        window.addEventListener('keydown', (event) => {
            try {
                this.keys[event.which].isDown = true;
            } catch(e) {}
        });

        window.addEventListener('keyup', (event) => {
            try { 
                this.keys[event.which].isDown = false;
                this.keys[event.which].prevIsDown = false;
                this.keys[event.which].isPressed = false;
            } catch(e) {}
        });
    }
};

module.exports = inputManager;
