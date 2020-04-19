const ostosListanJarjestaja = (ostoslista, tarvikkeet) => {

  // Haetaan ostoslistaan tarvikkeiden tietoja
  const data = ostoslista.tarvikkeet.map(tarvike => {
    const suodatin = tarvikkeet.filter(muuTarvike => muuTarvike.id === tarvike.id)

    const kokoTarvike = suodatin[0]

    return (
      {
        ...tarvike,
        nimi: kokoTarvike.nimi,
        hankintapaikka: kokoTarvike.hankintapaikka
      }
    )
  })

  // järjestä nimen mukaan

  data.sort((a, b) => {
    if (a.nimi > b.nimi) {
      return 1
    }
    if (a.nimi < b.nimi) {
      return -1
    }
    return 0
  })

  // Ryhmittele hankintapaikan mukaan
  data.sort((a, b) => {
    if (a.hankintapaikka > b.hankintapaikka) {
      return 1
    }
    if (a.hankintapaikka < b.hankintapaikka) {
      return -1
    }
    return 0
  })
  

  return {
    nimi: ostoslista.nimi,
    id: ostoslista.id,
    tarvikkeet: [...data]
  }
}

export default ostosListanJarjestaja