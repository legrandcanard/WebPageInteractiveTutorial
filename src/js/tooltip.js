
import '../styles/tooltip.css';

export default class {

    constructor (options) {
        this._options = options;
        this._resizeEventListener = addEventListener('resize', function () {
            this.updatePosition();
        }.bind(this));
        this._scrollEventListener = addEventListener('scroll', function () {
            this.updatePosition();
        }.bind(this));

        //init tooltip
        const container = document.createElement("div");
        container.innerHTML = this._options.template().trim();
        const instance = this._instance = container.firstChild;

        //setup styles
        instance.style.display = "none";
        instance.style.color = this._options.textColor;
        instance.style.backgroundColor = this._options.backgroundColor;

        options.container.appendChild(instance);
    }

    show() {
        this.updatePosition();
        this._instance.style.display = "block";
        this._instance.classList.remove("hid");
        this._instance.classList.add("vis");
    }

    hide() {
        this._instance.classList.remove("vis");
        this._instance.classList.add("hid");
    }

    updatePosition() {
        const bounds = this._options.target.getBoundingClientRect();
        this._instance.style.left = this._unit(bounds.x);
        this._instance.style.top = this._unit(this._options.topOffset + window.scrollY + bounds.top + bounds.height);
    }

    setTarget(newTarget) {
        this._options.target = newTarget;
        this.updatePosition();
    }

    setContent(content) {
        this._instance.innerHTML = this._options.contentTemplate(content).trim();
    }

    get tooltipElement() { return this._instance; }

    _unit(value) {
        return value + "px";
    }

    destoy() {
        removeEventListener('resize', this._resizeEventListener);
        this.hide();
        setTimeout(() => this._instance.remove(), 1000);
    }
}