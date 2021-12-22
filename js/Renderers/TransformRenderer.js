class TransformRenderer {
    static formArg(value, type) {
        return value === 0? value : value + type;
    }

    static translate(el, {x=0,y=0,z=0, type='px'}) {
        let argX = TransformRenderer.formArg(x, type),
            argY = TransformRenderer.formArg(y, type),
            argZ = TransformRenderer.formArg(z, type);

        el.style.transform = (
            `translate3d(${argX}, ${argY}, ${argZ})`
        )
    }

    static translateX(el, x, type='px') {
        let argX = TransformRenderer.formArg(x, type);

        el.style.transform = (
            `translate3d(${argX}, 0, 0)`
        )
    }

    static translateY(el, y, type='px') {
        let argY = TransformRenderer.formArg(y, type);

        el.style.transform = (
            `translate3d(0, ${argY}, 0)`
        )
    }

    static translateZ(el, z, type='px') {
        let argZ = TransformRenderer.formArg(z, type);

        el.style.transform = (
            `translate3d(0, 0, ${argZ})`
        )
    }
}