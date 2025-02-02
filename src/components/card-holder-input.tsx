import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useMollie } from "../hooks";

type EventState = {
    dirty: boolean;
    touched: boolean;
    valid: boolean;
    error: string | null;
}

type Props = {
    styles?: Record<string, any>;
    label?: string;
    onChange?: (e?: EventState) => void,
    onBlur?: (e?: EventState) => void,
    onFocus?: (e?: EventState) => void,
};

export const MollieCardHolderInput = forwardRef<any, Props>((props, parentRef) => {
    const pointerRef = useRef<HTMLDivElement | null>(null);
    const _componentRef = useRef(null);
    const { _mollie } = useMollie();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (!_mollie) return;
        if (!pointerRef.current) return;
        const parent = pointerRef.current.parentElement;
        if (!parent) return;

        _componentRef.current = _mollie.createComponent('cardHolder', {
            styles: props.styles,
            components: {
                cardHolder: {
                    label: props.label
                },
            }
        });
        
        (_componentRef.current as any)?.mount(pointerRef.current);
        const previous = (pointerRef.current as HTMLElement).previousSibling;
        if (previous) {
            parent.insertBefore((pointerRef.current as any).firstChild, previous.nextSibling);
        } else {
            parent.prepend((pointerRef.current as any).firstChild);
        }
        parent.removeChild(pointerRef.current);

        if (props.onChange && typeof props.onChange === 'function') {
            (_componentRef.current as any)?.addEventListener('change', (e: EventState) => props.onChange && props.onChange(e));
        }
        if (props.onBlur && typeof props.onBlur === 'function') {
            (_componentRef.current as any)?.addEventListener('blur', (e: EventState) => props.onBlur && props.onBlur(e));
        }
        if (props.onFocus && typeof props.onFocus === 'function') {
            (_componentRef.current as any)?.addEventListener('focus', (e: EventState) => props.onFocus && props.onFocus(e));
        }
        setIsMounted(true);

        return () => {
            (_componentRef.current as any)?.unmount();
        }
    }, [_mollie]);

    if (parentRef) useImperativeHandle(parentRef, () => ({
        unmount: () => {
            if (isMounted) {
                (_componentRef.current as any)?.unmount();
                setIsMounted(false);
            }
        },
        isMounted,
      }));

    return (
        <div style={{ display: 'none' }} ref={pointerRef} />
    )
})