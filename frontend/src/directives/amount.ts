import { computed, ref, type Directive } from "vue";

const format = (value: string): string => parseFloat(value).toFixed(2).toString();

const state = ref<string>('sdf');

const printable = computed<string>(() => {

    return format(state.value);
})

const event = <K extends keyof HTMLElementEventMap>(name: K): Event => new Event(name);

function handleInput(this: HTMLInputElement) {
    state.value = this.value;
    this.dispatchEvent(event('change'));
}

const amount: Directive = {
    created: (el: HTMLInputElement) => {
        el.addEventListener('input', handleInput);
    },
    mounted: (el: HTMLInputElement) => {
        const formatted = format(el.value);

        el.value = formatted;

        el.dispatchEvent(event('input'))
    },
    beforeUnmount: (el: HTMLInputElement) => {
        // console.log(el.value);
    }
}

export default amount
