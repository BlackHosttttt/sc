const fs = require('fs')
const chalk = require('chalk')
// EDIT DISINI
global.owner = ['6281231319622'] // no own
global.packname = '© sticker by' // nama pack sticker
global.author = 'MiMiXd Solo'// nama author
global.sessionName = 'mimixdsolo' // nama session
global.danapayment = '081231319622' // mbanking lu
global.gopaypayment = '081231886592' // bank lu
global.domain = 'https://panelbot.butterhostlive.my.id' // Isi Domain Lu
global.apikey = 'ptla_vFDYFOdcMARZeR4zCx5jwluCC6tGrCOY8JX0zoozxMV' // Isi Apikey Plta Lu
global.capikey = 'ptlc_ZqLN5tDcXIzxvIqTxVmunxusJVSY12922D0jNEdn7Wl' // Isi Apikey Pltc Lu
global.eggsnya = '15' // id eggs yang dipakai
global.location = '1' // id location


let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})