import {AnimationTriggerMetadata, state, trigger, style, transition, animate, group, query, animateChild} from '@angular/animations';

const defaultDuration = '100ms';
const defaultMinWidth = '50px';
const defaultMaxWidth = '200px';
const defaultMinFontsize = '20px';
const defaultMinMaxSize = '24px';

export function mainContentAnimation(
    animationDuration: string = defaultDuration,
    minWidth: string = defaultMinWidth,
    maxWidth: string = defaultMaxWidth,
): AnimationTriggerMetadata {
    return trigger('onSideNavChange' , [
        state('close' , style({
            'margin-left': minWidth,
        })),
        state('open' , style({
            'margin-left': maxWidth,
        })),
        transition('close => open' , animate(`${animationDuration} ease-in`)),
        transition('open => close' , animate(`${animationDuration} ease-out`) )
    ]);
}

export function sideNavAnimation(
    animationDuration: string = defaultDuration,
    minWidth: string = defaultMinWidth,
    maxWidth: string = defaultMaxWidth
): AnimationTriggerMetadata {
    return  trigger('onSideNavChange' , [
        state('close' , style({
            width: minWidth
        }
        )),
        state('open' , style({
            width: maxWidth
        }))
    ]);
    transition('close' , group([
        query('@iconAnimation' , animateChild()),
        query('@labelAnimation' , animateChild()),
        animate(`${animationDuration} ease-in-out`)
    ] , )),
        transition('close' , group([
            query('@iconAnimation' , animateChild()),
            query('@labelAnimation' , animateChild()),
            animate(`${animationDuration} ease-in-out`)
        ]));
}

export  function iconAnimation(
    animationDuration: string = defaultDuration,
    minFontsize: string = defaultMinFontsize,
    maxFontsize: string = defaultMinMaxSize
): AnimationTriggerMetadata {
    return  trigger('iconAnimation' , [
        state('close' , style({
            fontSize: minFontsize
        })),
        state('open' , style({
            fontSize: maxFontsize
        })),
        transition('open => close' , animate(`${animationDuration} ease-in-out`)),
        transition('close => open' , animate(`${animationDuration} ease-in-out`))
    ]);

}

export function labelAnimation(
    animationDuration: string = defaultDuration
): AnimationTriggerMetadata {
    return trigger('labelAnimation' , [
        state('close' , style({
            display: 'none',
            opacity: 0
        })),
        state('open' , style({
            display: 'inline',
            opacity: 1
        })),
        transition('open => close' , animate(`${animationDuration} ease-in-out`)),
        transition('close => open' , animate(`${animationDuration} ease-in-out`))
    ]);
}


