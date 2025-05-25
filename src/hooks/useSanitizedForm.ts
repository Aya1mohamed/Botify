import { UseSanitizedFormReturn, UseSanitizedRegister } from '@/services/types/sanitizedForm';
import { sanitizeString } from '@/services/utils/sanitizeString';
import {
    FieldValues,
    Path,
    RegisterOptions,
    UseFormProps,
    UseFormRegisterReturn,
    useForm as useRHF,
} from 'react-hook-form';

export const useSanitizedForm = <TFieldValues extends FieldValues = FieldValues>(
    props?: UseFormProps<TFieldValues>,
    sanitizer?: (input?: string) => string
): UseSanitizedFormReturn<TFieldValues> => {
    const methods = useRHF<TFieldValues>(props);
    const originalSetValue = methods.setValue;

    const setValue = <TFieldName extends Path<TFieldValues>>(
        name: TFieldName,
        value: TFieldValues[TFieldName],
        options?: Parameters<typeof originalSetValue>[2],
        sanitizerOverride?: (input?: string) => string
    ) => {
        const sanitizedValue =
            typeof value === 'string'
                ? sanitizerOverride?.(value)
                ?? sanitizer?.(value)
                ?? sanitizeString(value)
                : value;

        return originalSetValue(name, sanitizedValue as TFieldValues[TFieldName], options);
    };

    const originalRegister = methods.register;
    const register: UseSanitizedRegister<TFieldValues> = <TFieldName extends Path<TFieldValues>>(
        name: TFieldName,
        options?: RegisterOptions<TFieldValues, TFieldName>,
        sanitizerOverride?: (input?: string) => string
    ): UseFormRegisterReturn<TFieldName> => {
        const field = originalRegister(name, options);

        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;

            setValue(name, value as TFieldValues[TFieldName], {
                shouldDirty: true,
                shouldValidate: true,
            }, sanitizerOverride);
        };

        return {
            ...field,
            onChange: onChange as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        };
    };

    const handleSubmit: UseSanitizedFormReturn<TFieldValues>['handleSubmit'] = (
        onValid,
        onInvalid,
        sanitizerOverride
    ) => {
        return methods.handleSubmit((data) => {
            const sanitized = Object.fromEntries(
                Object.entries(data).map(([key, val]) => [
                    key,
                    typeof val === 'string'
                        ? sanitizerOverride?.(val)
                        ?? sanitizer?.(val)
                        ?? sanitizeString(val)
                        : val,
                ])
            ) as TFieldValues;

            return onValid(sanitized);
        }, onInvalid);
    };

    return {
        ...methods,
        setValue,
        register,
        handleSubmit,
    };
};
