const express = require('express')
const cheerio = require('cheerio');
const axios = require('axios')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000;

app.use(cors())
function removeTags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
          
   ''
    return str.replace( /(<([^>]+)>)/ig, '');
}
app.get('/', (req,res) => {
 res.send("hello world")
})
app.get('/search/character/:char', async(req, res) => {
   const { data } = await axios.get(`https://paimon.moe/characters/${req.params.char.toLowerCase().replace(/\s/g, '_') }`)
  const $ = cheerio.load(data)
    const selector1 = "#sapper > main > div > div:nth-child(1) > div.flex> div > div:nth-child(1) > h1"
    const selector2 = "#sapper > main > div > div:nth-child(1) > div.flex > div > div:nth-child(1) > img"
    const selector3 = "#sapper > main > div > div:nth-child(1) > div.flex > div > p"

  
   const charname = $(selector1).html()
   const nguyento = $(selector2).attr('alt')
  let stars = []
   $('#sapper > main > div > div:nth-child(1) > div.flex > div > div > svg').each(function(index,elem){
     
    stars.push(index)

   })
  let upChar = []
  $('img.h-full.max-w-full.object-contain').each((i,e) => {
    
    switch(i) {
  case 0:
      upChar.push(
        { 
          talentsBook: $(e).attr('alt'),
          talentsBookicon:`https://paimon.moe` 
          +$(e).attr('src')
        }
      )
    break;
  case 1:
        upChar.push(
        { 
          Boss: $(e).attr('alt'),
          BossIcon:`https://paimon.moe` 
          +$(e).attr('src')
        }
      )
    break;
    case 2: 
        upChar.push(
        { 
          firstLevelUp: $(e).attr('alt'),
         firstLevelUpIcon :`https://paimon.moe` 
          +$(e).attr('src')
        }
      )
      break;
         case 3: 
        upChar.push(
        { 
          secondLevelUp: $(e).attr('alt'),
          secondLevelUpIcon:`https://paimon.moe` 
          +$(e).attr('src')
        }
      )
      break;
         case 4: 
        upChar.push(
        { 
          ThirdLevelUp: $(e).attr('alt'),
          ThirdLevelUpIcon:`https://paimon.moe` 
          +$(e).attr('src')
        }
      )
      break;
         case 5: 
        upChar.push(
        { 
          FourthLevelUp: $(e).attr('alt'),
          FourthLevelUpIcon:`https://paimon.moe` 
          +$(e).attr('src')
        }
      )
      break;
        
}
   
  }) 
  let constell = []
  $('#constellations > div').each((i,e) => {
   constell.push({
        name: $(e).find('div > div > p.font-black').html(),
        img:"https://paimon.moe" + $(e).find('div > img').attr('src'),
     description:removeTags($(e).find('div > div > p.skill-description').html()) 
      
   })
  })
  console.log(constell)

 res.json({
   char:charname,
   vision:nguyento,
      star: stars[stars.length - 1] + '*',

   description:$(selector3).html(),
   resources: upChar,
   constellation: constell
 })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
