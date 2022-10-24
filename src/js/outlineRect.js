import "../styles/outline.css";

export default class {
    
    constructor(options) {
        this._options = options;
        this._resizeEventListener = addEventListener('resize', function () {
            this.updatePosition();
        }.bind(this));
        this._scrollEventListener = addEventListener('scroll', function () {
            if (this._suppressScrollEvent) return;
            this.updatePosition();
        }.bind(this));

        const container = document.createElement("div");
        const instance = this._instance = container;

        instance.classList.add("outline-rect");
        instance.classList.add("outline-rect-mask");

        options.container.appendChild(instance);

        this._padding = options.padding || 10;
    }

    updatePosition() {
        const targetBounds = this._target.getBoundingClientRect();
        const targetStyle = window.getComputedStyle(this._target);
        this._instance.style.left = this._unit(targetBounds.x - this._padding);
        this._instance.style.top = this._unit(window.scrollY + targetBounds.top - this._padding);
        this._instance.style.width = this._unit(targetBounds.width + this._padding * 2);
        this._instance.style.height = this._unit(targetBounds.height + this._padding * 2);
        this._instance.style.borderRadius = targetStyle.getPropertyValue("border-radius");
    }

    setTarget(target) {
        this._target = target;
        this.updatePosition();
    }

    _unit(value) {
        return value + "px";
    }

    destoy() {
        removeEventListener('resize', this._resizeEventListener);
        removeEventListener('resize', this._scrollEventListener);
        this._instance.remove();
    }
}