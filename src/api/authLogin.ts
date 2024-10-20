

export const authLogin = async (userData) => {

    try{
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            credentials: 'include',
            body: JSON.stringify(userData)
        });

        console.log(response)
        if (!response.ok) {
            if(response.status === 400){
                throw new Error(`Falta informacion`)
            }else if(response.status === 401){
                throw new Error(`No autorizado`)
            }else{
                throw new Error(`Login inválido`);
            }
        }


        const text = await response.text();
        let data; 

        if(text){
            data = JSON.parse(text)
        }else{
            throw new Error('La respuesta esta vacía')
        }

        return data; 
    }catch(e){
        throw new Error(`Error: ${e.message}` )
    }
}

