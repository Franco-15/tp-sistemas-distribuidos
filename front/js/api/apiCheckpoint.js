


export function getChkPt() { 
    const mockData = [
        { id: 'cee1f9bf-6e42-4071-859a-82d71e231cc1', lat: -38.00413285734509, long: -57.55136976361025 , description: "Casa grego" },
        { id: '32c7e94b-2b08-4ff5-80e9-ecb0f7795425', lat: -38.-37.959956981123014, long: -57.54691270133813 , description: "Casa juli" },
        { id: 'd5046589-a6be-4839-9454-f0ab184fa51a', lat: -37.995852166115476, long: -57.57091812136696, description: "Casa Manu" },
        { id: '16bc808b-eb20-4aa9-8b3d-048fbf4c3025', lat: -38.021055327610185, long: -57.57736073202042, description: "Casa Fran" }
    ];

    // Retorna los datos simulados como una promesa
    return new Promise(resolve => {
        setTimeout(() => resolve(mockData), 500); // Simula una espera de 500ms (no se pq es esto pero chatgpt)
    });
}


export function PatchChkPt() { 

}
export function PostChkPt() { 

}
export function DeleteChkPt() { 

}