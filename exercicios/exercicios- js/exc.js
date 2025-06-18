function manipularString(str, letraAntiga, letraNova) {
    console.log("String original:", str);
    
    // 1. Converter para maiúsculas
    console.log("Maiúsculas:", str.toUpperCase());

    // 2. Converter para minúsculas
    console.log("Minúsculas:", str.toLowerCase());

    // 3. Inverter a string
    console.log("Invertida:", str.split('').reverse().join(''));

    // 4. Substituir todas as ocorrências de uma letra específica por outra
    let stringSubstituida = str.replaceAll(letraAntiga, letraNova);
    console.log(`Substituindo '${letraAntiga}' por '${letraNova}':`, stringSubstituida);
}
