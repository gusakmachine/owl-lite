class FrameEngine {
    id = null;

    setId(id) {
        return this.id = id;
    }

    next(callback) {
        this.setId(
            requestAnimationFrame(callback)
        );
    }

    cancel() {
        cancelAnimationFrame(this.id);
    }
}