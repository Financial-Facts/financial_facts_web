export function toParams(data: Record<string, string>) {
    const form_data: string[] = [];
    Object.keys(data).forEach(key => {
        form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
    });
    return form_data.join("&");
}