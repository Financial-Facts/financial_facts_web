export const handleEnterKeyEvent = (e: React.KeyboardEvent<HTMLDivElement>, handler: () => void): void => {
    if (e.code === 'Enter') {
        handler();
    }
}