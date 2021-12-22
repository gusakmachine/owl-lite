class VariableStaticHistory {
    start = null;
    older = null;
    old = null;
    current = null;
    update = this.initialize;

    setOlder(value) {
        this.older = value;
    }

    setOld(value) {
        this.setOlder(this.old);
        this.old = value;
    }

    setCurrent(value) {
        this.setOld(this.current);
        return this.current = value;
    }

    initialize(value) {
        this.start = value;
        this.older = value;
        this.old = value;
        this.current = value;
        this.update = this.setCurrent;
    }
}