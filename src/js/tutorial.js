import Tooltip from './tooltip.js';
import Outline from './outlineRect.js';
import "../styles/tutorial.css";

let tutorial = class {

    constructor(options) {
        this._options = options;
    }

    start() {
        this._step = 0;
        this._tooltip = new Tooltip({
            template: content => `<div class="tutorial-tooltip">${content}</div>`,
            contentTemplate: content => content,
            target: document.querySelector("#FormEmail"),
            container: document.querySelector("body"),
            topOffset: 14
        });
        this._outline = new Outline({
            container: document.querySelector("body"),
            padding: 10
        });
        this.processCurrentStep();
        this.initActionButtons();
    }

    initActionButtons() {        
        if (!this._options.actions)
            throw "Param actions is manadatory.";
        
        const usePrevious = this._options.actions.previous && this._options.actions.previous.use;
        const useNext = this._options.actions.next && this._options.actions.next.use;
        const useFinish = this._options.actions.finish && this._options.actions.finish.use;
        if (!useNext && !usePrevious && !useFinish) return;

        const container = document.createElement("div");
        container.style.textAlign = "right";

        if (usePrevious && !this.isFirstStep) {
            const btnPrevious = this._createActionButton();
            btnPrevious.innerText = this._options.actions.previous.text;
            btnPrevious.onclick = e => this.previous();
            container.appendChild(btnPrevious);
        }

        if (useNext && !this.isLastStep) {
            const btnNext = this._btnNext = this._createActionButton();
            btnNext.innerText = this._options.actions.next.text;

            if (this._options.steps[this._step].isNextButtonActive === false) {
                btnNext.setAttribute("disabled", "");
            }

            btnNext.onclick = e => this.next();
            container.appendChild(btnNext);
        }

        if (useFinish && this.isLastStep) {
            const btnFinish = this._btnFinish = this._createActionButton();
            btnFinish.innerText = this._options.actions.finish.text;
            btnFinish.onclick = e => this.complete();
            container.appendChild(btnFinish);
        }

        this._tooltip.tooltipElement.appendChild(container);
    }

    _createActionButton() {
        const btn = document.createElement("button");
        btn.innerText = this._options.actions.next.text;
        btn.classList.add("tutorial-btn-action");
        return btn;
    }

    processCurrentStep() {
        const stepDefinition = this._currentStep = this._options.steps[this._step];
        this._tooltip.setContent(stepDefinition.content);
        this._tooltip.setTarget(stepDefinition.target);
        this._tooltip.show();
        this._outline.setTarget(stepDefinition.target);
    }

    next() {
        if (this._step + 1 < this._options.steps.length) {

            if (this._currentStep.stepExit)
                this._currentStep.stepExit();

            this._step++;
            this.processCurrentStep();
            this.initActionButtons();

            if (this._currentStep.stepEnter)
                this._currentStep.stepEnter();
        }
    }

    previous() {
        if (this._step > 0) {

            if (this._currentStep.stepExit)
                this._currentStep.stepExit();

            this._step--;
            this.processCurrentStep();
            this.initActionButtons();

            if (this._currentStep.stepEnter)
                this._currentStep.stepEnter();
        }
    }

    get isFirstStep() {
        return this._step === 0;
    }

    get isLastStep() {
        return this._step + 1 === this._options.steps.length;
    }

    setNextActionButtonActive(isActive) {
        if (isActive) {
            this._btnNext.removeAttribute("disabled");
        }
        else {
            this._btnNext.setAttribute("disabled", "");
        }
    }

    complete() {
        this._tooltip.destoy();
        this._outline.destoy();
    }
}
if (window)
    window.WebpageInteractiveTutorial = tutorial;
export default tutorial;