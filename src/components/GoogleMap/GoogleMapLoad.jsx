import React, { useEffect } from "react";

function GoogleMapLoad(){
    // useEffect(()=>{
    //     const ifameData=document.getElementById("iframeId")
    //     const lat=7.214258;
    //     const lon=79.847186;
    //     ifameData.src=`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`
    // })
    useEffect(() => {
        const iframeData = document.getElementById("iframeId");
        const lat = 7.214258;
        const lon = 79.847186;
        const zoom = 17;
        // iframeData.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`;
        iframeData.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=es&z=${zoom}&output=embed`;
    }, []);
    
    return(
        <div>
            <iframe id="iframeId" height="700px" width="100%"></iframe>
        </div>
    );
}
export default GoogleMapLoad;