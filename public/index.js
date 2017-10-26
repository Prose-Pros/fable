// ---- **** QUOTE ON HOME PAGE **** ----


fetch('https://talaikis.com/api/quotes/random/')
.then(function(res) {
  return res.json()
  .then(function(quoteData){
    console.log(quoteData)
    var pQuote = document.getElementById('quote')

    pQuote.innerText = quoteData.quote + ' - ' + quoteData.author
    console.log(pQuote);

  })
})
