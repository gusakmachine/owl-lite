class Cargo extends Frames {
    setState(state) {
        this.state = state;
    }

    start() {
        console.log('is_start');
        //...
    }

    update() {
        //BAG
        //static data, but updated constantly
        this.state.update('translate', {
            x: 100, y: 0, z: 0,
        });
        console.log('is_update');
        //...
    }

    end() {
        console.log('is_end');
        //...
    }
}
