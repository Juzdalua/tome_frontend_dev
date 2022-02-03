export const excelDownload = async(link, filename) => {    
    let response;
    try {
        response = await fetch(link, {
            method: 'GET',
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

    } catch (error) {
        console.log(error)
    }    
    
    // fetch(link, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/xlsx',
    //     },
    // })
    //     .then((response) => response.blob())
    //     .then((blob) => {
    //         // Create blob link to download
    //         const url = window.URL.createObjectURL(
    //             new Blob([blob]),
    //         );
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute(
    //             'download',
    //             filename,
    //         );

    //         // Append to html link element page
    //         document.body.appendChild(link);

    //         // Start download
    //         link.click();
    //         console.log('파일 다운로드 성공!')
    //         // Clean up and remove the link
    //         // link.parentNode.removeChild(link);
    //     }).catch(()=>{
    //         console.log('파일이 다운로드되지 않음')
    // });
};