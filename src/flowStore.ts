import type {
    FlowStore,
    Step,
    Flow,
    CreateStepStructure,
    FlowSequence,
    MainStep,
} from './types';

/**
 * FlowStore manages the form navigation and returns a function to create the current step
 */
export class FlowStoreImpl implements FlowStore {
    steps: Step[] = [];

    constructor(
        private readonly flow: Flow,
        private currentStep: Step | null,
        public flowSequence: FlowSequence
    ) {
        // push main steps and sub steps into an array by order
        this.steps = (
            Object.keys(flowSequence) as (keyof typeof flowSequence)[]
        ).reduce((prev, curr, _) => {
            prev.push(curr, ...flowSequence[curr]!.subsequence);
            return prev;
        }, [] as Step[]);
    }

    get createCurrentStep():
        | CreateStepStructure<Step.PERSONAL_INFO>
        | CreateStepStructure<Step.SELECT_PLAN>
        | CreateStepStructure<Step.ADD_ONS>
        | CreateStepStructure<Step.SUMMARY>
        | undefined {
        if (this.currentStep == null) {
            return;
        }

        return this.flow[this.currentStep]({
            flowStore: this,
            options: {},
        });
    }

    goTo({ step }: { step: Step }): void {
        this.currentStep = step;
    }

    goNext(): void {
        if (this.currentStep == null) {
            throw new Error('currentStep does not exist.');
        }

        const index = this.steps.indexOf(this.currentStep);
        this.currentStep = this.steps[index + 1];
    }

    goBack(): void {
        if (this.currentStep == null) {
            throw new Error('currentStep does not exist.');
        }

        const index = this.steps.indexOf(this.currentStep);
        this.currentStep = this.steps[index - 1];
    }

    close(): void {
        this.steps = [];
        this.currentStep = null;
    }
}
