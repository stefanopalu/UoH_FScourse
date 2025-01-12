const Country = ({country}) => {
    const flagStyle = {
        fontSize: "200px",
    }
    return (
        <div key={country.cca2}>
            <h1>{country.name.common}</h1>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <h2>languages:</h2>
            <ul>
              {Object.values(country.languages).map((lang, index) => (
                <li key={index}>{lang}</li>
              ))}
            </ul>
            <p style={flagStyle}>{country.flag}</p>
        </div>
    )
}

export {Country}