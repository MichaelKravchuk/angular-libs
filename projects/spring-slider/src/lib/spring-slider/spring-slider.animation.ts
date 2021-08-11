import { animate, keyframes, style, transition, trigger, state } from '@angular/animations';


export function springWobbly(time: number) {
    return -0.5 * (2.71828 ** (-6 * time)) * (-2 * (2.71828 ** (6 * time)) + Math.sin(12 * time) + 2 * Math.cos(12 * time));
}

export function springSlide(animationSteps: number, timings: string | number = '.7s') {
    return trigger('springSlide', [
        state('springSlide', style([]), {params: {left: 0, top: 0}}),
        transition('move => moveEnd', [
            animate(timings, keyframes(
                new Array(animationSteps).fill(null).map((v, index) => {
                    return style([
                        { left: `{{left_${index}}}`, offset: index / animationSteps },
                        { top: `{{top_${index}}}`, offset: index / animationSteps }
                    ]);
                }, []),
            )),
        ]),
    ]);
}
