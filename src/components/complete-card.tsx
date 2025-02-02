import React, { FC, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useMollie } from "../hooks";


type Props = {
    styles?: Record<string, any>;
    cardHolderLabel?: string;
    cardNumberLabel?: string;
    verificationCodeLabel?: string;
    expiryDateLabel?: string;
};

export const MollieCompleteCardForm = forwardRef<any, Props>(({ ...restProps }, parentRef) => {
    const pointerRef = useRef<HTMLDivElement | null>(null);
    const _componentRef = useRef(null);
    const { _mollie } = useMollie();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (!_mollie) return;
        if (!pointerRef.current) return;
        const parent = pointerRef.current.parentElement;
        if (!parent) return;

        _componentRef.current = _mollie.createComponent('card', {
            styles: restProps.styles,
            components: {
                cardHolder: {
                    label: restProps.cardHolderLabel,
                },
                verificationCode: {
                    label: restProps.verificationCodeLabel
                },
                cardNumber: {
                    label: restProps.cardNumberLabel
                },
                expiryDate: {
                    label: restProps.expiryDateLabel
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