export const excelDownload = async(link, filename) => {

    const response = await fetch(link, {
        method: "GET",
        headers: {
            'Content-Type': 'application/xlsx',
        },
    });
    console.log(`### xlsx`, response);

    const blob = response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
};