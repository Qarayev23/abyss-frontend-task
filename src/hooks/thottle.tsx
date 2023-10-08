export const throttle = (f: (...args: any[]) => void) => {
    let token: number | null = null;
    let lastArgs: any[] | null = null;

    const invoke = () => {
        f(...lastArgs!);
        token = null;
    };

    const result = (...args: any[]) => {
        lastArgs = args;
        if (!token) {
            token = requestAnimationFrame(invoke);
        }
    };

    result.cancel = () => token && cancelAnimationFrame(token);

    return result;
};
