// funcion para encriptar los datos en el sesionStorage

export async function encryptData(data, key) {
    //convierte el objeto data en una cadena codificada UTF-8
    const encodedData = new TextEncoder().encode(JSON.stringify(data));
    // Vector de inicialización
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); 
    //utiliza el algortimo  AES-GCM  para encriptar los datos
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      encodedData
    );
    return { encryptedData, iv };
  }
  
  // funcion para  desencriptar los datos 

  export async function decryptData(encryptedData, key, iv) {
    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      encryptedData
    );
    const decryptedString = new TextDecoder().decode(decryptedData);
    return JSON.parse(decryptedString);
  }

 