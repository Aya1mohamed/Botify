import {
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegisterReturn,
    UseFormReturn,
} from 'react-hook-form';

/**
 * Custom Register function type that includes an optional sanitizerOverride param - important for customizing/exempting certain fields' sanitization.
 */
export type UseSanitizedRegister<TFieldValues extends FieldValues = FieldValues> = <
    TFieldName extends Path<TFieldValues>
>(
    name: TFieldName,
    options?: RegisterOptions<TFieldValues, TFieldName>,
    sanitizerOverride?: (input?: string) => string
) => UseFormRegisterReturn<TFieldName>;

/**
 * Extended return type for useSanitizedForm with overridden register, setValue, handleSubmit.
 */
export interface UseSanitizedFormReturn<TFieldValues extends FieldValues = FieldValues>
    extends Omit<UseFormReturn<TFieldValues>, 'register' | 'setValue' | 'handleSubmit'> {
    register: UseSanitizedRegister<TFieldValues>;

    setValue: <TFieldName extends Path<TFieldValues>>(
        name: TFieldName,
        value: TFieldValues[TFieldName],
        options?: Parameters<UseFormReturn<TFieldValues>['setValue']>[2]
    ) => void;

    handleSubmit: (
        onValid: (data: TFieldValues) => void,
        onInvalid?: any,
        sanitizerOverride?: (input?: string) => string
    ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
}
