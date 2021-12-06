class OwlCargoWait extends Cargo {
    setState(state) {
        this.state = state;
    }

    update() {
        //BAG
        console.log(`translateX: ${this.state.translateX}, progress: ${this.progress.current}`);
    }
}