import CountriesCodeJson from "(presentation)/(assets)/json/countriesCodeJson.json"

export function getCountriesDialCodeES(): any[] {
    const countries: any[] = [];
    CountriesCodeJson.countries.forEach((country) => {
        countries.push([
            country.name_es,
            country.code.toLowerCase(),
            country.dial_code.replace("+",""),
        ])
    })

    return countries;
}